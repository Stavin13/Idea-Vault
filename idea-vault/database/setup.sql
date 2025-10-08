-- IdeaVault Database Setup Script
-- Run this script in your Supabase SQL editor to set up the complete database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SCHEMA CREATION
-- ============================================================================

-- Ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL CHECK (length(title) >= 3 AND length(title) <= 200),
  description TEXT NOT NULL CHECK (length(description) >= 10),
  tags TEXT[] DEFAULT '{}',
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Idea votes table for tracking individual votes
CREATE TABLE IF NOT EXISTS idea_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES ideas(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(idea_id, user_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Performance indexes for ideas table
CREATE INDEX IF NOT EXISTS idx_ideas_author_id ON ideas(author_id);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_votes ON ideas(votes DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_tags ON ideas USING GIN(tags);

-- Performance indexes for idea_votes table
CREATE INDEX IF NOT EXISTS idx_idea_votes_idea_id ON idea_votes(idea_id);
CREATE INDEX IF NOT EXISTS idx_idea_votes_user_id ON idea_votes(user_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas;
CREATE TRIGGER update_ideas_updated_at 
    BEFORE UPDATE ON ideas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable Row Level Security on all tables
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;

-- Ideas table policies
-- Allow everyone to view all ideas (public read access)
DROP POLICY IF EXISTS "Ideas are viewable by everyone" ON ideas;
CREATE POLICY "Ideas are viewable by everyone" ON ideas
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own ideas
DROP POLICY IF EXISTS "Users can insert their own ideas" ON ideas;
CREATE POLICY "Users can insert their own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Allow users to update only their own ideas
DROP POLICY IF EXISTS "Users can update their own ideas" ON ideas;
CREATE POLICY "Users can update their own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = author_id);

-- Allow users to delete only their own ideas
DROP POLICY IF EXISTS "Users can delete their own ideas" ON ideas;
CREATE POLICY "Users can delete their own ideas" ON ideas
  FOR DELETE USING (auth.uid() = author_id);

-- Idea votes table policies
-- Allow everyone to view all votes (for vote counts and user vote status)
DROP POLICY IF EXISTS "Votes are viewable by everyone" ON idea_votes;
CREATE POLICY "Votes are viewable by everyone" ON idea_votes
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own votes
DROP POLICY IF EXISTS "Users can insert their own votes" ON idea_votes;
CREATE POLICY "Users can insert their own votes" ON idea_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own votes (for unvoting)
DROP POLICY IF EXISTS "Users can delete their own votes" ON idea_votes;
CREATE POLICY "Users can delete their own votes" ON idea_votes
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- DATABASE FUNCTIONS
-- ============================================================================

-- Function to handle vote toggle (add or remove vote)
CREATE OR REPLACE FUNCTION toggle_idea_vote(idea_id_param UUID, user_id_param UUID)
RETURNS JSON AS $$
DECLARE
  vote_exists BOOLEAN;
  new_vote_count INTEGER;
  user_voted BOOLEAN;
BEGIN
  -- Check if user has already voted on this idea
  SELECT EXISTS(
    SELECT 1 FROM idea_votes 
    WHERE idea_id = idea_id_param AND user_id = user_id_param
  ) INTO vote_exists;
  
  IF vote_exists THEN
    -- Remove the vote
    DELETE FROM idea_votes 
    WHERE idea_id = idea_id_param AND user_id = user_id_param;
    
    -- Decrement vote count
    UPDATE ideas 
    SET votes = votes - 1 
    WHERE id = idea_id_param;
    
    user_voted := FALSE;
  ELSE
    -- Add the vote
    INSERT INTO idea_votes (idea_id, user_id) 
    VALUES (idea_id_param, user_id_param);
    
    -- Increment vote count
    UPDATE ideas 
    SET votes = votes + 1 
    WHERE id = idea_id_param;
    
    user_voted := TRUE;
  END IF;
  
  -- Get updated vote count
  SELECT votes INTO new_vote_count 
  FROM ideas 
  WHERE id = idea_id_param;
  
  -- Return result as JSON
  RETURN json_build_object(
    'vote_count', new_vote_count,
    'user_voted', user_voted
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's vote status for an idea
CREATE OR REPLACE FUNCTION get_user_vote_status(idea_id_param UUID, user_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM idea_votes 
    WHERE idea_id = idea_id_param AND user_id = user_id_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to recalculate vote counts (for data integrity)
CREATE OR REPLACE FUNCTION recalculate_idea_votes()
RETURNS VOID AS $$
BEGIN
  UPDATE ideas 
  SET votes = (
    SELECT COUNT(*) 
    FROM idea_votes 
    WHERE idea_votes.idea_id = ideas.id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get ideas with user vote status (for authenticated users)
CREATE OR REPLACE FUNCTION get_ideas_with_vote_status(user_id_param UUID DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  author_id UUID,
  title TEXT,
  description TEXT,
  tags TEXT[],
  votes INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  user_voted BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    i.id,
    i.author_id,
    i.title,
    i.description,
    i.tags,
    i.votes,
    i.created_at,
    i.updated_at,
    CASE 
      WHEN user_id_param IS NULL THEN FALSE
      ELSE EXISTS(
        SELECT 1 FROM idea_votes iv 
        WHERE iv.idea_id = i.id AND iv.user_id = user_id_param
      )
    END as user_voted
  FROM ideas i
  ORDER BY i.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
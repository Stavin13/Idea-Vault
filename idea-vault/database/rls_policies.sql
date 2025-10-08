-- Row Level Security Policies for IdeaVault
-- This file contains all RLS policies for secure data access

-- Enable Row Level Security on all tables
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;

-- Ideas table policies
-- Allow everyone to view all ideas (public read access)
CREATE POLICY "Ideas are viewable by everyone" ON ideas
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own ideas
CREATE POLICY "Users can insert their own ideas" ON ideas
  FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Allow users to update only their own ideas
CREATE POLICY "Users can update their own ideas" ON ideas
  FOR UPDATE USING (auth.uid() = author_id);

-- Allow users to delete only their own ideas
CREATE POLICY "Users can delete their own ideas" ON ideas
  FOR DELETE USING (auth.uid() = author_id);

-- Idea votes table policies
-- Allow everyone to view all votes (for vote counts and user vote status)
CREATE POLICY "Votes are viewable by everyone" ON idea_votes
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own votes
CREATE POLICY "Users can insert their own votes" ON idea_votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own votes (for unvoting)
CREATE POLICY "Users can delete their own votes" ON idea_votes
  FOR DELETE USING (auth.uid() = user_id);

-- Note: UPDATE is not needed for votes as they are either created or deleted
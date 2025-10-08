-- Database Functions for IdeaVault
-- This file contains functions for vote count management and other operations

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

-- Function to get users vote status for an idea
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

-- Function to atomically increment idea vote count
CREATE OR REPLACE FUNCTION increment_idea_votes(idea_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE ideas 
  SET votes = votes + 1 
  WHERE id = idea_id
  RETURNING votes INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to atomically decrement idea vote count
CREATE OR REPLACE FUNCTION decrement_idea_votes(idea_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE ideas 
  SET votes = GREATEST(votes - 1, 0)
  WHERE id = idea_id
  RETURNING votes INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
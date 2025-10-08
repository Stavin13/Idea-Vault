# IdeaVault Database Setup

This directory contains all the SQL files needed to set up the IdeaVault database in Supabase.

## Files Overview

- `setup.sql` - Complete database setup script (recommended for new installations)
- `schema.sql` - Database tables, indexes, and triggers
- `rls_policies.sql` - Row Level Security policies
- `functions.sql` - Database functions for vote management
- `sample-data.sql` - Optional sample ideas for testing (run after setup)

## Quick Setup

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `setup.sql`
4. Run the script

## Manual Setup

If you prefer to run the files separately:

1. Run `schema.sql` first to create tables and indexes
2. Run `rls_policies.sql` to set up security policies
3. Run `functions.sql` to create database functions

## Database Schema

### Tables

#### `ideas`
- Stores all submitted ideas
- Includes title, description, tags, and vote count
- References auth.users for author information

#### `idea_votes`
- Tracks individual user votes on ideas
- Ensures one vote per user per idea (unique constraint)
- Used to calculate vote counts and user vote status

### Security

- Row Level Security (RLS) is enabled on all tables
- Public read access for ideas and votes
- Users can only modify their own content
- All policies use Supabase auth.uid() for user identification

### Functions

#### `toggle_idea_vote(idea_id, user_id)`
- Handles voting/unvoting logic
- Returns JSON with vote count and user vote status
- Maintains data consistency between ideas and idea_votes tables

#### `get_user_vote_status(idea_id, user_id)`
- Returns boolean indicating if user has voted on an idea

#### `get_ideas_with_vote_status(user_id)`
- Returns all ideas with user vote status included
- Optimized for frontend data fetching

#### `recalculate_idea_votes()`
- Utility function to recalculate vote counts
- Useful for data integrity maintenance

## Requirements Satisfied

This implementation satisfies the following requirements:

- **3.4**: Database schema supports idea submission with proper validation
- **4.2**: Vote counting system with proper constraints
- **4.3**: Individual vote tracking with unique constraints
- **6.2**: User profile data access through RLS policies

## Performance Considerations

- Indexes on frequently queried columns (author_id, created_at, votes, tags)
- GIN index on tags array for efficient tag filtering
- Optimized functions for vote operations
- Proper foreign key relationships with CASCADE deletes
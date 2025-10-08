'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Copy, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function DatabaseSetupGuide() {
  const [copied, setCopied] = useState(false)

  const setupSQL = `-- IdeaVault Database Setup Script
-- Copy and paste this entire script into your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_ideas_author_id ON ideas(author_id);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_votes ON ideas(votes DESC);
CREATE INDEX IF NOT EXISTS idx_ideas_tags ON ideas USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_idea_votes_idea_id ON idea_votes(idea_id);
CREATE INDEX IF NOT EXISTS idx_idea_votes_user_id ON idea_votes(user_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_ideas_updated_at ON ideas;
CREATE TRIGGER update_ideas_updated_at 
    BEFORE UPDATE ON ideas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ideas table
DROP POLICY IF EXISTS "Ideas are viewable by everyone" ON ideas;
CREATE POLICY "Ideas are viewable by everyone" ON ideas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own ideas" ON ideas;
CREATE POLICY "Users can insert their own ideas" ON ideas FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own ideas" ON ideas;
CREATE POLICY "Users can update their own ideas" ON ideas FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can delete their own ideas" ON ideas;
CREATE POLICY "Users can delete their own ideas" ON ideas FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for idea_votes table
DROP POLICY IF EXISTS "Votes are viewable by everyone" ON idea_votes;
CREATE POLICY "Votes are viewable by everyone" ON idea_votes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own votes" ON idea_votes;
CREATE POLICY "Users can insert their own votes" ON idea_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own votes" ON idea_votes;
CREATE POLICY "Users can delete their own votes" ON idea_votes FOR DELETE USING (auth.uid() = user_id);`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(setupSQL)
      setCopied(true)
      toast.success('SQL script copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Database Setup Required</span>
          <Badge variant="destructive">Action Needed</Badge>
        </CardTitle>
        <CardDescription>
          Your Supabase database needs to be set up before you can use IdeaVault.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Quick Setup Steps:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Open your Supabase project dashboard</li>
            <li>Navigate to the SQL Editor</li>
            <li>Copy the SQL script below and paste it into the editor</li>
            <li>Click "Run" to execute the script</li>
            <li>Refresh this page to start using IdeaVault</li>
          </ol>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={copyToClipboard}
            variant="outline"
            className="flex items-center gap-2"
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy SQL Script'}
          </Button>
          <Button asChild>
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Open Supabase Dashboard
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium mb-2">
            View SQL Script
          </summary>
          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto max-h-64 overflow-y-auto">
            {setupSQL}
          </pre>
        </details>
      </CardContent>
    </Card>
  )
}
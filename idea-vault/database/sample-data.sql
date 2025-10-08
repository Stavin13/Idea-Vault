-- Sample Data for IdeaVault
-- Run this script AFTER setting up the main database schema
-- This will add some sample ideas to get you started

-- Note: You'll need to replace the author_id values with actual user IDs from your auth.users table
-- You can get user IDs by signing up for accounts and then running: SELECT id, email FROM auth.users;

-- Sample ideas (replace the author_id with actual user IDs)
INSERT INTO ideas (author_id, title, description, tags, votes) VALUES
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'AI-Powered Code Review Assistant',
  'An intelligent code review tool that uses machine learning to identify potential bugs, security vulnerabilities, and suggest improvements. It would integrate with popular version control systems and provide real-time feedback to developers.',
  ARRAY['AI', 'Development', 'Productivity'],
  15
),
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'Smart Home Energy Optimizer',
  'A system that learns your daily routines and automatically adjusts heating, cooling, and lighting to minimize energy consumption while maintaining comfort. Uses IoT sensors and weather data for optimal efficiency.',
  ARRAY['IoT', 'Energy', 'Smart Home'],
  23
),
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'Virtual Reality Fitness Platform',
  'An immersive VR fitness experience that gamifies workouts by placing users in exciting virtual environments. Track progress, compete with friends, and enjoy personalized workout routines guided by AI trainers.',
  ARRAY['VR', 'Fitness', 'Gaming'],
  31
),
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'Collaborative Recipe Discovery App',
  'A social platform where users can share recipes, rate dishes, and get personalized meal suggestions based on dietary preferences, available ingredients, and cooking skill level.',
  ARRAY['Food', 'Social', 'Mobile'],
  8
),
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'Blockchain-Based Digital Identity',
  'A secure, decentralized identity management system that gives users complete control over their personal data. Eliminates the need for multiple passwords and reduces identity theft risks.',
  ARRAY['Blockchain', 'Security', 'Privacy'],
  42
),
(
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID
  'Mental Health Chatbot Companion',
  'An empathetic AI chatbot trained in cognitive behavioral therapy techniques. Provides 24/7 emotional support, mood tracking, and connects users with professional help when needed.',
  ARRAY['AI', 'Health', 'Mental Health'],
  19
);

-- Note: After inserting sample data, you may want to run the recalculate function
-- to ensure vote counts are accurate:
-- SELECT recalculate_idea_votes();
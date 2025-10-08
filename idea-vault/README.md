# IdeaVault Frontend

A modern Next.js frontend for the IdeaVault idea sharing platform.

## Features

- 🚀 **Next.js 15** with App Router
- ⚡ **React 19** with modern hooks
- 🎨 **Tailwind CSS v4** for styling
- 🧩 **Radix UI** component library
- 🔐 **Supabase Authentication**
- 📊 **Real-time updates** with Supabase subscriptions
- 🌙 **Dark/Light theme** support
- 📱 **Responsive design**
- 🔔 **Toast notifications**
- ✨ **Framer Motion** animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase project set up

### Installation

1. Navigate to the project directory:
```bash
cd idea-vault
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_APP_ENV=development
```

4. Set up the database using the SQL files in the `database/` directory

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
idea-vault/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── browse/            # Browse all ideas
│   ├── submit/            # Submit new ideas
│   ├── ideas/[id]/        # Individual idea details
│   ├── profile/           # User profile
│   ├── sign-in/           # Authentication
│   └── sign-up/           # Registration
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── auth-provider.tsx # Authentication context
│   ├── idea-card.tsx     # Idea display component
│   ├── idea-form.tsx     # Idea submission form
│   └── navigation-header.tsx # Main navigation
├── hooks/                # Custom React hooks
│   ├── use-auth.ts       # Authentication logic
│   ├── use-ideas.ts      # Ideas data fetching
│   ├── use-vote.ts       # Voting functionality
│   ├── use-submit-idea.ts # Idea submission
│   └── use-realtime.ts   # Real-time subscriptions
└── lib/                  # Utilities
    ├── supabase.ts       # Supabase client & types
    └── utils.ts          # Helper functions
```

## Key Features

### Authentication
- Sign up/Sign in with email and password
- Protected routes for authenticated users
- User profile management

### Ideas Management
- Browse all ideas with real-time updates
- Submit new ideas with tags and categories
- View detailed idea pages
- Real-time vote counts

### Voting System
- Upvote/downvote ideas
- Real-time vote count updates
- User vote state persistence

### Real-time Features
- Live idea updates when new ideas are submitted
- Real-time vote count changes
- Instant UI updates across all connected clients

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key | Yes |
| `NEXT_PUBLIC_APP_ENV` | Environment identifier | No |

## Deployment

The app is configured for easy deployment on Vercel, Netlify, or any platform that supports Next.js.

1. Build the application:
```bash
npm run build
```

2. Set environment variables in your deployment platform

3. Deploy the `idea-vault` directory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
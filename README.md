# IdeaVault

[![Hacktoberfest 2024](https://img.shields.io/badge/Hacktoberfest-2024-orange.svg)](https://hacktoberfest.com/)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red.svg)](https://github.com/Stavin13/Idea-Vault)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)

A modern full-stack idea sharing platform built with Next.js and Supabase.

## 🎉 Hacktoberfest 2024

We're participating in Hacktoberfest! Looking for contributors to help improve IdeaVault. Check out our [Contributing Guide](CONTRIBUTING.md) and look for issues labeled `hacktoberfest` or `good-first-issue`.

## 🚀 Quick Start

The main application is in the `idea-vault/` directory.

```bash
cd idea-vault
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
idea-vault/               # Main Next.js application
├── app/                 # Next.js App Router pages
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── database/           # Supabase database setup
└── README.md           # Detailed documentation
```

## 🛠 Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Authentication**: Supabase Auth with email/password
- **Real-time**: Supabase subscriptions

## 📖 Documentation

For detailed setup instructions, features, and development guide, see:

**[📚 Full Documentation →](./idea-vault/README.md)**

## 🔧 Environment Setup

1. Copy environment file:
   ```bash
   cd idea-vault
   cp .env.local.example .env.local
   ```

2. Add your Supabase credentials to `.env.local` (never commit this file!)

3. Set up the database using files in `idea-vault/database/`

## 🔒 Security

- **Never commit real API keys or credentials**
- Use `.env.local` for your actual credentials (already in .gitignore)
- See [SECURITY.md](SECURITY.md) for detailed security guidelines
- Report security issues privately to maintainers

## 🚀 Features

- ✨ Modern Next.js 15 with App Router
- 🔐 Complete authentication system
- 📊 Real-time voting and updates
- 🎨 Beautiful UI with dark/light themes
- 📱 Fully responsive design
- ⚡ Optimized performance

## 📄 License

MIT License
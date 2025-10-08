# Contributing to IdeaVault

Welcome to IdeaVault! We're excited to have you contribute to this open-source idea sharing platform. 🎉

## 🎯 Hacktoberfest 2024

This project participates in Hacktoberfest! We welcome contributions of all sizes. Look for issues labeled `hacktoberfest`, `good-first-issue`, or `help-wanted`.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/idea-vault.git
   cd idea-vault
   ```

3. **Set up the development environment:**
   ```bash
   cd idea-vault
   npm install --legacy-peer-deps
   cp .env.local.example .env.local
   ```

4. **Add your Supabase credentials to `.env.local`** (see setup guide below)

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- A Supabase account (free tier is fine)

### Database Setup
1. Create a new Supabase project
2. Copy the SQL from the database setup guide in the app
3. Run it in your Supabase SQL editor
4. Add your credentials to `.env.local`

### Project Structure
```
idea-vault/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── database/           # Database schema and setup
└── public/             # Static assets
```

## 🎨 What Can You Contribute?

### 🐛 Bug Fixes
- Fix UI/UX issues
- Resolve performance problems
- Address accessibility concerns

### ✨ New Features
- Idea categories and filtering
- User profiles and avatars
- Notification system
- Search functionality
- Mobile app improvements

### 📚 Documentation
- Improve README files
- Add code comments
- Create tutorials
- Write API documentation

### 🎨 Design & UI
- Improve component designs
- Add animations
- Enhance mobile responsiveness
- Create new themes

### 🧪 Testing
- Add unit tests
- Write integration tests
- Improve test coverage
- Add E2E tests

## 📝 Contribution Guidelines

### Code Style
- Use TypeScript for type safety
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic

### Commit Messages
Use conventional commits:
```
feat: add user profile page
fix: resolve voting button issue
docs: update setup instructions
style: improve mobile responsiveness
```

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with a clear description

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🏷️ Issue Labels

- `hacktoberfest` - Hacktoberfest eligible issues
- `good-first-issue` - Perfect for newcomers
- `help-wanted` - We need your help!
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `design` - UI/UX improvements

## 🔒 Security

- Never commit real API keys or credentials
- Follow our [Security Policy](SECURITY.md)
- Report security issues privately

## 🤝 Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Celebrate diverse perspectives

## 🎉 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to our Discord community
- Eligible for special contributor badges

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Join our Discord for real-time chat
- Check existing issues and PRs first
- Ask questions in discussions

## 🏆 Hacktoberfest Tips

1. **Quality over quantity** - Focus on meaningful contributions
2. **Read the docs** - Understand the project before contributing
3. **Start small** - Begin with good-first-issue labels
4. **Be patient** - Maintainers will review your PR as soon as possible
5. **Have fun!** - Enjoy the open-source experience

Thank you for contributing to IdeaVault! 🚀
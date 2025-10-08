# Pre-Commit Security Checklist

Before pushing to GitHub, ensure you've completed this checklist:

## 🔒 Security Check

- [ ] No real API keys or credentials in any committed files
- [ ] `.env.local` contains your real credentials (and is in .gitignore)
- [ ] `.env` and `.env.example` only contain placeholder values
- [ ] No hardcoded passwords, tokens, or secrets in code
- [ ] No personal information in commit messages or code comments

## 📁 File Check

- [ ] All sensitive files are listed in `.gitignore`
- [ ] No `node_modules/` directories are being committed
- [ ] No build artifacts (`.next/`, `dist/`, etc.) are being committed
- [ ] No IDE-specific files are being committed

## 🧪 Code Quality

- [ ] Code builds without errors: `npm run build`
- [ ] No TypeScript errors: `npm run type-check` (if available)
- [ ] Code follows project conventions
- [ ] New features have appropriate documentation

## 📝 Documentation

- [ ] README is updated if needed
- [ ] New environment variables are documented
- [ ] Breaking changes are noted
- [ ] Examples are updated if API changes

## 🚀 Final Steps

1. **Review your changes:**
   ```bash
   git diff --cached
   ```

2. **Check what files you're committing:**
   ```bash
   git status
   ```

3. **Ensure no sensitive data:**
   ```bash
   grep -r "supabase.co" . --exclude-dir=node_modules --exclude-dir=.git
   grep -r "eyJ" . --exclude-dir=node_modules --exclude-dir=.git
   ```

4. **If all checks pass, commit:**
   ```bash
   git commit -m "your commit message"
   git push origin your-branch
   ```

## 🚨 If You Accidentally Commit Secrets

1. **Don't panic!**
2. **Immediately rotate the exposed credentials**
3. **Remove from Git history:**
   ```bash
   git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch path/to/file' --prune-empty --tag-name-filter cat -- --all
   ```
4. **Force push (if safe to do so):**
   ```bash
   git push --force-with-lease origin main
   ```
5. **Contact maintainers if it's a public repository**
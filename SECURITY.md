# Security Policy

## 🔒 Protecting Sensitive Information

This project uses environment variables to store sensitive configuration data. **Never commit actual credentials to the repository.**

### Environment Files

- ✅ `.env.example` - Template with placeholder values (safe to commit)
- ✅ `.env.local.example` - Template for local development (safe to commit)
- ❌ `.env.local` - Contains real credentials (never commit)
- ❌ `.env` - May contain real credentials (never commit)

### For Contributors

1. **Copy the example file:**
   ```bash
   cd idea-vault
   cp .env.local.example .env.local
   ```

2. **Add your own Supabase credentials to `.env.local`**

3. **Never commit files containing real API keys or database URLs**

### For Maintainers

- All environment files with real credentials are in `.gitignore`
- Use GitHub Secrets for CI/CD deployment
- Rotate keys if accidentally exposed

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email the maintainers directly
3. Include detailed information about the vulnerability
4. Allow time for the issue to be addressed before public disclosure

## 🛡️ Security Best Practices

- Keep dependencies updated
- Use Row Level Security (RLS) in Supabase
- Validate all user inputs
- Use HTTPS in production
- Implement proper authentication checks
- Follow the principle of least privilege

## 📋 Security Checklist for Deployment

- [ ] Environment variables are set in deployment platform
- [ ] Database RLS policies are enabled
- [ ] API keys have appropriate permissions
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
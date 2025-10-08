#!/bin/bash

# Security Check Script for IdeaVault
# Run this before pushing to GitHub

echo "🔒 IdeaVault Security Check"
echo "=========================="

# Check for sensitive data in files that will be committed
echo "Checking for sensitive data..."

# Check for Supabase URLs in committed files
if git ls-files | xargs grep -l "nazhzntwksdlzogjakiu" 2>/dev/null | grep -v ".env.local"; then
    echo "❌ DANGER: Supabase URL found in committed files!"
    echo "Files containing sensitive data:"
    git ls-files | xargs grep -l "nazhzntwksdlzogjakiu" 2>/dev/null | grep -v ".env.local"
    exit 1
else
    echo "✅ No Supabase URLs in committed files"
fi

# Check for API keys in committed files
if git ls-files | xargs grep -l "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" 2>/dev/null | grep -v ".env.local"; then
    echo "❌ DANGER: API keys found in committed files!"
    echo "Files containing API keys:"
    git ls-files | xargs grep -l "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" 2>/dev/null | grep -v ".env.local"
    exit 1
else
    echo "✅ No API keys in committed files"
fi

# Check if .env.local exists and contains credentials
if [ -f "idea-vault/.env.local" ]; then
    if grep -q "nazhzntwksdlzogjakiu" "idea-vault/.env.local"; then
        echo "✅ Credentials found in .env.local (this is correct)"
    else
        echo "⚠️  WARNING: .env.local exists but doesn't contain expected credentials"
    fi
else
    echo "⚠️  WARNING: .env.local not found - you may need to set up local credentials"
fi

# Check if .env contains only placeholders
if [ -f "idea-vault/.env" ]; then
    if grep -q "your_supabase_url_here" "idea-vault/.env"; then
        echo "✅ .env contains only placeholder values"
    else
        echo "❌ DANGER: .env may contain real credentials!"
        exit 1
    fi
else
    echo "⚠️  .env file not found"
fi

# Check .gitignore
if grep -q ".env.local" ".gitignore" && grep -q ".env.local" "idea-vault/.gitignore"; then
    echo "✅ .env.local is properly ignored"
else
    echo "❌ DANGER: .env.local is not in .gitignore!"
    exit 1
fi

# Check for node_modules in git
if git ls-files | grep -q "node_modules/"; then
    echo "❌ DANGER: node_modules found in git!"
    exit 1
else
    echo "✅ No node_modules in git"
fi

# Check for build artifacts
if git ls-files | grep -q ".next/"; then
    echo "❌ DANGER: .next build artifacts found in git!"
    exit 1
else
    echo "✅ No build artifacts in git"
fi

echo ""
echo "🎉 Security check passed!"
echo "Your repository is safe to push to GitHub."
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'feat: prepare for Hacktoberfest 2024'"
echo "3. git push origin main"
echo ""
echo "After pushing, follow the GitHub setup checklist in GITHUB_SETUP_CHECKLIST.md"
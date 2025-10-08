#!/bin/bash

# Deployment Check Script for IdeaVault
# This script helps verify that your project is ready for deployment

echo "🚀 IdeaVault Deployment Check"
echo "============================="

# Check if we're in the right directory
if [ ! -f "idea-vault/package.json" ]; then
    echo "❌ Error: Please run this script from the root directory (where idea-vault folder is located)"
    exit 1
fi

echo "✅ Project structure looks correct"

# Check if idea-vault directory exists and has the right files
cd idea-vault

echo "📦 Checking package.json..."
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in idea-vault directory"
    exit 1
fi
echo "✅ package.json found"

echo "🔧 Checking Next.js configuration..."
if [ ! -f "next.config.mjs" ]; then
    echo "❌ Error: next.config.mjs not found"
    exit 1
fi
echo "✅ Next.js configuration found"

echo "📁 Checking Vercel configuration..."
cd ..
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found in root directory"
    exit 1
fi
echo "✅ Vercel configuration found"

echo "🔍 Checking environment variables..."
cd idea-vault
if [ ! -f ".env.local.example" ]; then
    echo "❌ Error: .env.local.example not found"
    exit 1
fi
echo "✅ Environment template found"

echo "🏗️  Testing build process..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - check your code for errors"
    echo "Run 'npm run build' in the idea-vault directory to see detailed errors"
    exit 1
fi

echo ""
echo "🎉 Deployment Check Complete!"
echo ""
echo "Your project is ready for deployment. Here's what to do next:"
echo ""
echo "1. 🌐 Go to https://vercel.com"
echo "2. 📥 Import your GitHub repository: Stavin13/Idea-Vault"
echo "3. ⚙️  Set Root Directory to: idea-vault"
echo "4. 🔧 Set Install Command to: npm install --legacy-peer-deps"
echo "5. 🔑 Add your Supabase environment variables"
echo "6. 🚀 Deploy!"
echo ""
echo "Need help? Check VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions."
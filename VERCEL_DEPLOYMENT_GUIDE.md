# Vercel Deployment Guide for IdeaVault

## Quick Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `Stavin13/Idea-Vault`

3. **Configure Settings**
   ```
   Framework Preset: Next.js
   Root Directory: idea-vault
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

4. **Add Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from idea-vault directory**
   ```bash
   cd idea-vault
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? Yes
   - Which scope? (select your account)
   - Link to existing project? No
   - Project name: idea-vault
   - In which directory is your code located? ./

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Stavin13/Idea-Vault&root-directory=idea-vault&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Troubleshooting Common Issues

### Issue 1: Build Fails with "supabaseUrl is required"
**Solution:** Add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue 2: "ERESOLVE could not resolve" Error
**Solution:** The install command should use `--legacy-peer-deps`:
- In Project Settings → General → Build & Output Settings
- Override Install Command: `npm install --legacy-peer-deps`

### Issue 3: Wrong Root Directory
**Solution:** Set root directory to `idea-vault`:
- In Project Settings → General → Build & Output Settings
- Root Directory: `idea-vault`

### Issue 4: Build Command Not Found
**Solution:** Ensure build command is correct:
- Build Command: `npm run build`
- Output Directory: `.next`

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Root directory set to `idea-vault`
- [ ] Install command set to `npm install --legacy-peer-deps`
- [ ] Environment variables added
- [ ] Build command set to `npm run build`
- [ ] Output directory set to `.next`
- [ ] Latest code pushed to main branch

## Alternative Deployment Platforms

If Vercel continues to have issues, you can also deploy to:

### Netlify
1. Connect GitHub repository
2. Set build directory to `idea-vault`
3. Build command: `npm run build`
4. Publish directory: `idea-vault/.next`

### Railway
1. Connect GitHub repository
2. Select Next.js template
3. Set root directory to `idea-vault`
4. Add environment variables

### DigitalOcean App Platform
1. Create new app from GitHub
2. Set source directory to `idea-vault`
3. Auto-detect Next.js settings
4. Add environment variables

## Support

If you continue to have issues:
1. Check Vercel build logs for specific errors
2. Ensure all environment variables are set
3. Verify the repository structure matches expectations
4. Try deploying a simple test branch first
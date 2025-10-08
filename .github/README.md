# GitHub Actions Workflows

This directory contains the CI/CD workflows for IdeaVault.

## Workflows

### CI (`ci.yml`)

Runs on every push to `main` and on pull requests. This workflow:

1. **Setup**: Installs Node.js 20 and dependencies
2. **Lint**: Runs ESLint to check code quality
3. **Type Check**: Runs TypeScript compiler to check types
4. **Build**: Builds the Next.js application

#### Required Secrets

For the build step to work properly, you need to set these secrets in your GitHub repository:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key

#### Setting up Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the required secrets

## Deployment

Deployment is handled automatically by Vercel through their GitHub integration. No manual deployment steps are needed in the workflow.

## Future Enhancements

- Add automated testing when test suite is implemented
- Add security scanning
- Add performance monitoring
- Add automated dependency updates
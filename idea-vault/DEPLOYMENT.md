# IdeaVault Deployment Guide

This guide covers various deployment options for the IdeaVault application.

## Prerequisites

Before deploying, ensure you have:

1. **Supabase Project**: Set up a Supabase project with the required database schema
2. **Environment Variables**: Configure the required environment variables
3. **Build Assets**: The application builds to static files that can be served by any web server

## Environment Variables

The application requires the following environment variables:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_ENV=production  # Optional
```

## Deployment Options

### 1. Vercel (Recommended)

Vercel provides excellent support for Vite applications with zero configuration.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/idea-vault)

#### Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   ```

#### Configuration

The `vercel.json` file is already configured with:
- SPA routing support
- Optimal caching headers
- Environment variable mapping

### 2. Netlify

Netlify offers great static site hosting with continuous deployment.

#### Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/idea-vault)

#### Manual Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   ```bash
   npx netlify-cli deploy --prod --dir=dist
   ```

3. **Set Environment Variables** in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

#### Configuration

The `netlify.toml` file includes:
- Build settings
- Redirect rules for SPA routing
- Security headers
- Caching optimization

### 3. Docker Deployment

For containerized deployments, use the provided Docker configuration.

#### Build and Run

1. **Build the Docker image**:
   ```bash
   docker build -t idea-vault .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:80 \
     -e VITE_SUPABASE_URL=your_supabase_url \
     -e VITE_SUPABASE_ANON_KEY=your_supabase_key \
     idea-vault
   ```

#### Docker Compose

For easier management, use Docker Compose:

```bash
# Production
docker-compose up app

# Development
docker-compose --profile dev up dev
```

#### Configuration

- **Dockerfile**: Multi-stage build with Nginx
- **nginx.conf**: Optimized Nginx configuration
- **docker-compose.yml**: Production and development services

### 4. Static Hosting (GitHub Pages, AWS S3, etc.)

Since the app builds to static files, it can be hosted on any static hosting service.

#### Build for Static Hosting

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting service

3. **Configure routing**: Ensure your hosting service redirects all routes to `index.html`

#### GitHub Pages Example

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

## Database Setup

Before deploying, ensure your Supabase database is properly configured:

### 1. Run Database Migrations

Execute the SQL files in the `database/` directory:

```sql
-- Run in this order:
-- 1. database/schema.sql
-- 2. database/rls_policies.sql
-- 3. database/functions.sql
-- 4. database/setup.sql (optional, for sample data)
```

### 2. Configure Authentication

1. **Enable GitHub OAuth** in Supabase dashboard:
   - Go to Authentication > Providers
   - Enable GitHub provider
   - Add your GitHub OAuth app credentials

2. **Set up redirect URLs**:
   - Add your deployment URL to allowed redirect URLs
   - Format: `https://your-domain.com/auth/callback`

### 3. Configure Row Level Security

Ensure RLS policies are enabled and properly configured for:
- `ideas` table
- `idea_votes` table
- Any additional tables

## Performance Optimization

### Build Optimization

The application is configured with several performance optimizations:

- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Run `npm run build:analyze` to analyze bundle size
- **Tree Shaking**: Unused code is automatically removed
- **Minification**: JavaScript and CSS are minified
- **Source Maps**: Available for debugging

### Caching Strategy

- **Static Assets**: Cached for 1 year with immutable headers
- **HTML Files**: No caching to ensure updates are served immediately
- **API Responses**: Cached based on Supabase configuration

### PWA Features

The application includes PWA features:

- **Service Worker**: Automatic caching of static assets
- **Offline Support**: Basic offline functionality
- **App Manifest**: Installable as a mobile app

## Monitoring and Analytics

### Error Monitoring

Consider integrating error monitoring services:

- **Sentry**: For error tracking and performance monitoring
- **LogRocket**: For session replay and debugging
- **Vercel Analytics**: Built-in analytics for Vercel deployments

### Performance Monitoring

- **Web Vitals**: Monitor Core Web Vitals metrics
- **Lighthouse**: Regular performance audits
- **Bundle Analysis**: Monitor bundle size over time

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use platform-specific environment variable management
- Rotate Supabase keys regularly

### Content Security Policy

Consider implementing CSP headers for additional security:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;";
```

### HTTPS

Always deploy with HTTPS enabled:
- Most platforms (Vercel, Netlify) provide HTTPS by default
- For custom deployments, use Let's Encrypt or similar

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**:
   - Ensure variables are prefixed with `VITE_`
   - Check platform-specific environment variable configuration

2. **Routing Issues**:
   - Verify SPA redirect rules are configured
   - Check that all routes redirect to `index.html`

3. **Supabase Connection Issues**:
   - Verify Supabase URL and key are correct
   - Check CORS settings in Supabase dashboard
   - Ensure RLS policies allow proper access

4. **Build Failures**:
   - Check Node.js version compatibility (requires Node 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debug Mode

Enable debug mode by setting:
```bash
VITE_APP_ENV=development
```

This will:
- Enable console logging
- Show additional debug information
- Disable service worker in development

## Continuous Deployment

### GitHub Actions

Example workflow for automated deployment:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Automated Testing

Include testing in your deployment pipeline:

```yaml
- run: npm run test
- run: npm run build
- run: npm run test:e2e  # If you have E2E tests
```

## Support

For deployment issues:

1. Check the [GitHub Issues](https://github.com/your-username/idea-vault/issues)
2. Review platform-specific documentation
3. Verify Supabase configuration
4. Check browser console for errors

## Next Steps

After successful deployment:

1. **Monitor Performance**: Set up monitoring and analytics
2. **Configure Backups**: Ensure database backups are configured
3. **Set up Alerts**: Configure alerts for downtime or errors
4. **Plan Updates**: Establish a deployment and update strategy
5. **Security Audit**: Regular security reviews and updates
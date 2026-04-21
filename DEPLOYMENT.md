# Deployment Guide - Random Name Picker

This guide will help you deploy the Random Name Picker application to Vercel.

## Prerequisites

- A GitHub account (or Vercel account)
- Git installed locally
- Node.js 18+ and pnpm installed (optional for local testing)

## Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Fastest)

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# From the project directory
vercel

# Follow the prompts to deploy
```

### Option 2: Deploy via GitHub (Recommended for ongoing development)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Random Name Picker"
   git remote add origin https://github.com/YOUR_USERNAME/random-name-picker.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure settings
   - Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Other" → "Create Git Repository"
3. Copy your project files
4. Vercel will automatically detect and build your Next.js app

## What Happens During Deployment

1. **Build**: Next.js compiles your application using Turbopack
2. **Optimization**: Static pages are pre-rendered, API routes are serverless functions
3. **Deploy**: Your app is distributed globally across Vercel's CDN

## Storage Considerations

### Current Setup (JSON File)
- **How it works**: Names are stored in `/public/names.json`
- **Persistence**: Names persist within a deployment but reset on new deployments
- **Best for**: Testing, demos, small projects

### For Production (Recommended)

For persistent storage across deployments, migrate to a database:

#### Option A: Supabase (Easiest)
1. Create a free Supabase account at [supabase.com](https://supabase.com)
2. Create a new project and table for names
3. Add Supabase environment variables to Vercel
4. Update the API routes to use Supabase client

#### Option B: Neon PostgreSQL
1. Create a free account at [neon.tech](https://neon.tech)
2. Create a database and table
3. Add DATABASE_URL to Vercel environment variables
4. Update API routes to query the database

#### Option C: MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a collection for names
3. Add MONGODB_URI to environment variables
4. Update API routes accordingly

## Environment Variables

### Required for Deployment
- None! The app works out of the box

### Optional for Enhanced Features
- `DATABASE_URL` - if migrating to PostgreSQL
- `SUPABASE_URL` - if using Supabase
- `SUPABASE_ANON_KEY` - if using Supabase

To add environment variables to Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy your app

## Post-Deployment

### Verify Your Deployment
- Visit your app at `https://your-app.vercel.app`
- Test the name picker functionality
- Test the admin panel at `/admin`

### Custom Domain
1. Go to project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Your app will be live at your domain

### Monitor Performance
- Vercel Dashboard shows deployment status and performance metrics
- Check analytics for traffic and errors
- View logs for debugging

## Troubleshooting

### Build Fails
- Check the build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Returns 500 Error
- Check function logs in Vercel Dashboard
- Verify API route syntax is correct
- Check that the JSON file exists in `/public`

### Names Not Persisting
This is expected! JSON file storage resets on deployment. Migrate to a database for persistence.

### Deployment Takes Too Long
- First deployment is slower (fresh install)
- Subsequent deployments use caching
- Typical deploy time: 30-60 seconds

## Updating Your App

After deploying:

1. **Make local changes**
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```
3. **Vercel automatically redeploys** (if connected to GitHub)

## Rollback

If something breaks:
1. Go to Vercel Dashboard
2. Click your project
3. Go to "Deployments"
4. Find a previous stable deployment
5. Click "Promote to Production"

## Security Notes

- The admin panel is open access (no authentication)
- For production, consider adding password protection
- Store sensitive data in environment variables, never in code
- Use HTTPS (Vercel provides this by default)

## Cost

- **Vercel Free Tier**: Perfect for this project
  - Unlimited deployments
  - 100 GB bandwidth per month
  - 1 concurrent function (sufficient for this app)
  - Edge middleware included

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- Community: [github.com/vercel/next.js](https://github.com/vercel/next.js)

## What's Included

✅ Automatic HTTPS  
✅ Global CDN  
✅ Automatic scaling  
✅ Zero-config deployments  
✅ Built-in analytics  
✅ Custom domains  
✅ Environment variables  
✅ Automatic rollbacks  

## Next Steps

1. Deploy to Vercel
2. Share your deployment link
3. Consider adding a database for persistent storage
4. Add authentication to the admin panel for security
5. Customize the domain and branding

Happy deploying! 🚀

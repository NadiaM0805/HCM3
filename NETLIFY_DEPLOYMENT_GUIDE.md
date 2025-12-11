# Netlify Deployment Guide

## Quick Setup

Run this script in your project root:

```bash
./setup-netlify-deploy.sh
```

Or if you're copying it to another project:

```bash
# Copy the script to your other project
cp setup-netlify-deploy.sh /path/to/your/other/project/
cd /path/to/your/other/project/
./setup-netlify-deploy.sh
```

## What the Script Does

1. ✅ Creates `netlify.toml` with Next.js configuration
2. ✅ Installs `@netlify/plugin-nextjs` plugin
3. ✅ Detects if you're using `@phenom` packages
4. ✅ Creates `netlify-build.sh` if needed (for private registry auth)
5. ✅ Provides instructions for environment variables

## For Projects WITH @phenom Packages

After running the script, you **must** add environment variables in Netlify:

1. Go to: **Netlify Dashboard → Your Site → Site Settings → Environment Variables**
2. Add:
   - **Name:** `NPM_REGISTRY_AUTH`
   - **Value:** Get from your `.npmrc` file (the `_auth` value after `//pie-nexus.phenompro.com/repository/:_auth="`)

To find your auth token:
```bash
grep "_auth" .npmrc
```

## For Projects WITHOUT @phenom Packages

Just run the script - no environment variables needed! 🎉

## Manual Setup (Alternative)

If you prefer to set up manually:

### 1. Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 2. Install plugin:
```bash
npm install --save-dev @netlify/plugin-nextjs
```

### 3. Connect GitHub repo to Netlify
- Go to Netlify dashboard
- Click "Add new site" → "Import an existing project"
- Connect your GitHub repository
- Netlify will auto-detect the `netlify.toml` configuration

## Troubleshooting

### Build fails with "Cannot find module @phenom/..."
- **Solution:** Add `NPM_REGISTRY_AUTH` environment variable in Netlify dashboard

### Build fails with authentication errors
- **Solution:** Check that your auth token in Netlify matches the one in your `.npmrc`
- Make sure there are no extra quotes or spaces

### Build succeeds but site shows 404
- **Solution:** Check that `publish = ".next"` is correct in `netlify.toml`
- The `@netlify/plugin-nextjs` plugin should handle this automatically

## Files Created

- `netlify.toml` - Netlify configuration
- `netlify-build.sh` - Build script (only if @phenom packages detected)
- `setup-netlify-deploy.sh` - This setup script

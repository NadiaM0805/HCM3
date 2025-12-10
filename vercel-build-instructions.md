# Vercel Deployment Configuration

## Issue
The build is failing because Vercel cannot access the private npm registry `pie-nexus.phenompro.com`.

## Solution: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your project (HCM3)
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

### For npm registry authentication:
- **Name**: `NPM_TOKEN` or `NPM_AUTH_TOKEN`
- **Value**: `dGVhbS5zZXJ2aWNlaHViQHBoZW5vbXBlb3BsZS5jb206U2VydmljZWh1YjEyMw==`
- **Environment**: Production, Preview, Development (select all)

### For Font Awesome (if needed):
- **Name**: `FONTAWESOME_NPM_AUTH_TOKEN`
- **Value**: `994BC836-8EC8-472C-A777-593031E0E9E2`
- **Environment**: Production, Preview, Development (select all)

5. Also add these registry URLs as environment variables:
- **Name**: `NPM_REGISTRY`
- **Value**: `https://pie-nexus.phenompro.com/repository/pie-npm-group`
- **Environment**: Production, Preview, Development

6. After adding the variables, trigger a new deployment.

## Alternative: Update .npmrc to use environment variables

You may need to update `.npmrc` to reference environment variables instead of hardcoded values.


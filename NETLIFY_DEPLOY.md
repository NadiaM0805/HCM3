# Deploy to Netlify

## Step 1: Connect Repository
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Select your repository: `NadiaM0805/HCM3`
5. Click "Connect"

## Step 2: Configure Build Settings
Netlify should auto-detect Next.js, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `.next` (or leave empty - Next.js plugin handles this)

## Step 3: Add Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Click **Add variable** and add:

### Variable 1:
- **Key**: `NPM_TOKEN`
- **Value**: `[YOUR_NPM_TOKEN_HERE]` - Get this from your `.npmrc` file or your npm registry administrator
- **Scopes**: Production, Deploy previews, Branch deploys (select all)

### Variable 2:
- **Key**: `FONTAWESOME_NPM_AUTH_TOKEN`
- **Value**: `[YOUR_FONTAWESOME_TOKEN_HERE]` - Get this from your Font Awesome account or `.npmrc` file
- **Scopes**: Production, Deploy previews, Branch deploys (select all)

3. Click **Save**

## Step 4: Deploy
1. Click **Deploy site**
2. Netlify will build and deploy your site
3. You'll get a URL like: `https://hcm3-xxxxx.netlify.app`

## Important Notes:
- The `.npmrc` file uses environment variables (`${NPM_TOKEN}` and `${FONTAWESOME_NPM_AUTH_TOKEN}`)
- Make sure both environment variables are set in Netlify before deploying
- If the private registry is still unreachable, it may be behind a firewall that Netlify can't access


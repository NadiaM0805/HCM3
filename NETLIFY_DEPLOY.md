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
- **Value**: `dGVhbS5zZXJ2aWNlaHViQHBoZW5vbXBlb3BsZS5jb206U2VydmljZWh1YjEyMw==`
- **Scopes**: Production, Deploy previews, Branch deploys (select all)

### Variable 2:
- **Key**: `FONTAWESOME_NPM_AUTH_TOKEN`
- **Value**: `994BC836-8EC8-472C-A777-593031E0E9E2`
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


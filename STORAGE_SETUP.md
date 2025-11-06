# Storage Setup Guide

The application now uses GitHub Gist as a database backend (free and simple).

## Setup Steps:

### 1. Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `FxG Application Storage`
4. Select scopes: **Check "gist"** (only this one needed)
5. Click "Generate token"
6. **Copy the token** (starts with `ghp_...`)

### 2. Create a GitHub Gist

1. Go to: https://gist.github.com/
2. Create a new gist with:
   - Filename: `applications.json`
   - Content:
   ```json
   {
     "applications": []
   }
   ```
3. Click "Create secret gist" (or public, doesn't matter)
4. **Copy the Gist ID** from the URL (e.g., `https://gist.github.com/username/ABC123` → ID is `ABC123`)

### 3. Add Environment Variables to Netlify

Go to: https://app.netlify.com/sites/fxgteamapply/settings/env

Add these two variables:

**GITHUB_TOKEN**
```
ghp_your_token_here
```

**GIST_ID**
```
your_gist_id_here
```

### 4. Redeploy

After adding the environment variables, trigger a new deployment.

## How It Works

- Applications are stored in the GitHub Gist as JSON
- Each submission updates the Gist
- Admin panel reads from the Gist
- Free, reliable, and works on serverless

## Troubleshooting

If applications still don't show:
1. Check Netlify logs for errors
2. Verify the GitHub token has "gist" scope
3. Make sure the Gist ID is correct
4. Check that environment variables are set correctly

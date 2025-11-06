#!/bin/bash

# This script sets up Netlify environment variables from your .env.local file
# You need to have the Netlify CLI installed: npm install -g netlify-cli
# And be logged in: netlify login

echo "Setting up Netlify environment variables..."

# Read variables from .env.local
source .env.local

# Set environment variables on Netlify
netlify env:set DISCORD_CLIENT_ID "$DISCORD_CLIENT_ID"
netlify env:set DISCORD_CLIENT_SECRET "$DISCORD_CLIENT_SECRET"
netlify env:set NEXTAUTH_SECRET "$NEXTAUTH_SECRET"
netlify env:set NEXTAUTH_URL "$NEXTAUTH_URL"

echo "Environment variables set! Triggering a new deployment..."
netlify deploy --prod

echo "Done! Your site should now work correctly."

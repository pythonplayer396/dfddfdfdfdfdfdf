# MongoDB Setup for Railway

## Add to your .env.local file:

```
MONGODB_URI=mongodb+srv://rian3030:YOUR_PASSWORD@cluster0.hvfhsek.mongodb.net/fxg_applications?retryWrites=true&w=majority
```

Replace `YOUR_PASSWORD` with your actual MongoDB password.

## Add to Railway Environment Variables:

Go to your Railway project settings and add:

**Variable Name:** `MONGODB_URI`
**Value:** `mongodb+srv://rian3030:YOUR_PASSWORD@cluster0.hvfhsek.mongodb.net/fxg_applications?retryWrites=true&w=majority`

## That's it!

Applications will now be stored in MongoDB and will persist across deployments.

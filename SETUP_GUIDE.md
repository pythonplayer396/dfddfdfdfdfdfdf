# FakePixel X Giveaways - Setup Guide

## 🎉 Your Website is Ready!

The website is now running at **http://localhost:3000**

## 📋 Important Information

### Admin Dashboard Access
- **URL:** http://localhost:3000/admin
- **Username:** `fxgadmin`
- **Password:** `fxgadmin@123`
- **Location to change:** `/app/admin/page.tsx` (lines 24-25)

### Discord Invite Links
Update your Discord server invite link in these files:
- `/app/page.tsx` (multiple locations)
- `/components/Navbar.tsx`
- `/components/Footer.tsx`

Search for: `https://discord.gg/your-invite-link`

## 🎨 Customization

### Colors & Theme
Edit `/tailwind.config.js` to customize:
- Discord colors
- Accent colors
- Animations

### Logo & Branding
- Add your logo to `/public/` folder
- Update favicon in `/app/layout.tsx`
- Change "FakePixel X" text throughout the site

### Application Forms
- Helper form: `/app/applications/helper/page.tsx`
- Developer form: `/app/applications/developer/page.tsx`

## 📊 Database

Applications are stored in JSON format at:
- **Location:** `/data/applications.json`
- **Auto-created:** First time someone submits a form
- **Format:** JSON array of application objects

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Build for Production
```bash
npm run build
npm start
```

## 📱 Features Included

✅ Modern Discord-themed UI with glassmorphism
✅ Fully responsive (mobile, tablet, desktop)
✅ Home page with hero section
✅ Applications page with Helper & Developer forms
✅ Admin dashboard with login protection
✅ View, approve, deny, and delete applications
✅ Export applications to JSON
✅ Search and filter functionality
✅ Smooth animations with Framer Motion
✅ JSON-based database system

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill the process on port 3000
npx kill-port 3000
npm run dev
```

### Database Issues
Delete `/data/applications.json` to reset the database

### Styling Not Working
```bash
# Rebuild Tailwind
npm run build
npm run dev
```

## 📞 Support

For issues or questions:
1. Check the README.md
2. Review the code comments
3. Check Next.js documentation: https://nextjs.org/docs

## 🎯 Next Steps

1. ✅ Update Discord invite links
2. ✅ Change admin credentials (username & password)
3. ✅ Add your logo/favicon
4. ✅ Test all forms
5. ✅ Customize colors if needed
6. ✅ Deploy to production

## 🎨 Design Style

The website now uses a **clean, forum-style design** similar to Hypixel forums:
- Simple, functional layout
- Less animations and fancy effects
- Focus on content and usability
- Discord-themed colors
- Clean borders and cards

Enjoy your application portal! 🎊

# FakePixel X Giveaways Website

A modern, Discord-themed website for the FakePixel X Giveaways community with application forms and admin dashboard.

## Features

- 🎨 Modern Discord-themed UI with glassmorphism
- 📱 Fully responsive design
- 🎯 Helper & Developer application forms
- 🔐 Admin dashboard with login protection
- 💾 JSON-based database system
- 📊 Application management (approve/deny/delete)
- 📥 Export applications to JSON/CSV
- ✨ Smooth animations with Framer Motion

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin`
- Username: `fxgadmin`
- Password: `fxgadmin@123`
- Change credentials in `/app/admin/page.tsx` (lines 24-25)

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── applications/         # Application pages
│   ├── admin/                # Admin dashboard
│   └── api/                  # API routes
├── components/               # Reusable components
├── data/                     # JSON database (auto-created)
└── public/                   # Static assets
```

## Customization

- Update Discord invite link in components
- Change admin password in `/app/admin/page.tsx`
- Modify colors in `tailwind.config.js`
- Add your logo/favicon to `/public`

## Technologies

- Next.js 14
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide Icons

## License

MIT

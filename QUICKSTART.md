# Quick Start Guide

Get your Random Name Picker app running in seconds!

## Local Development (5 minutes)

### 1. Install Dependencies
```bash
cd random-name-picker
pnpm install
# or: npm install
# or: yarn install
```

### 2. Start the Dev Server
```bash
pnpm dev
```

### 3. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! The app is running.

## Using the App

### Main Page (`/`)
- **See available names** in the list
- **Adjust count** with the slider or input field
- **Click "Pick Names"** to select random names
- **Watch the animation** as names are revealed one by one

### Admin Panel (`/admin`)
- **Add single name**: Type and click "Add"
- **Bulk upload**: Click "Upload Names", paste names (one per line), click "Upload"
- **Delete names**: Click "Delete" next to any name
- **View all names**: Scroll through the complete list

## File Structure

```
📁 app/
  📄 page.tsx              ← Home page
  📁 admin/
    📄 page.tsx            ← Admin page
  📁 api/
    📁 names/
      📄 route.ts          ← API endpoints

📁 components/
  📄 NamePicker.tsx        ← Picker logic & UI
  📄 AdminPanel.tsx        ← Admin panel UI

📁 public/
  📄 names.json            ← Your names database

📄 README.md               ← Full documentation
📄 DEPLOYMENT.md           ← Deploy to Vercel
```

## Key Features Explained

### Name Picking Algorithm
Uses Fisher-Yates shuffle for unbiased random selection without duplicates.

### One-by-One Reveal
Names appear sequentially with staggered animations for visual effect.

### Real-time Sync
SWR keeps data in sync across pages automatically.

### Responsive Design
Works great on desktop (1920px), tablet (768px), and mobile (375px).

## Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #YOUR_COLOR;
  --accent: #YOUR_COLOR;
  --secondary: #YOUR_COLOR;
  /* etc */
}
```

### Change Animations
Edit `components/NamePicker.tsx`:
```tsx
// Adjust timing (in ms)
delay + index * 500  // Change 500 to speed up/slow down
```

### Modify Layout
All components use Tailwind CSS, so just update the `className` attributes.

## Deployment in 2 Minutes

### Quick Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Then follow the prompts. Your app will be live!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Troubleshooting

### "Module not found: swr"
```bash
pnpm install swr
```

### API returns 404
Make sure you're in the correct directory:
```bash
cd random-name-picker
pnpm dev
```

### Styles look broken
Clear your browser cache (Ctrl+Shift+Delete) and refresh.

### Names don't persist after refresh
That's normal with JSON storage! To add persistence:
1. Use the DEPLOYMENT.md guide to set up a database
2. Or refresh the page - the data is still there during your session

## Pro Tips

1. **Keyboard shortcuts**: Press Tab to navigate, Enter to submit
2. **Mobile friendly**: Works great on phones
3. **Share the link**: Admin panel is open - share the `/admin` link to let others add names
4. **Export results**: Screenshot or copy the results after picking

## What's Next?

- ✨ [Add a database for persistent storage](./DEPLOYMENT.md)
- 🔐 Add password protection to the admin panel
- 🎨 Customize colors and fonts
- 📊 Track selection statistics
- 🌍 Deploy to your own domain

## Need Help?

- 📖 Read [README.md](./README.md) for full documentation
- 🚀 Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- 🐛 Check browser console (F12) for error messages
- 💬 Ask on GitHub or Stack Overflow

---

**Happy picking!** 🎉

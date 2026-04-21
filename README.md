# Random Name Picker

A beautiful, interactive application for randomly selecting names from a list. Perfect for classroom activities, raffle draws, team selections, and more.

## Features

- **🎯 Interactive Name Picker**: Select random names with a smooth one-by-one reveal animation
- **📋 Admin Panel**: Bulk upload names, manage individual entries, and view your complete list
- **🎨 Modern Design**: Clean, responsive interface with black/grey/red theme
- **⚡ Real-time Updates**: Instant synchronization between components using SWR
- **💾 Persistent Storage**: Names are stored in a JSON file that persists between sessions
- **📱 Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Data Fetching**: SWR (Stale-While-Revalidate)
- **API**: Next.js Route Handlers
- **Storage**: JSON file in `/public` directory
- **Styling**: Custom design tokens with black/grey/red color scheme

## Project Structure

```
app/
├── page.tsx              # Main picker interface
├── admin/
│   └── page.tsx         # Admin panel page
├── api/
│   └── names/
│       └── route.ts     # Names CRUD API endpoints
└── globals.css          # Global styles with design tokens

components/
├── NamePicker.tsx       # Main picker component
└── AdminPanel.tsx       # Admin management component

public/
└── names.json          # JSON database with names list
```

## Getting Started

### Installation

```bash
# Clone the repository (or download the ZIP)
cd v0-project

# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## Usage

### Using the Name Picker

1. Visit the home page at `/`
2. View available names in the list
3. Use the slider or input field to select how many names to pick (1 to total count)
4. Click "Pick Names" button
5. Watch as names are revealed one by one with smooth animations
6. Results are displayed in a beautiful card layout with numbering

### Managing Names (Admin Panel)

1. Visit the admin panel at `/admin`
2. **Add Single Name**:
   - Type a name in the input field
   - Click "Add" button
3. **Bulk Upload Names**:
   - Click "Upload Names" button
   - Paste names in the textarea (one per line)
   - Click "Upload"
4. **Delete Names**:
   - Find the name in the list
   - Click the "Delete" button next to it

## API Endpoints

### GET /api/names
Retrieves all names from the database.

**Response**:
```json
{
  "names": ["Alice", "Bob", "Charlie", ...]
}
```

### POST /api/names
Updates the names list with new data.

**Request Body**:
```json
{
  "names": ["Alice", "Bob", "Charlie", ...]
}
```

### DELETE /api/names
Removes a specific name from the list.

**Request Body**:
```json
{
  "name": "Alice"
}
```

## Design System

### Colors

- **Primary (Black)**: `#1a1a1a` - Main text and primary actions
- **Secondary (Grey)**: `#6b7280` - Secondary text and muted elements
- **Accent (Red)**: `#dc2626` - Highlights, buttons, and interactive elements
- **Background**: `#f5f5f5` - Light mode, `#0f0f0f` - Dark mode
- **Surface**: `#ffffff` (light) - Cards and containers

### Typography

- **Font**: Geist (system font)
- **Headings**: Bold weight (700) for h1-h3
- **Body**: Regular weight (400)
- **Line Height**: 1.4-1.6 for optimal readability

## Deployment

The application is ready to deploy to Vercel with zero configuration needed.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. Your app will be live at `yourapp.vercel.app`

**Note**: The JSON file storage will persist within a deployment, but will reset on a new deployment. For production use with persistent storage across deployments, consider migrating to a database like Supabase or Neon.

## Performance Features

- **Optimized Rendering**: Client-side React components with minimal re-renders
- **Smart Data Fetching**: SWR handles caching and automatic revalidation
- **Fast Animations**: CSS-based animations with requestAnimationFrame
- **Responsive Images**: Optimized loading for all screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Database integration for persistent storage across deployments
- Export results as CSV/PDF
- Name categories/groups
- Custom animation speeds
- Keyboard shortcuts
- Undo/Redo functionality
- User authentication for private name lists

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

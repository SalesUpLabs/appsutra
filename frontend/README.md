# AppSutra Frontend

A Next.js frontend for the AppSutra Open Directory that provides a user-friendly interface for browsing SaaS products without requiring GitHub access.

## Features

- 🏠 **Homepage** with hero section, category grid, and featured products
- 📂 **Category Pages** with filtering and sorting options
- 📄 **Product Detail Pages** with comprehensive information and reviews
- 🔍 **Search Functionality** with advanced filters and fuzzy search
- 💬 **GitHub Reviews Integration** displaying community feedback
- 📱 **Responsive Design** matching appsutra.ai branding
- ⚡ **Static Generation** for optimal performance and SEO

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with responsive design
- **Content**: Gray-matter for YAML front-matter parsing
- **Search**: Fuse.js for fuzzy search functionality
- **Reviews**: GitHub API integration for community reviews
- **Icons**: Lucide React icons
- **Deployment**: Vercel with Indian CDN

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Access to the parent AppSutra directory structure

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Directory Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── [category]/        # Dynamic category pages
│   │   │   ├── page.tsx       # Category listing
│   │   │   └── [slug]/        # Product detail pages
│   │   │       └── page.tsx
│   │   └── search/            # Search functionality
│   │       └── page.tsx
│   ├── components/            # Reusable components
│   │   ├── layout/            # Header, Footer
│   │   ├── listings/          # Listing cards and components
│   │   └── reviews/           # Review components
│   └── lib/                   # Utilities and data fetching
│       ├── listings.ts        # Markdown parsing and listing management
│       ├── search.ts          # Search functionality
│       ├── github.ts          # GitHub API integration
│       ├── types.ts           # TypeScript type definitions
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
└── package.json
```

## Data Sources

### Listings
- Reads markdown files from `../listings/` directory
- Parses YAML front-matter for structured data
- Generates static pages at build time

### Reviews
- Fetches reviews from GitHub Issues API
- Filters by `review` label and product name
- Caches responses for performance

### Categories
- Reads from `../schema/categories.json`
- Counts listings per category dynamically

## Development

### Adding New Features

1. Create components in appropriate subdirectories
2. Use TypeScript for type safety
3. Follow existing patterns for data fetching
4. Test responsive design on multiple screen sizes

### Environment Variables

Currently no environment variables are required for basic functionality. The GitHub API is accessed without authentication for public data.

### Performance Considerations

- Static generation for all listing pages
- Client-side caching for GitHub API responses
- Image optimization with Next.js Image component
- Lazy loading and code splitting

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Root Directory: `frontend`
3. Deploy with automatic builds on push

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Domain Configuration

Configure custom domain (e.g., `directory.appsutra.ai`) in your deployment platform to maintain brand consistency.

## SEO & Performance

- Server-side rendering for all content
- Structured data (JSON-LD) for rich snippets
- Meta tags and Open Graph data
- Sitemap generation (planned)
- Core Web Vitals optimization

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Test on multiple devices and browsers
4. Update documentation for significant changes

## Integration with Main Site

This frontend extends the appsutra.ai brand and should maintain:
- Consistent visual design and branding
- Same color palette and typography
- Similar navigation patterns
- Seamless user experience

## Support

For issues or questions:
- Check existing GitHub issues
- Review the main AppSutra documentation
- Contact the development team

## License

This project is part of the AppSutra Open Directory and follows the same MIT license.
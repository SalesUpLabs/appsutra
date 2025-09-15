# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

AppSutra Open Directory is a comprehensive GitHub-based SaaS directory ecosystem with two main components:

1. **Backend Directory System** - Community-driven listings managed via GitHub
2. **Frontend Web Interface** - Next.js application for user-friendly browsing

The system allows vendors to add listings via Pull Requests and users to leave reviews via GitHub Issues, with full automation and validation.

## Project Architecture

### Core Components

**Directory System:**
- `listings/` - Markdown files with YAML front-matter for each SaaS listing
- `schema/` - JSON Schema validation files for listings and categories
- `scripts/` - Node.js ESM validation and utility scripts
- `.github/` - GitHub Actions workflows and issue/PR templates

**Frontend Application:**
- `frontend/` - Complete Next.js application with TypeScript
- `frontend/src/app/` - Next.js App Router pages and layouts
- `frontend/src/components/` - Reusable UI components
- `frontend/src/lib/` - Data fetching, search, and utility functions

**Key Files:**
- `listings/<category>/<slug>.md` - Individual SaaS listings
- `schema/listing.schema.json` - JSON Schema for validation
- `schema/categories.json` - Valid category definitions
- `scripts/validate.mjs` - Listing validation script
- `scripts/linkcheck.mjs` - URL validation script
- `frontend/src/lib/listings.ts` - Listing parser and data management
- `frontend/src/lib/github.ts` - GitHub API integration for reviews

### Technology Stack

**Backend/Validation:**
- Node.js 20+ with ESM modules
- Ajv for JSON Schema validation
- gray-matter for YAML front-matter parsing
- fast-glob for file discovery
- undici for HTTP checks

**Frontend:**
- Next.js 15 with App Router and TypeScript
- Tailwind CSS for styling and responsive design
- Fuse.js for client-side fuzzy search
- GitHub API integration for reviews
- Static generation for performance

**CI/CD & Deployment:**
- GitHub Actions for validation and labeling
- Vercel for frontend deployment
- Automated testing and validation workflows

## Development Commands

### Backend/Directory Commands

**In root directory:**
```bash
# Install backend dependencies
npm install

# Validate all listings against schema
npm run validate

# Check all URLs in listings
npm run linkcheck

# Run all validation tests
npm test
```

### Frontend Commands

**In frontend/ directory:**
```bash
# Install frontend dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Pre-Commit Validation Workflow

**IMPORTANT: Always run these commands before committing changes:**

1. **Backend Validation** (from root):
```bash
npm test                    # Runs validate + linkcheck
```

2. **Frontend Validation** (from frontend/):
```bash
npm run build              # Ensure frontend builds successfully
npm run lint               # Check for code style issues
```

3. **Full System Test** (from root):
```bash
# Validate backend
npm test

# Test frontend build
cd frontend && npm run build && cd ..

# If all pass, commit changes
git add .
git commit -m "your commit message"
git push
```

**Automated Checks:**
- GitHub Actions will automatically run validation on every PR
- All validation must pass before merging
- Frontend build errors will block deployment

## Listing File Format

Each listing follows this structure:
- **Path:** `listings/<category>/<slug>.md`
- **Format:** Markdown with YAML front-matter
- **Required Fields:** name, slug, category, website, pricing, locations, updated_at
- **Optional Fields:** logo, use_cases, keywords, trial, integrations, contact_email, listing_owner_github, verified

**Example Structure:**
```yaml
---
name: "Product Name"
slug: "product-name"
category: "crm"
website: "https://example.com"
pricing: "Free + Paid from ₹500/mo"
locations: ["India", "Global"]
trial: true
verified: false
updated_at: "2025-09-15"
---

**About**
Product description here...

**Key Features**
- Feature 1
- Feature 2

**Pricing**
Detailed pricing information...
```

## Frontend Architecture

### Page Structure
- **Homepage** (`/`) - Hero, categories, featured products
- **Category Pages** (`/[category]`) - Filtered listings by category
- **Product Pages** (`/[category]/[slug]`) - Detailed product information
- **Search Page** (`/search`) - Advanced search with filters

### Data Flow
1. **Build Time**: Parse markdown files from `listings/` directory
2. **Static Generation**: Create pages for all categories and products
3. **Runtime**: Fetch GitHub Issues for reviews via API
4. **Updates**: Webhook rebuilds on new listings

### Key Components
- `Header/Footer` - Navigation and branding
- `ListingCard` - Product display component
- `ReviewCard` - GitHub Issue review display
- `SearchInterface` - Advanced filtering and search

## GitHub Integration

### Pull Request Workflow
1. Vendors fork the repository
2. Add listing as `listings/<category>/<slug>.md`
3. Open PR using provided template
4. Automated validation runs via GitHub Actions
5. Manual review and merge by maintainers
6. Frontend automatically rebuilds with new content

### Review System
- GitHub Issues with structured templates (`review.yml`)
- Rating system via issue labels
- Structured data parsing (pros/cons/context)
- Frontend displays reviews with GitHub API integration

### Automation
- Auto-labeling PRs by category
- Schema and link validation on every PR
- Frontend build and deployment on merge
- Review aggregation and display

## Development Workflow

### Adding New Listings
1. Create markdown file in appropriate category folder
2. Follow YAML schema requirements
3. Run validation: `npm test`
4. Frontend will automatically pick up new listings

### Modifying Frontend
1. Work in `frontend/` directory
2. Test locally: `npm run dev`
3. Build test: `npm run build`
4. Commit only after successful build

### Before Every Commit
```bash
# From root directory
npm test                    # Backend validation

# From frontend directory
cd frontend
npm run build              # Frontend build test
npm run lint               # Code quality check
cd ..

# Only commit if all tests pass
git add .
git commit -m "description"
git push
```

## Security & Quality Assurance

### Validation Layers
- JSON Schema validation for all listings
- URL accessibility checking
- GitHub Actions automated testing
- Manual review process for new listings

### Content Moderation
- Factual, neutral descriptions only
- India-context friendly (₹ pricing, local features)
- No promotional language or personal attacks
- Community-driven review system via GitHub Issues

### Performance & SEO
- Static generation for optimal loading
- Structured data (JSON-LD) for rich snippets
- CDN deployment with Indian region optimization
- Mobile-responsive design

## Deployment

### Automatic Deployment
- **Frontend**: Vercel with automatic builds on push to main
- **Content**: Static regeneration when listings are updated
- **Reviews**: Real-time via GitHub API

### Manual Deployment
```bash
# Frontend only
cd frontend
npm run build
# Deploy to Vercel or other platform

# Full system verification
npm test                    # Backend validation
cd frontend && npm run build   # Frontend build
```

## Troubleshooting

### Common Issues
- **Validation Failures**: Check YAML syntax and required fields
- **Build Errors**: Ensure all dependencies are installed
- **Link Check Failures**: Verify URLs are accessible
- **Review Display Issues**: Check GitHub API rate limits

### Debug Commands
```bash
# Validate specific file
node scripts/validate.mjs listings/crm/specific-file.md

# Check specific URL
node scripts/linkcheck.mjs listings/crm/specific-file.md

# Frontend debug build
cd frontend && npm run build 2>&1 | tee build.log
```

This repository maintains high quality standards through automated validation, community review, and comprehensive testing before every deployment.
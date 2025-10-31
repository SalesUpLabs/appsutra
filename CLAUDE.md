# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

AppSutra is a data-only package that publishes curated SaaS product listings as `@appsutra/data` via GitHub Packages.

**This repository contains:**
- Product listings as Markdown files with YAML front-matter
- JSON Schema validation for data quality
- Build scripts to compile MD → JSON
- GitHub Actions for automated validation and publishing

**Key Features:**
- ✅ Data package (`@appsutra/data`) published to GitHub Packages
- ✅ Community-driven listings managed via Pull Requests
- ✅ Automated validation and quality assurance
- ✅ Consumable by any application via npm install

Vendors can add listings via Pull Requests, with automated validation ensuring data quality before publication.

## Project Architecture

### Core Components

**Data Package Structure:**
- `listings/` - Markdown files with YAML front-matter for each SaaS product
- `schema/` - JSON Schema validation files
- `scripts/` - Validation and build scripts (Node.js ESM + TypeScript)
- `dist/` - Compiled output (listings.json)
- `.github/` - GitHub Actions workflows and issue/PR templates
- `package.json` - Package configuration for `@appsutra/data`

**Key Files:**
- `listings/<category>/<slug>.md` - Individual product listings
- `schema/product.schema.json` - **PRIMARY** JSON Schema for validation
- `schema/categories.json` - Valid category definitions
- `scripts/validate.mjs` - Schema validation script
- `scripts/linkcheck.mjs` - URL verification script
- `scripts/build-data.ts` - MD → JSON compiler (generates slugs, validates, compiles)
- `dist/listings.json` - **OUTPUT** - Compiled data consumed by applications

### Technology Stack

**Data Processing:**
- Node.js 20+ with ESM modules
- Ajv for JSON Schema validation
- gray-matter for YAML front-matter parsing
- fast-glob for file discovery
- undici for HTTP checks
- TypeScript (tsx) for build scripts

**Package Publishing:**
- GitHub Actions for CI/CD automation
- GitHub Packages (`npm.pkg.github.com`) for distribution
- Automated validation on every PR
- Automated publishing on version tags

## Development Commands

### Installation

```bash
# Install dependencies
npm install
```

### Validation Commands

```bash
# Validate all listings against schema
npm run validate

# Check all URLs in listings
npm run linkcheck

# Run all validation tests (validate + linkcheck)
npm test
```

### Build Commands

```bash
# Build data package (compile MD → JSON)
npm run build:data

# Output: dist/listings.json

# Run full pre-publish validation (validate + linkcheck + build)
npm run prepublishOnly
```

### Publishing a New Version

```bash
# 1. Make changes to listings and commit
git add .
git commit -m "Add new products"
git push

# 2. Tag a new version
git tag v0.1.x
git push --tags

# 3. GitHub Actions automatically:
#    - Validates all listings
#    - Builds data package
#    - Publishes to GitHub Packages as @appsutra/data
```

### Pre-Commit Workflow

**IMPORTANT: Always run before committing:**

```bash
# Run all tests
npm test

# Test data build
npm run build:data

# If both pass, commit
git add .
git commit -m "your message"
git push
```

**Automated CI/CD:**
- GitHub Actions validates every PR automatically
- Validation must pass before merging
- New versions auto-publish on git tags

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

## Data Package Architecture

This repository publishes the `@appsutra/data` package to GitHub Packages.

### Data Pipeline Flow

```
1. Source          → listings/*.md (Markdown + YAML)
2. Validation      → JSON Schema + URL checks
3. Compilation     → build-data.ts (MD → JSON)
4. Output          → dist/listings.json
5. Publishing      → GitHub Packages (@appsutra/data)
6. Consumption     → npm install @appsutra/data
```

### Package Configuration

**package.json:**
```json
{
  "name": "@appsutra/data",
  "version": "0.1.0",
  "main": "dist/listings.json",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Build Script (`build-data.ts`)

The TypeScript build script:
1. Discovers all `*.md` files in `listings/`
2. Parses YAML front-matter with `gray-matter`
3. Validates against `product.schema.json`
4. Auto-generates `slug` and `categorySlug` fields
5. Validates filename = slugify(name), folder = slugify(category)
6. Compiles all listings into `dist/listings.json`

### Consuming the Package

**Installation:**
```bash
# Configure .npmrc
echo "@appsutra:registry=https://npm.pkg.github.com" >> .npmrc

# Authenticate (requires GitHub token with read:packages)
export NODE_AUTH_TOKEN=ghp_your_token

# Install package
npm install @appsutra/data
```

**Usage Example:**
```typescript
import listings from '@appsutra/data/dist/listings.json';

// All products
const products = listings;

// Filter by category
const financeApps = listings.filter(p => p.categorySlug === 'finance');

// Find by slug
const product = listings.find(p => p.slug === 'razorpay');
```

Any application can consume this data package by installing it via npm and importing the JSON file.

## GitHub Integration

### Pull Request Workflow
1. Contributors fork the repository
2. Add/update listing: `listings/<category>/<slug>.md`
3. Open PR (validation runs automatically)
4. GitHub Actions validates schema + links
5. Maintainers review and merge
6. Optionally tag version to publish new package

### Review System
- Users can submit reviews via GitHub Issues
- Structured templates for consistent feedback
- All reviews are public and auditable
- Community-driven quality control

### Automation Features
- Auto-labeling PRs by category
- Schema validation on every PR
- Link checking on every PR
- Automated package publishing on version tags
- Pre-merge validation requirements

## Development Workflow

### Adding New Listings
1. Create markdown file: `listings/<category>/<slug>.md`
2. Add YAML front-matter following `product.schema.json`
3. Ensure filename = slugify(name), folder = slugify(category)
4. Run validation: `npm test`
5. Test compilation: `npm run build:data`
6. Commit and push

### Updating Existing Listings
1. Edit the markdown file directly
2. Update `updated_at` field to current date (YYYY-MM-DD)
3. Run validation: `npm test`
4. Commit and push

### Publishing New Data Version
1. Ensure all changes are committed and pushed
2. Tag a new version: `git tag v0.1.x`
3. Push tags: `git push --tags`
4. GitHub Actions automatically:
   - Validates all listings
   - Builds data package
   - Publishes to GitHub Packages
5. Applications can update to new version: `npm install @appsutra/data@0.1.x`

### Pre-Commit Checklist
```bash
# Always run before committing
npm test                    # Validate schema + check links
npm run build:data          # Test compilation

# If both pass
git add .
git commit -m "Add/update listings"
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
- India-focused content (₹ pricing, local features)
- No promotional language
- Community-driven review system via GitHub Issues
- All submissions reviewed by maintainers

## Publishing to GitHub Packages

### Automated Publishing (Recommended)

```bash
# 1. Commit all changes
git add .
git commit -m "Update listings"
git push

# 2. Tag a new version
git tag v0.1.x
git push --tags

# 3. GitHub Actions automatically publishes to GitHub Packages
```

### Manual Verification

```bash
# Test compilation locally before tagging
npm run build:data          # Compile MD → JSON
npm run prepublishOnly      # Full validation + build

# Check output
cat dist/listings.json | jq length
```

### Version Management

- Use semantic versioning: `v0.1.0`, `v0.2.0`, `v1.0.0`
- Increment patch for listing updates: `v0.1.0` → `v0.1.1`
- Increment minor for new features/fields: `v0.1.0` → `v0.2.0`
- Increment major for breaking changes: `v0.9.0` → `v1.0.0`

## Troubleshooting

### Common Issues

**Validation Failures:**
- Check YAML syntax is correct
- Ensure all required fields are present (`product.schema.json`)
- Verify filename matches slugify(name)
- Verify folder matches slugify(category)

**Build Errors:**
- Run `npm install` to ensure dependencies are installed
- Check TypeScript compilation with `npm run build:data`
- Review error messages for specific issues

**Link Check Failures:**
- Verify URLs are accessible and not broken
- Check for typos in website field
- Ensure URLs use HTTPS where possible

**Publishing Failures:**
- Verify GitHub token has `write:packages` permission
- Ensure package.json name is `@appsutra/data`
- Check that publishConfig registry is set correctly

### Debug Commands

```bash
# Validate specific file
node scripts/validate.mjs listings/finance/razorpay.md

# Check links in specific file
node scripts/linkcheck.mjs listings/finance/razorpay.md

# Test full data build
npm run build:data

# Inspect compiled output
cat dist/listings.json | jq '.[0]'  # View first listing
cat dist/listings.json | jq length   # Count total listings
cat dist/listings.json | jq 'map(.categorySlug) | unique'  # List categories
```

### Quality Standards

This repository maintains high quality through:
- ✅ Automated JSON Schema validation
- ✅ Comprehensive link checking
- ✅ Required PR reviews before merge
- ✅ Community feedback via Issues
- ✅ Continuous integration testing
- ✅ Semantic versioning for changes
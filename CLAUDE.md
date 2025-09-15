# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository is designed to implement AppSutra Open Directory - a GitHub-based SaaS directory where vendors can add listings via Pull Requests and users can leave reviews via GitHub Issues. The repository currently contains a comprehensive blueprint document that outlines the entire architecture.

## Project Architecture

### Core Components (To Be Implemented)

**Directory Structure:**
- `listings/` - Markdown files with YAML front-matter for each SaaS listing
- `schema/` - JSON Schema validation files for listings and categories
- `scripts/` - Node.js ESM validation and utility scripts
- `.github/` - GitHub Actions workflows and issue/PR templates
- `reviews/` - Optional: file-based reviews (alternative to GitHub Issues)

**Key Files:**
- `listings/<category>/<slug>.md` - Individual SaaS listings with YAML front-matter
- `schema/listing.schema.json` - JSON Schema for listing validation
- `schema/categories.json` - Valid category definitions
- `scripts/validate.mjs` - Listing validation script
- `scripts/linkcheck.mjs` - URL validation script
- `.github/workflows/validate-listings.yml` - PR validation workflow

### Technology Stack (Based on Blueprint)

**Runtime:** Node.js 20+ with ESM modules
**Validation:** Ajv for JSON Schema validation
**Parsing:** gray-matter for YAML front-matter parsing
**File Globbing:** fast-glob for file discovery
**HTTP Checks:** undici for link validation
**CI/CD:** GitHub Actions for validation and labeling

### Development Commands

**Validation Scripts:**
```bash
node scripts/validate.mjs    # Validate all listings against schema
node scripts/linkcheck.mjs   # Check all URLs in listings
```

**Dependencies to Install:**
```bash
npm install fast-glob gray-matter ajv undici slugify
```

### Listing File Format

Each listing follows this structure:
- **Path:** `listings/<category>/<slug>.md`
- **Format:** Markdown with YAML front-matter
- **Required Fields:** name, slug, category, website, pricing, updated_at
- **Optional Fields:** logo, locations, use_cases, keywords, trial, integrations, contact_email, listing_owner_github, verified

### GitHub Integration Patterns

**Pull Request Workflow:**
1. Vendors fork the repository
2. Add their listing as a new Markdown file
3. Open PR using the provided template
4. Automated validation runs via GitHub Actions
5. Manual review and merge by maintainers

**Review System:**
- Uses GitHub Issues with structured templates
- Each product links to its canonical review issue
- Dropdown-based rating system (1-5 stars)
- Context fields for team size and use case

**Automation:**
- Auto-labeling PRs by category
- Schema and link validation on every PR
- Optional build preview integration

### Implementation Priority

1. **Core Structure**: Create directory structure and basic files
2. **Schema Validation**: Implement JSON schemas and validation scripts
3. **GitHub Templates**: Set up issue and PR templates
4. **CI/CD**: Configure GitHub Actions workflows
5. **Seed Data**: Add initial categories and sample listings
6. **Documentation**: Create contributor guidelines

### Security Considerations

- All user-generated content goes through PR review
- Link validation prevents malicious URLs
- Schema validation prevents malformed data
- GitHub's built-in security features protect against abuse

### Moderation Guidelines

- Factual, neutral descriptions only
- India-context friendly (₹ pricing, local integrations)
- No personal attacks in reviews
- Vendors may respond once per review with disclosures
- Spam/astroturfing results in bans

## Next Steps for Implementation

1. Initialize the directory structure from the blueprint
2. Create the schema files for validation
3. Implement the validation scripts
4. Set up GitHub Actions workflows
5. Create issue and PR templates
6. Add initial seed data and documentation
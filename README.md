# 🚀 AppSutra – Open SaaS Directory

> An India-first, GitHub-powered directory of SaaS products where vendors add listings via Pull Requests and users share experiences via Issues.

[![Validate Listings](https://github.com/salesuplabs/appsutra/actions/workflows/validate-listings.yml/badge.svg)](https://github.com/salesuplabs/appsutra/actions/workflows/validate-listings.yml)
[![Contributors](https://img.shields.io/github/contributors/salesuplabs/appsutra)](https://github.com/salesuplabs/appsutra/graphs/contributors)
[![License](https://img.shields.io/github/license/salesuplabs/appsutra)](LICENSE)

## 📋 What is AppSutra?

AppSutra is a community-driven directory of SaaS products optimized for Indian businesses. Unlike traditional directories, we leverage GitHub's collaborative features to create a transparent, auditable, and community-moderated platform.

**Key Features:**
- 🇮🇳 **India-first focus** - Pricing in ₹, local integrations, compliance considerations
- 🔍 **Transparent reviews** - All reviews are public GitHub Issues with full history
- 🤖 **Automated validation** - Schema validation, link checking, and quality assurance
- 📊 **Community-driven** - Vendors submit via PRs, users review via Issues
- 🎯 **Category-organized** - CRM, HR, Marketing, Finance, and more

## 🚀 Quick Start

### Adding Your Product

1. **Fork this repository**
2. **Create your listing file** at `listings/<category-folder>/<your-product>.md`
3. **Fill in the details** using our template (see example below)
4. **Open a Pull Request** - our validation will run automatically
5. **Get reviewed** by maintainers and go live!

> **Note:** Slugs are auto-generated from your `name` and `category` fields in YAML. The filename must match `slugify(name)` and the folder must match `slugify(category)`. Validation runs automatically on PR submission.

### Example Listing Structure

```yaml
---
icon: "https://example.com/logo.png"
name: "Razorpay"
company: "Razorpay Software Private Limited"
trialPlan: true
trialPlanPricing: "Free"
category: "Finance"
# IMPORTANT: Do NOT add 'slug' or 'categorySlug' fields
# They are auto-generated during validation and build from 'name' and 'category'
# - Filename must be: slugify("Razorpay") = "razorpay.md"
# - Folder must be: slugify("Finance") = "finance/"
#  - Location: listings/finance/razorpay.md
useCases:
  - "Online Payments"
  - "E-commerce"
  - "Subscription Billing"
keywords:
  - "payment gateway"
  - "online payments"
  - "e-commerce"
integration:
  - title: "Shopify"
  - title: "WooCommerce"
  - title: "Zapier"
description: |
  Razorpay is a comprehensive payment gateway platform designed to empower businesses...

  **Key Highlights**
  - Comprehensive payment processing platform
  - Accept payments globally through multiple channels
  - Simple API integrations for developers
locations:
  - "India"
  - "Global"
website: "https://razorpay.com/"
updated_at: "2025-01-18"
keyFeatures:
  description: "Razorpay offers a full range of payment tools..."
  features:
    - title: "Payment Gateway"
      desc: "Accept payments via credit cards, debit cards, UPI, wallets."
    - title: "Subscription Management"
      desc: "Create and manage recurring billing for subscription-based businesses."
    # Maximum 8 features
buyingGuide:
  - question: "1. What's your business model?"
    why: "Helps determine the payment features you need"
    answer: "E-commerce, subscription-based, service-based, or other?"
  # Maximum 8 questions
pricing:
  desc: "Razorpay offers flexible pricing plans..."
  plans:
    - name: "Basic Plan"
      pricing:
        amount: 0
        currency: "INR"
        currencySymbol: "₹"
        period: "month"
        perUnit: null
      description: "Free plan with all essential features."
    # Maximum 4 plans
---
```

## 📂 Categories

- **CRM** - Customer relationship management
- **Human Resource** - HR software and recruitment
- **Payment Gateway** - Payment processing and merchant services
- **Marketing** - Digital marketing and automation
- **Finance** - Financial management tools
- **Support** - Customer support and helpdesk
- **Analytics** - Business intelligence and analytics
- **Security** - Cybersecurity and compliance
- **DevTools** - Development and technical tools

## 🔍 Writing Reviews

Share your experience by [creating a review issue](https://github.com/salesuplabs/appsutra/issues/new?template=review.yml)!

**What makes a great review:**
- Specific use case and context
- Honest pros and cons
- Team size and industry
- Duration of usage
- Specific features used

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/salesuplabs/appsutra.git
cd appsutra
npm install
```

### Validation

```bash
# Validate all listings against schema
npm run validate

# Check all links in listings
npm run linkcheck

# Run all validation
npm test
```

### Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# The build process will:
# 1. Read all .md files from ../listings/
# 2. Auto-generate slugs from name and category
# 3. Generate static pages for each product
# 4. Output optimized HTML files
```

### File Structure

```
appsutra/
├── listings/              # Product listings (organized by category)
│   ├── hr/               # HR category folder
│   │   └── keka-services.md
│   ├── finance/          # Finance category folder
│   │   └── razorpay.md
│   └── payment-gateway/  # Payment Gateway category folder
│       └── ...
├── frontend/             # Next.js web application
│   ├── src/
│   │   ├── app/         # Next.js App Router pages
│   │   ├── lib/         # Data parsing and utilities
│   │   │   └── listings.ts  # Markdown parser & slug generator
│   │   ├── types/       # TypeScript type definitions
│   │   │   └── product.ts   # Product type interface
│   │   └── components/  # React components
│   └── public/          # Static assets
├── schema/              # JSON Schema validation
├── scripts/             # Validation and utility scripts
├── .github/            # GitHub templates and workflows
└── docs/               # Documentation
```

### Architecture: Markdown → Static Site

**How listings become web pages:**

1. **Organize by Category**: Place product in category folder
   - Example: `listings/finance/razorpay.md`

2. **Define in YAML**: Add YAML front-matter with product details
   - `name: "Razorpay"`
   - `category: "Finance"` (display name, can differ from folder)

3. **Auto-Generate Slugs**: Validation and build process generate slugs from YAML fields
   - `name: "Razorpay"` → `slug: "razorpay"` (validated against filename)
   - `category: "Finance"` → `categorySlug: "finance"` (validated against folder)
   - **Validation ensures**: filename = slugify(name), folder = slugify(category)

4. **Parse at Build Time**: `gray-matter` parses YAML → Product type object

5. **Generate Static Pages**: Next.js creates HTML at `/finance/razorpay`

6. **Deploy**: Static HTML files served via CDN

**Key Points:**
- ✅ **Folder names** = Organizational structure (can be anything)
- ✅ **YAML category** = Source of truth for categorySlug
- ✅ **YAML name** = Source of truth for product slug
- ✅ No database required, fast static HTML
- ✅ Type-safe with TypeScript

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Adding new listings
- Improving existing listings
- Contributing to the platform itself
- Code of conduct and community guidelines

## 📜 Guidelines

### For Vendors
- **Keep descriptions factual and neutral** - No promotional language
- **Include India-specific context** - ₹ pricing, local integrations
- **Follow field limits**:
  - Maximum 8 key features
  - Maximum 4 pricing plans
  - Maximum 8 buying guide questions
  - Maximum 30 keywords
- **Use proper structure** - Follow the Product type interface exactly
- **No manual slugs** - Slugs are auto-generated from name and category
- **File naming**: Filename must match `slugify(name).md`, folder must match `slugify(category)`
- **Required fields**: All fields in Product schema are required, including `updated_at` (YYYY-MM-DD format)
- **Maintain up-to-date information** - Update `updated_at` when making changes

### For Users
- Write constructive, helpful reviews
- Include your context (team size, use case)
- Focus on specific experiences
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## 🔐 Moderation

All submissions go through:
- Automated schema validation
- Link verification
- Manual review by maintainers
- Community feedback

See our [Moderation Guidelines](MODERATION.md) for details.

## 📊 Stats

- **Total Listings:** Check the [listings directory](listings/)
- **Active Categories:** 9 major SaaS categories
- **Community Reviews:** Browse [review issues](https://github.com/salesuplabs/appsutra/labels/review)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the Indian SaaS community
- Powered by GitHub's collaborative features
- Inspired by awesome-lists and other community-driven projects

---

**Ready to contribute?** [Add your product](https://github.com/salesuplabs/appsutra/compare) or [write a review](https://github.com/salesuplabs/appsutra/issues/new?template=review.yml)!
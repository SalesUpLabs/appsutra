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
2. **Create your listing file** at `listings/<category>/<slug>.md`
3. **Fill in the details** using our template (see example below)
4. **Open a Pull Request** - our validation will run automatically
5. **Get reviewed** by maintainers and go live!

### Example Listing Structure

```yaml
---
name: "Zoho CRM"
slug: "zoho-crm"
category: "crm"
website: "https://www.zoho.com/crm/"
logo: "https://example.com/logo.png"
pricing: "Free + Paid from ₹900/mo"
locations: ["India", "Global"]
use_cases: ["SMB", "Sales Automation", "Lead Management"]
keywords: ["crm", "sales", "automation"]
trial: true
integrations: ["Gmail", "WhatsApp", "Zapier"]
contact_email: "partners@zoho.com"
listing_owner_github: "@zohocrm"
verified: false
updated_at: "2025-09-15"
---

**About**

Zoho CRM is a comprehensive customer relationship management platform designed for businesses of all sizes...

**Highlights**
- Advanced pipeline management
- WhatsApp integration for India
- Mobile apps for field sales

**Pricing**
- Free: Up to 3 users
- Standard: ₹900/user/month
- Professional: ₹1,600/user/month
```

## 📂 Categories

- **CRM** - Customer relationship management
- **HR** - Human resources and recruitment
- **Marketing** - Digital marketing and automation
- **Finance** - Accounting and financial management
- **Support** - Customer support and helpdesk
- **Analytics** - Business intelligence and analytics
- **Security** - Cybersecurity and compliance
- **DevTools** - Development and technical tools
- **Accounting** - Accounting and bookkeeping

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

### File Structure

```
appsutra/
├── listings/           # Product listings organized by category
│   ├── crm/
│   ├── hr/
│   └── ...
├── schema/            # JSON Schema validation
├── scripts/           # Validation and utility scripts
├── .github/          # GitHub templates and workflows
└── docs/             # Documentation
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Adding new listings
- Improving existing listings
- Contributing to the platform itself
- Code of conduct and community guidelines

## 📜 Guidelines

### For Vendors
- Keep descriptions factual and neutral
- Include India-specific context where relevant
- Provide accurate pricing in ₹
- Maintain up-to-date information

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
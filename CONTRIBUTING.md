# 🤝 Contributing to AppSutra Directory

Thank you for your interest in contributing to AppSutra Directory! This guide will help you understand how to contribute effectively.

## 📋 Table of Contents

- [Types of Contributions](#types-of-contributions)
- [Adding a New Listing](#adding-a-new-listing)
- [Writing Reviews](#writing-reviews)
- [Updating Existing Listings](#updating-existing-listings)
- [Style Guidelines](#style-guidelines)
- [Review Process](#review-process)

## 🎯 Types of Contributions

### 1. New Product Listings
Add your SaaS product to the directory following our guidelines.

### 2. Product Reviews
Share your experience with products through structured GitHub Issues.

### 3. Listing Updates
Keep existing listings accurate and up-to-date.

### 4. Platform Improvements
Enhance the directory infrastructure, validation, or documentation.

## 📝 Adding a New Listing

### Step 1: Preparation

1. **Check for duplicates** - Search existing listings to avoid duplicates
2. **Choose the right category** - Review our [categories](schema/categories.json)
3. **Gather information** - Website, pricing, features, integrations
4. **Prepare assets** - Logo (optional but recommended)

### Step 2: Create the Listing File

1. **Fork the repository** on GitHub
2. **Create a new branch** for your listing
3. **Create the file** at `listings/<category>/<slug>.md`

**File naming convention:**
- Use lowercase letters, numbers, and hyphens only
- Match your slug exactly: `zoho-crm.md` for slug `zoho-crm`

### Step 3: Fill in the Template

```yaml
---
name: "Your Product Name"
slug: "your-product-slug"
category: "crm"  # Must match schema/categories.json
website: "https://yourproduct.com"
logo: "https://yourproduct.com/logo.png"  # Optional
pricing: "Free + Paid from ₹500/mo"
locations: ["India", "Global"]
use_cases: ["SMB", "Enterprise", "Specific Use Case"]
keywords: ["relevant", "search", "keywords"]
trial: true
integrations: ["Popular", "Integration", "Names"]
contact_email: "partnerships@yourcompany.com"  # Optional
listing_owner_github: "@yourgithubhandle"  # Optional
verified: false  # Will be set by maintainers
updated_at: "2025-09-15"  # Today's date
---

**About**

Write 2-3 sentences about what your product does. Keep it factual and focused on value for Indian businesses.

**Key Features**
- Feature that solves specific problems
- India-specific capabilities (WhatsApp, UPI, etc.)
- Integration capabilities
- Mobile-first features

**Pricing**
- Free tier: What's included
- Paid plans: Starting from ₹X/month
- Enterprise: Custom pricing

**For Indian Businesses**
- Compliance: GST, regulatory features
- Local integrations: Payment gateways, local tools
- Support: Time zones, local language
- Pricing: Clear ₹ pricing, no hidden costs
```

### Step 4: Content Guidelines

#### Descriptions
- **Be factual and neutral** - No marketing superlatives
- **Focus on actual features** - What does it do, not how amazing it is
- **Include India context** - Pricing in ₹, local integrations, compliance
- **Keep it concise** - 2-3 paragraphs maximum

#### Pricing
- Always include ₹ pricing when available
- Mention free tiers clearly
- Include enterprise/custom pricing options
- Note any India-specific pricing

#### Features
- List concrete capabilities
- Highlight India-relevant features
- Include integration capabilities
- Mention mobile apps if available

### Step 5: Submit Your PR

1. **Commit your changes** with a clear message
2. **Push to your fork**
3. **Create a Pull Request** using our template
4. **Wait for validation** - Our automated checks will run
5. **Respond to feedback** from maintainers

## 📊 Writing Reviews

### Review Guidelines

Use our [review template](https://github.com/salesuplabs/appsutra/issues/new?template=review.yml) to share your experience:

**Required Information:**
- Product name and rating (1-5 stars)
- What you liked (pros)
- Areas for improvement (cons)
- Your context (team size, industry, use case)
- Duration of usage

**Best Practices:**
- Be specific with examples
- Include your team size and use case
- Mention the plan you used
- Focus on your actual experience
- Be constructive, not just critical

**What Makes a Great Review:**
```markdown
**Context:** 15-person marketing agency, used for 8 months on Pro plan

**Pros:**
- WhatsApp integration saved us 5+ hours/week
- Indian phone number formatting works perfectly
- GST invoice generation is seamless

**Cons:**
- Mobile app lacks some desktop features
- Email templates could be more flexible
- Customer support response time varies

**Specific Use Case:**
We used it primarily for lead nurturing and client communication.
The automation workflows helped us scale from 50 to 200 leads/month
without additional staff.
```

## 🔄 Updating Existing Listings

### When to Update
- Pricing changes
- New features or integrations
- Contact information changes
- Broken links or outdated information

### How to Update
1. **Find the listing** in `listings/<category>/`
2. **Make necessary changes** to the YAML or content
3. **Update the `updated_at` field** to today's date
4. **Submit a PR** with a clear description of changes

## 🎨 Style Guidelines

### Writing Style
- **Tone:** Professional but approachable
- **Voice:** Active voice preferred
- **Length:** Concise and scannable
- **Perspective:** User-focused, not company-focused

### Formatting
- **Headings:** Use consistent heading structure
- **Lists:** Use bullet points for features
- **Links:** Ensure all links work and are relevant
- **Images:** Optimize for web (PNG/JPG, <500KB)

### India-Specific Context
- **Pricing:** Always in ₹ when available
- **Integrations:** Mention UPI, WhatsApp, GST tools
- **Compliance:** Note relevant regulations (GDPR, etc.)
- **Support:** Mention IST support hours if available

### Technical Requirements
- **File format:** Markdown with YAML front-matter
- **Character encoding:** UTF-8
- **Line endings:** LF (Unix-style)
- **Images:** External links preferred over repo storage

## 🔍 Review Process

### Automated Validation
Our GitHub Actions will automatically:
- Validate YAML schema
- Check all links
- Verify file structure
- Run duplicate detection

### Manual Review
Maintainers will check:
- Content quality and accuracy
- India-relevance
- Completeness of information
- Compliance with guidelines

### Approval Process
1. **Automated checks pass** ✅
2. **Manual review by maintainers** 👥
3. **Community feedback period** 🗣️
4. **Final approval and merge** ✅

### Timeline
- **Automated validation:** Immediate
- **Initial review:** 2-3 business days
- **Community feedback:** 3-5 days
- **Final decision:** Within 1 week

## 🚫 What We Don't Accept

### Listings
- Duplicate products
- Non-SaaS products (unless B2B software)
- Products with no India presence/relevance
- Incomplete or low-quality submissions
- Products that violate our Code of Conduct

### Reviews
- Fake or spam reviews
- Reviews without proper context
- Personal attacks or inappropriate content
- Reviews from accounts created solely for reviewing
- Reviews that violate GitHub's Terms of Service

## 🎯 Quality Standards

### For Listings
- Complete and accurate information
- Working links and contact information
- Clear, factual descriptions
- Proper categorization
- India-relevant context

### For Reviews
- Based on actual usage experience
- Includes relevant context
- Constructive and helpful tone
- Follows our review template
- No conflicts of interest (or disclosed)

## 🆘 Getting Help

### Questions About Contributing
- Check existing [discussions](https://github.com/salesuplabs/appsutra/discussions)
- Create a new discussion for general questions
- Tag maintainers for urgent issues

### Technical Issues
- [Open a bug report](https://github.com/salesuplabs/appsutra/issues/new?template=bug_report.yml)
- Include steps to reproduce
- Provide environment details

### Content Guidelines
- Review this contributing guide
- Check existing high-quality listings as examples
- Ask in discussions for clarification

## 👥 Community

### Code of Conduct
All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md).

### Recognition
Contributors are recognized through:
- GitHub contributor graphs
- Special mentions in releases
- Community appreciation posts

---

Thank you for helping make AppSutra the best SaaS directory for Indian businesses! 🚀

**Ready to contribute?**
- [Add a listing](https://github.com/salesuplabs/appsutra/compare)
- [Write a review](https://github.com/salesuplabs/appsutra/issues/new?template=review.yml)
- [Report a bug](https://github.com/salesuplabs/appsutra/issues/new?template=bug_report.yml)
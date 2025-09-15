# AppSutra Open Directory – GitHub repo blueprint

A ready‑to‑fork repository layout (with templates + workflows) so vendors can add listings via Pull Requests and users can leave reviews via GitHub Issues/Discussions. Includes schema validation, auto‑labels, and a static‑site build hook.

---

## 1) Repository structure

```
appsutra-directory/
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ MODERATION.md
├─ LICENSE
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ review.yml
│  │  └─ bug_report.yml
│  ├─ PULL_REQUEST_TEMPLATE.md
│  ├─ workflows/
│  │  ├─ validate-listings.yml
│  │  ├─ labeler.yml
│  │  └─ build-preview.yml
│  └─ labeler.yml
├─ schema/
│  ├─ listing.schema.json
│  └─ categories.json
├─ scripts/
│  ├─ validate.mjs
│  ├─ linkcheck.mjs
│  └─ slugify.mjs
├─ listings/
│  ├─ crm/
│  │  └─ zoho-crm.md
│  ├─ hr/
│  ├─ marketing/
│  └─ finance/
└─ reviews/ (optional if storing reviews as files; otherwise via Issues)
```

> **Approach**
> - Listings are Markdown files with YAML front‑matter (easy for non‑devs; great for SSGs like Next.js/Contentlayer or Astro).
> - Reviews are GitHub Issues using a template (simpler) or YAML files inside `/reviews/` (optional).

---

## 2) Listing file format (Markdown + YAML front‑matter)

**Path:** `listings/<category>/<slug>.md`

```md
---
name: "Zoho CRM"
slug: "zoho-crm"             # unique, lowercase kebab
category: "crm"              # one of schema/categories.json
website: "https://www.zoho.com/crm/"
logo: "https://.../zoho.png" # optional; can host in /public/logos
pricing: "Free + Paid from ₹900/mo"
locations: ["India", "Global"]
use_cases: ["SMB", "Sales Automation", "Lead Management"]
keywords: ["crm", "sales", "automation"]
trial: true
integrations: ["Gmail", "WhatsApp", "Zapier"]
contact_email: "partners@zoho.com"
listing_owner_github: "@vendorhandle"
verified: false               # maintainers can toggle true after checks
updated_at: "2025-09-15"
---

**About**

Short description in a paragraph or two. Keep it objective, feature‑focused, and India‑context friendly.

**Highlights**

- Pipeline, automation, workflows
- WhatsApp integration for India sales teams
- Android/iOS apps

**Plans & Pricing**

- Free (3 users)
- Standard: ₹900/user/mo
- Professional: ₹1,600/user/mo

**Screenshots**

![Pipeline view](https://...)
```

---

## 3) Reviews via GitHub Issues (recommended)

Use Issues for reviews to avoid PR friction. Each listing links to a canonical Issue.

- Create an Issue template `review.yml`:

```yaml
name: "Write a review"
description: "Share your experience with a product on AppSutra Directory"
title: "Review: <product name>"
labels: ["review"]
body:
  - type: dropdown
    id: product
    attributes:
      label: Product
      options:
        - Zoho CRM
        - Freshsales
        - LeadSquared
    validations:
      required: true
  - type: dropdown
    id: rating
    attributes:
      label: Rating (1-5)
      options: ["1","2","3","4","5"]
    validations:
      required: true
  - type: textarea
    id: pros
    attributes:
      label: Pros
  - type: textarea
    id: cons
    attributes:
      label: Cons
  - type: textarea
    id: context
    attributes:
      label: Your context (team size, use case)
```

> You can generate the Issue link dynamically on the site: e.g., `https://github.com/<org>/<repo>/issues/new?template=review.yml&product=Zoho%20CRM`.

**Alternative**: reviews as files `reviews/<slug>/*.yml` if you want file‑based storage (adds moderation overhead).

---

## 4) Pull Request template (vendors adding a listing)

**Path:** `.github/PULL_REQUEST_TEMPLATE.md`

```md
## New Listing Submission

- [ ] I confirm this is a **new** listing and not a duplicate
- [ ] File path follows `listings/<category>/<slug>.md`
- [ ] Front‑matter passes schema validation
- [ ] Links (website/logo) are reachable

**Product Name:**

**Category:** (crm | hr | marketing | finance | other)

**Website:**

**Contact Email (for verification):**

**Notes for Maintainers:**
- Optional context, India pricing, integrations, etc.
```

---

## 5) JSON Schema (validation)

**Path:** `schema/listing.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://appsutra.ai/listing.schema.json",
  "title": "Listing",
  "type": "object",
  "properties": {
    "name": {"type": "string", "minLength": 2},
    "slug": {"type": "string", "pattern": "^[a-z0-9-]+$"},
    "category": {"type": "string"},
    "website": {"type": "string", "format": "uri"},
    "logo": {"type": "string", "format": "uri", "nullable": true},
    "pricing": {"type": "string"},
    "locations": {"type": "array", "items": {"type": "string"}},
    "use_cases": {"type": "array", "items": {"type": "string"}},
    "keywords": {"type": "array", "items": {"type": "string"}},
    "trial": {"type": "boolean"},
    "integrations": {"type": "array", "items": {"type": "string"}},
    "contact_email": {"type": "string", "format": "email"},
    "listing_owner_github": {"type": "string"},
    "verified": {"type": "boolean"},
    "updated_at": {"type": "string", "format": "date"}
  },
  "required": ["name", "slug", "category", "website", "pricing", "updated_at"],
  "additionalProperties": true
}
```

**Categories:** `schema/categories.json`

```json
["crm", "hr", "marketing", "finance", "support", "analytics", "security", "devtools", "accounting"]
```

---

## 6) Validation scripts (Node ESM)

**Path:** `scripts/validate.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { Ajv } from "ajv";

const schema = JSON.parse(fs.readFileSync("schema/listing.schema.json", "utf8"));
const categories = JSON.parse(fs.readFileSync("schema/categories.json", "utf8"));
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

const files = await fg(["listings/**/*.md"], { dot: false });
const slugs = new Set();
let failed = false;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);

  // category check
  if (!categories.includes(data.category)) {
    console.error(`✖ ${file} invalid category: ${data.category}`);
    failed = true;
  }

  // schema check
  const ok = validate(data);
  if (!ok) {
    console.error(`✖ ${file} schema errors`, validate.errors);
    failed = true;
  }

  // unique slug
  if (slugs.has(data.slug)) {
    console.error(`✖ duplicate slug: ${data.slug}`);
    failed = true;
  }
  slugs.add(data.slug);
}

if (failed) {
  process.exit(1);
} else {
  console.log("✓ All listings valid");
}
```

**Path:** `scripts/linkcheck.mjs` (simple HEAD checks)

```js
import { request } from "undici";
import fg from "fast-glob";
import fs from "node:fs";
import matter from "gray-matter";

const files = await fg(["listings/**/*.md"]);
let failed = false;

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  const urls = [data.website, data.logo].filter(Boolean);
  for (const url of urls) {
    try {
      const res = await request(url, { method: "HEAD" });
      if (res.statusCode >= 400) {
        console.error(`✖ ${file} broken URL: ${url} -> ${res.statusCode}`);
        failed = true;
      }
    } catch (e) {
      console.error(`✖ ${file} URL error: ${url}`, e.message);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log("✓ Links OK");
```

---

## 7) GitHub Actions

**A) Validate on every PR** – `.github/workflows/validate-listings.yml`

```yaml
name: Validate Listings
on:
  pull_request:
    paths:
      - 'listings/**'
      - 'schema/**'
      - 'scripts/**'
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm i fast-glob gray-matter ajv undici
      - run: node scripts/validate.mjs
      - run: node scripts/linkcheck.mjs
```

**B) Auto‑label PRs by category** – `.github/labeler.yml`

```yaml
crm:
  - 'listings/crm/**'
hr:
  - 'listings/hr/**'
marketing:
  - 'listings/marketing/**'
finance:
  - 'listings/finance/**'
```

**Workflow** `.github/workflows/labeler.yml`

```yaml
name: PR Labeler
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/labeler@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          configuration-path: .github/labeler.yml
```

**C) Build Preview (optional)** – run your SSG build to ensure it won’t break; you can also wire to Vercel/Cloudflare previews.

```yaml
name: Build Preview
on:
  pull_request:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
```

> If using **Vercel**, add another job with `amondnet/vercel-action@v25` and `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets to comment a preview URL on the PR.

---

## 8) Contributor docs

**README.md** – quick intro + how to add a listing.

```md
# AppSutra – Open SaaS Directory (India‑first)

Add your product as a Markdown file via Pull Request. We validate format, links, and categories automatically.

## Add a listing
1. Fork this repo
2. Create a file at `listings/<category>/<slug>.md` (see examples)
3. Fill the YAML front‑matter + details
4. Open a Pull Request

Your PR will run checks; maintainers will review quickly.
```

**CONTRIBUTING.md** – clear steps + style guide.

```md
## Style Guidelines
- Keep descriptions factual and neutral (no superlatives).
- India context welcome (pricing in ₹, UPI/WhatsApp integrations, etc.).
- Screenshots: PNG/JPG under 500KB.
- Use lowercase kebab for `slug`.
```

**MODERATION.md** – rules for listings & reviews.

```md
- No personal attacks; focus on product experience.
- Reviews must include context (team size, use case).
- Vendors may respond once per review with disclosures.
- Repeated spam or astroturfing => banned.
```

**CODE_OF_CONDUCT.md** – standard (Contributor Covenant).

---

## 9) Optional: Accept submissions from a web form (auto‑PR)

- Build a simple form on appsutra.ai (Next.js) → an API route that:
  1) Validates inputs
  2) Generates the Markdown file text
  3) Creates a branch + commit via GitHub API
  4) Opens a Pull Request to this repo

**Pseudo‑code (Next.js API route):**

```ts
import { Octokit } from 'octokit';
import slugify from 'slugify';

export default async function handler(req, res) {
  const body = req.body;
  const slug = slugify(body.name, { lower: true, strict: true });
  const content = `---\nname: "${body.name}"\nslug: "${slug}"\ncategory: "${body.category}"\nwebsite: "${body.website}"\npricing: "${body.pricing}"\nupdated_at: "${new Date().toISOString().slice(0,10)}"\n---\n\n${body.description}\n`;

  const owner = process.env.GH_OWNER;
  const repo = process.env.GH_REPO;
  const base = 'main';
  const branch = `listing/${slug}`;
  const octo = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // create branch from latest main
  const { data: mainRef } = await octo.rest.git.getRef({ owner, repo, ref: 'heads/' + base });
  await octo.rest.git.createRef({ owner, repo, ref: 'refs/heads/' + branch, sha: mainRef.object.sha });

  // add file
  const path = `listings/${body.category}/${slug}.md`;
  await octo.rest.repos.createOrUpdateFileContents({
    owner, repo, path, branch,
    message: `feat: add ${body.name} listing`,
    content: Buffer.from(content, 'utf8').toString('base64')
  });

  // open PR
  const pr = await octo.rest.pulls.create({ owner, repo, head: branch, base, title: `Add ${body.name}` });
  res.status(200).json({ url: pr.data.html_url });
}
```

> Store `GITHUB_TOKEN` with `public_repo` scope (or use a GitHub App). Add basic rate‑limit + captcha on the form.

---

## 10) Static site (SSG) notes

- **Next.js + Contentlayer**: parse `listings/**.md`, build category and vendor pages, add search (Algolia DocSearch or client‑side fuse.js).
- **SEO**: add JSON‑LD `SoftwareApplication` to listing pages.
- **Permalinks**: `/<category>/<slug>`.
- **CTA**: "Get free shortlist" → your lead form.

---

## 11) Quick start checklist

- [ ] Create repo from this blueprint
- [ ] Enable GitHub Issues + Discussions
- [ ] Add repo secrets if using previews (Vercel tokens)
- [ ] Create initial categories & 5–10 seed listings
- [ ] Publish contribution tweet/link to invite vendors

---

**This gives you a clean, auditable, low‑ops workflow**: vendors submit via PRs, users review via Issues, bots validate, and your site auto‑publishes on merge.


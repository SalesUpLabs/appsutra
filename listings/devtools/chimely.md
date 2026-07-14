---
icon: "https://avatars.githubusercontent.com/dodopayments"
name: "Chimely"
company: "Dodo Payments"
trialPlan: true
trialPlanPricing: "Free"
category: "DevTools"
useCases:
  - "In-App Notifications"
  - "Notification Inbox"
  - "Real-time Notifications"
  - "Developer Tools"
keywords:
  - "notifications"
  - "notification inbox"
  - "in-app notifications"
  - "self-hosted"
  - "open source"
  - "rust"
  - "postgres"
  - "redis"
  - "react"
  - "novu alternative"
  - "knock alternative"
  - "courier alternative"
  - "magicbell alternative"
  - "developer tools"
integration:
  - title: "PostgreSQL"
  - title: "Redis"
  - title: "React"
description: |
  Open-source, self-hostable in-app notification inbox infrastructure (Rust + Postgres + Redis) with a drop-in `<Inbox />` React component. Self-hosted alternative to Knock, Courier, MagicBell, and Novu.

  Chimely ships as a single Rust binary backed by Postgres (source of truth) and Redis (real-time plane), exposing a small HTTP API plus Server-Sent Events for live updates. Drop the headless `@chimely/client` core or the `@chimely/react` `<Inbox />` component into your frontend to add a notification inbox, unread counts, and read state without building notification plumbing yourself.

  **Key Highlights**
  - Self-hostable: run one Rust binary alongside Postgres and Redis
  - Drop-in `<Inbox />` React component and headless TypeScript client
  - Real-time delivery hints over SSE with REST refetch
  - GitHub: https://github.com/dodopayments/chimely
  - License: AGPL-3.0 (server); MIT (client SDKs)
locations:
  - "Global"
  - "India"
website: "https://chimely.dev"
updated_at: "2026-07-14"
keyFeatures:
  description: "Chimely provides the infrastructure to add an in-app notification inbox to any product, with a self-hostable backend and ready-to-use frontend components."
  features:
    - title: "Drop-in Inbox Component"
      desc: "Embed a prebuilt `<Inbox />` React component or use the headless TypeScript client."
    - title: "Self-Hostable Infrastructure"
      desc: "Runs as a single Rust binary with Postgres and Redis, deployable on your own infrastructure."
    - title: "Real-time Notifications"
      desc: "Server-Sent Events deliver live hints while REST endpoints serve authoritative data."
    - title: "Direct & Broadcast Notifications"
      desc: "Send per-recipient notifications or broadcast announcements from one inbox model."
    - title: "Unread Counts & Read State"
      desc: "Track unread counts and read state consistently across notification sources."
    - title: "Open Source"
      desc: "AGPL-3.0 server with MIT-licensed client SDKs you can embed in your frontend."
buyingGuide:
  - question: "1. Do you need to self-host your notification infrastructure?"
    why: "Chimely is self-hostable and data stays on your own infrastructure"
    answer: "Consider whether you require full control over notification data and deployment."
  - question: "2. What is your frontend stack?"
    why: "Chimely ships a React `<Inbox />` component and a headless TypeScript client"
    answer: "Confirm you can integrate a React component or a headless JS client."
  - question: "3. Can you run Postgres and Redis?"
    why: "Chimely depends on Postgres as the source of truth and Redis for real-time"
    answer: "Ensure your infrastructure can host Postgres and Redis."
  - question: "4. Are you evaluating alternatives to hosted notification services?"
    why: "Chimely is a self-hosted alternative to Knock, Courier, MagicBell, and Novu"
    answer: "Compare against hosted providers on cost, control, and data residency."
  - question: "5. Is AGPL-3.0 licensing compatible with your usage?"
    why: "The server is AGPL-3.0 while the client SDKs are MIT"
    answer: "Review whether AGPL-3.0 for the self-hosted server fits your requirements."
pricing:
  desc: "Chimely is open source and free to self-host. The server is licensed under AGPL-3.0 and the client SDKs under MIT."
  plans:
    - name: "Open Source (Self-Hosted)"
      pricing:
        amount: 0
        currency: "USD"
        currencySymbol: "$"
        period: "month"
        perUnit: null
      description: "Free and open source. Self-host the Rust server with your own Postgres and Redis. No usage fees."
---

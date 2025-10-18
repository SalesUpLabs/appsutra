import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getListingBySlug,
  getAllListings,
  getRelatedListings,
} from "@/lib/listings";
import {
  formatPricing,
  isIndianCompany,
  formatDate,
  getCategoryDisplayName,
} from "@/lib/utils";
import WhyChooseUs from "@/components/pages/productdetails/whyChooseUs";
import { Product } from "@/types/product";
import { ProductHeader } from "@/components/pages/productdetails/productHeader";
import { ProductInfo } from "@/components/pages/productdetails/productinfo";
import KeyFeatures from "@/components/pages/productdetails/keyFeatures";
import IntegrationsPage from "@/components/pages/productdetails/integrationsPage";
import BuyingGuide from "@/components/pages/productdetails/buyingGuide";
import PricingOverview from "@/components/pages/productdetails/pricingOverview";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const ProductData: Product = {
  icon: "/icons/ProductDetailsPage/keka/icon.png",
  name: "Keka Services",
  company: "Keka Services Private Limited",
  freeplan: true,
  freeplanpricing: "Rs.1,200/mo",
  category: "Human Resource",
  categorySlug: "human-resource",
  slug: "keka-services",
  useCases: ["Lead Management", "Sales Pipeline", "Financial Services"],
  keywords: [
    "hr",
    "hrms",
    "payroll",
    "employee management",
    "attendance",
    "time tracking",
    "performance management",
    "recruitment",
    "onboarding",
    "offboarding",
    "leave management",
    "benefits administration",
    "compliance management",
  ],
  integration: [
    { title: "Razorpay" },
    { title: "Slack" },
    { title: "Microsoft Teams" },
    { title: "Google workspace" },
    { title: "HDFC Bank" },
    { title: "Razorpay" },
    { title: "Microsoft Teams" },
    { title: "Slack" },
    { title: "Microsoft Teams" },
    { title: "HDFC Bank" },
    { title: "Razorpay" },
    { title: "Razorpay" },
    { title: "Google workspace" },
    { title: "Microsoft Teams" },
    { title: "Slack" },
    { title: "Google workspace" },
    { title: "Razorpay" },
    { title: "Slack" },
    { title: "Microsoft Teams" },
    { title: "Google workspace" },
    { title: "HDFC Bank" },
    { title: "Razorpay" },
    { title: "Microsoft Teams" },
    { title: "Slack" },
    { title: "Microsoft Teams" },
    { title: "HDFC Bank" },
    { title: "Razorpay" },
    { title: "Razorpay" },
    { title: "Google workspace" },
    { title: "Microsoft Teams" },
    { title: "Slack" },
    { title: "Google workspace" },
  ],
  description:
    "A modern HR & payroll platform for growing businesses.\n\nKeka is your people enabler. From automation of people processes to creating an engaged and driven culture, Keka is all you need to build a good to great company.\n\nThe world has changed, and it's going to keep changing. Keka HR helps your teams to adapt, evolve, and scale by working more effectively. Spend less time on mundane tasks and focus more on strategy. Turn data into smarter decisions and create experiences your employees will love.\n\nIt is a cloud-based HR and payroll management platform designed to simplify people operations for modern organizations. It streamlines employee lifecycle management — from hiring and onboarding to payroll, attendance, performance, and compliance — all in one place.\n\nBuilt with employee-first design, Keka empowers HR teams to automate repetitive tasks, reduce administrative overhead, and focus on people development. With seamless integrations, data security, and customizable workflows, it adapts to businesses of every size.\n\n**Key Highlights**\n- Unified HR, payroll, and talent management system\n- Employee self-service portal for accessibility\n- Customizable workflows to match company policies\n- Secure, compliant, and scalable for SMBs and enterprises",
  //markdown content
  locations: ["India", "Global"],
  website: "https://www.keka.com/?utm=appsutra.com",
  keyFeatures: {
    description:
      "Our platform is designed to simplify HR and payroll processes while empowering employees and managers. From seamless leave management to automated payroll and real-time analytics, these features help businesses stay compliant, boost efficiency, and improve overall workforce management.",
    features: [
      {
        title: "Leave & Claims Management",
        desc: "Manage employee leaves and claims with ease.",
      },
      {
        title: "Statutory Compliance",
        desc: "Ensure PF, ESI, and tax compliance effortlessly.",
      },
      {
        title: "Performance Management",
        desc: "Track goals, appraisals & growth with ease.",
      },
      {
        title: "Automated Payroll",
        desc: "HR tasks anytime, anywhere via mobile.",
      },
      {
        title: "Statutory Compliance",
        desc: "Ensure PF, ESI, and tax compliance effortlessly.",
      },
      {
        title: "Performance Management",
        desc: "Track goals, appraisals & growth with ease.",
      },
      {
        title: "Automated Payroll",
        desc: "HR tasks anytime, anywhere via mobile.",
      },
      {
        title: "Leave & Claims Management",
        desc: "Manage employee leaves and claims with ease.",
      },
    ],
  },
  buyingGuide: [
    {
      question: "1. What's your team size and expected growth?",
      why: "Critical for pricing and feature planning",
      answer: "Consider both current needs and 12-18 month projections",
    },
    {
      question: "2. Which existing tools need integration?",
      why: "Affects workflow efficiency and adoption",
      answer:
        "List your current stack: CRM, project management, calendar, etc.",
    },
    {
      question: "3. What's your security and compliance requirements?",
      why: "May be regulatory requirement",
      answer: "Consider GDPR, SOC2, HIPAA, or industry-specific standards",
    },
    {
      question: "4. Who will be the primary administrators?",
      why: "Affects training needs and ongoing management",
      answer: "Plan for user onboarding, training, and ongoing support",
    },
    {
      question: "5. What's your budget range and billing preference?",
      why: "Determines viable options",
      answer:
        "Consider monthly vs annual billing, volume discounts, and hidden costs",
    },
    {
      question: "6. Who will be the primary administrators?",
      why: "Affects training needs and ongoing management",
      answer: "Plan for user onboarding, training, and ongoing support",
    },
    {
      question: "7. What's your security and compliance requirements?",
      why: "May be regulatory requirement",
      answer: "Consider GDPR, SOC2, HIPAA, or industry-specific standards",
    },
    {
      question: "8. Which existing tools need integration?",
      why: "Affects workflow efficiency and adoption",
      answer:
        "List your current stack: CRM, project management, calendar, etc.",
    },
  ],
  pricing: {
    desc: "Keka offers a variety of pricing plans to suit different business needs. Here are the main plans available:",
    plans: [
      {
        name: "Starter Plan",
        pricing: {
          amount: 8000,
          currency: "INR",
          currencySymbol: "₹",
          period: "month",
          perUnit: null, // null means flat rate, could be 'user', 'employee', etc.
        },
        description:
          "For up to **50 employees**, Keka offers an affordable starter plan with all essential HR and payroll features.",
      },
      {
        name: "Growth Plan",
        pricing: {
          amount: 12000,
          currency: "INR",
          currencySymbol: "₹",
          period: "month",
          perUnit: null,
        },
        description:
          "Plans start at a monthly rate, covering up to **100 employees** with core HR and payroll features.",
      },
      {
        name: "Scale Plan",
        pricing: {
          amount: 8000,
          currency: "INR",
          currencySymbol: "₹",
          period: "month",
          perUnit: null,
        },
        description:
          "Available at a monthly rate for up to **200 employees**, with complete HR and payroll functionality.",
      },
      {
        name: "Enterprise Plan",
        pricing: {
          amount: null, // null for custom pricing
          currency: "INR",
          currencySymbol: "₹",
          period: "month",
          perUnit: null,
          isCustom: true,
        },
        description:
          "Custom pricing for 200+ employees - Includes payroll processing statutory compliance and support.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const listings = await getAllListings();
  return listings.map((listing) => ({
    category: listing.category,
    slug: listing.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const listing = await getListingBySlug(category, slug);

  if (!listing) {
    return {
      title: "Product Not Found - AppSutra",
    };
  }

  return {
    title: `${listing.name} - ${getCategoryDisplayName(
      listing.category
    )} Software | AppSutra`,
    description:
      listing.excerpt ||
      `${listing.name} is a ${listing.category} solution. ${formatPricing(
        listing.pricing
      )}. ${listing.trial ? "Free trial available." : ""}`,
    keywords: [
      listing.name,
      ...(listing.keywords || []),
      listing.category,
      "software",
      "SaaS",
      "India",
    ],
    openGraph: {
      title: `${listing.name} - ${getCategoryDisplayName(
        listing.category
      )} Software`,
      description:
        listing.excerpt || `${listing.name} is a ${listing.category} solution`,
      type: "website",
      images: listing.logo ? [{ url: listing.logo }] : [],
    },
  };
}

function parseMarkdownContent(content: string) {
  // Simple markdown parsing - in production, you'd use a proper markdown parser
  const sections = content.split(/^##\s+/m).filter(Boolean);
  const parsed: { [key: string]: string } = {};

  sections.forEach((section) => {
    const lines = section.trim().split("\n");
    const title = lines[0].replace(/^\*\*|\*\*$/g, "").trim();
    const body = lines.slice(1).join("\n").trim();
    parsed[title.toLowerCase()] = body;
  });

  return parsed;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  const listing = await getListingBySlug(category, slug);

  if (!listing) {
    notFound();
  }

  const relatedListings = await getRelatedListings(listing, 3);
  const categoryName = getCategoryDisplayName(listing.category);
  const parsedContent = parseMarkdownContent(listing.content);

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <WhyChooseUs />
      <ProductHeader
        company={ProductData.company}
        name={ProductData.name}
        icon={ProductData.icon}
        freeplan={ProductData.freeplan}
        freeplanpricing={ProductData.freeplanpricing}
        categorySlug={ProductData.categorySlug}
        slug={ProductData.slug}
      />
      {/* <div className="relative flex flex-col h-screen"> */}
      <div className="px-6 py-3">
        <ProductInfo product={ProductData} />
        <KeyFeatures data={ProductData.keyFeatures} />
        <BuyingGuide questions={ProductData.buyingGuide} />
        <PricingOverview data={ProductData.pricing} />
        <IntegrationsPage integrations={ProductData.integration} />
        {/* <SoftwareComparisonCarousel /> */}
      </div>
      {/* </div> */}

      {/* <Footer /> */}
    </div>
  );
}

import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
} from "@/lib/listings";
import WhyChooseUs from "@/components/pages/productdetails/whyChooseUs";
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

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    category: product.categorySlug,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);

  if (!product) {
    return {
      title: "Product Not Found - AppSutra",
    };
  }

  // Get first paragraph from description as excerpt
  const excerpt = product.description.split('\n\n')[0];

  return {
    title: `${product.name} - ${product.category} Software | AppSutra`,
    description:
      excerpt ||
      `${product.name} by ${product.company} is a ${product.category} solution.`,
    keywords: [
      
      product.name,
      ...(product.keywords || []),
      product.category,
      "software",
      "SaaS",
      "India",
    ],
    openGraph: {
      title: `${product.name} - ${product.category} Software`,
      description:
        excerpt || `${product.name} is a ${product.category} solution`,
      type: "website",
      images: product.icon ? [{ url: product.icon }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <WhyChooseUs />
      <ProductHeader
        company={product.company}
        name={product.name}
        icon={product.icon}
        trialPlan={product.trialPlan}
        trialPlanPricing={product.trialPlanPricing}
        categorySlug={product.categorySlug}
        slug={product.slug}
      />
      <div className="px-fluid-6 py-fluid-3">
        <ProductInfo product={product} />
        <KeyFeatures data={product.keyFeatures} />
        <BuyingGuide questions={product.buyingGuide} />
        <PricingOverview data={product.pricing} />
        <IntegrationsPage integrations={product.integration} />
      </div>

    </div>
  );
}

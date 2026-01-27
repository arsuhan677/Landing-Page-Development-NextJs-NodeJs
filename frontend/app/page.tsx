import BeforeAfterSection from "@/components/BeforeAfterSection";
import CertificationSection from "@/components/CertificationSection";
import CheckoutSection from "@/components/CheckoutSection";
import CustomerReviews from "@/components/CustomerReviews";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import IngredientsSection from "@/components/IngredientsSection";
import ProductCollection from "@/components/ProductCollection";
import ProductGallery from "@/components/ProductGallery";
import ProductHero from "@/components/ProductHero";
import TrustIndicators from "@/components/TrustIndicators";
import UsageSteps from "@/components/UsageSteps";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FFF5ED]">
      <ProductHero />
      <FeaturesSection />
      <IngredientsSection />
      <UsageSteps />
      <BeforeAfterSection />
      <ProductGallery />
      <ProductCollection />
      <CertificationSection />
      <CustomerReviews />
      <TrustIndicators />
      <FAQSection />
      <CheckoutSection />
    </div>
  );
}

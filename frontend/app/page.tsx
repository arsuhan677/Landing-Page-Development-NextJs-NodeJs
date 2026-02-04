import Image from "next/image";
import CheckoutSection from "../components/sections/CheckoutSection";
import CustomerReviews from "../components/sections/CustomerReviews";
import FAQSection from "@/components/sections/FAQSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IngredientsSection from "../components/sections/IngredientsSection";
import ProductCollection from "../components/sections/ProductCollection";
import ProductGallery from "@/components/sections/ProductGallery";
import ProductHero from "../components/sections/ProductHero";
import TrustIndicators from "../components/sections/TrustIndicators";
import UsageSteps from "@/components/sections/UsageSteps";
import BeforeAfterSection from "../components/sections/BeforeAfterSection";

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
      <CustomerReviews />
      <TrustIndicators />
      <FAQSection />
      <CheckoutSection />
    </div>
  );
}

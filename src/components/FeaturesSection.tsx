import { Heart, Sparkles, Gift, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Heart,
    title: "Souvenirs éternels",
    description: "Revivez vos plus beaux moments gravés à jamais",
  },
  {
    icon: Sparkles,
    title: "Qualité premium",
    description: "Plexiglas haute définition et bois véritable",
  },
  {
    icon: Gift,
    title: "Cadeau parfait",
    description: "Offrez une émotion unique pour la Saint-Valentin",
  },
  {
    icon: Truck,
    title: "Livraison gratuite",
    description: "Expédié sous 24h, chez vous en 3-5 jours",
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-secondary py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-2">POURQUOI MEMORY ?</p>
          <h2 className="section-title">Un instant figé, une émotion éternelle</h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="rounded-full px-8"
            onClick={() => navigate("/product")}
          >
            Créer mon Memory
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

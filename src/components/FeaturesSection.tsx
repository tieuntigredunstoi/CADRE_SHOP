import { Award, Clock, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Award,
    title: "Qualité professionnelle",
    description: "Utilisés dans les meilleurs salons de beauté",
  },
  {
    icon: Clock,
    title: "Application 5 minutes",
    description: "Pas besoin d'être experte pour un résultat parfait",
  },
  {
    icon: RefreshCw,
    title: "Réutilisables",
    description: "Jusqu'à 10 utilisations avec un bon entretien",
  },
  {
    icon: Truck,
    title: "Livraison gratuite",
    description: "Expédié sous 24h, chez vous en 2-3 jours",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-secondary py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-2">POURQUOI LASH GLOW ?</p>
          <h2 className="section-title">Des cils parfaits, sans rendez-vous salon</h2>
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
          <Button size="lg" className="rounded-full px-8">
            Essayer maintenant
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

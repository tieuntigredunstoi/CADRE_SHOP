import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-memory.webp";

const Hero = () => {
  return (
    <section className="bg-background py-8 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-1 md:order-1 animate-fade-in">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-10 bg-card rounded-full py-2 px-4 shadow-lg flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">-50% Saint-Valentin</span>
            </div>
            
            {/* Hero Image */}
            <Link to="/product" className="block relative rounded-2xl overflow-hidden bg-secondary group">
              <img
                src={heroImage}
                alt="Memory - Cadre personnalisé plexiglas"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Brand watermark */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <span className="text-2xl font-display text-primary-foreground/40 tracking-widest">
                  MEMORY
                </span>
              </div>
            </Link>
          </div>

          {/* Content Section */}
          <div className="order-2 md:order-2 space-y-6 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
            <p className="section-label">MEMORY</p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal leading-tight text-foreground">
              Vos souvenirs<br />
              <span className="italic">gravés pour l'éternité.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Capturez l'essence de vos moments uniques sur une plaque en plexiglas haute définition avec support en bois véritable.
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Personnalisable
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Qualité HD
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Livraison gratuite
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link to="/product">
                <Button size="lg" className="rounded-full px-8 group">
                  Créer mon cadre — 9,99€
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

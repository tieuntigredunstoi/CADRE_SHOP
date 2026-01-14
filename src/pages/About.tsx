import { Heart, Award, Users, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroModel from "@/assets/hero-model.png";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Chaque produit est créé avec amour et attention aux détails pour sublimer votre regard."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Nous sélectionnons uniquement les meilleurs matériaux pour garantir confort et durabilité."
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Plus de 50 000 clientes nous font confiance. Rejoignez la famille LASH GLOW."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Nous développons constamment de nouvelles formules et designs pour vous surprendre."
    }
  ];

  const milestones = [
    { year: "2020", title: "Création de LASH GLOW", description: "Naissance de notre marque à Paris avec une mission simple : démocratiser les faux cils professionnels." },
    { year: "2021", title: "10 000 clientes", description: "Notre communauté grandit grâce au bouche-à-oreille et aux avis positifs." },
    { year: "2022", title: "Lancement international", description: "Expansion en Europe avec livraison dans 15 pays." },
    { year: "2023", title: "Gamme élargie", description: "Introduction de nouvelles longueurs et styles pour tous les regards." },
    { year: "2024", title: "50 000+ clientes", description: "Aujourd'hui, nous sommes fières d'accompagner des milliers de femmes au quotidien." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
                  Notre Histoire
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-normal text-foreground mb-6 leading-tight">
                  La beauté accessible à toutes
                </h1>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  LASH GLOW est née d'une conviction simple : chaque femme mérite d'avoir accès à des faux cils de qualité professionnelle, faciles à appliquer et à un prix accessible.
                </p>
                <p className="text-muted-foreground mb-8">
                  Fondée en 2020 à Paris, notre marque s'est rapidement imposée comme la référence des faux cils individuels en France. Notre secret ? Une obsession pour la qualité et l'écoute de notre communauté.
                </p>
                <Link to="/product">
                  <Button size="lg" className="rounded-full">
                    Découvrir nos produits
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img 
                  src={heroModel} 
                  alt="Fondatrice LASH GLOW" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                Nos Valeurs
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-normal text-foreground">
                Ce qui nous anime
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                Notre Parcours
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-normal text-foreground">
                Une aventure qui commence
              </h2>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full min-h-[60px] bg-primary/20" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
              Notre Promesse
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-normal text-foreground mb-8">
              Pourquoi nous choisir ?
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
              {[
                "Faux cils testés dermatologiquement",
                "Colle hypoallergénique sans latex",
                "Livraison gratuite en France",
                "Garantie satisfait ou remboursé 30 jours",
                "Service client réactif 7j/7",
                "Qualité professionnelle à prix accessible"
              ].map((promise, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{promise}</span>
                </div>
              ))}
            </div>

            <Link to="/product">
              <Button size="lg" className="rounded-full">
                Commander maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

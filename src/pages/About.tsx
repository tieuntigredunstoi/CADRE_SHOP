import { Heart, Award, Users, Sparkles, CheckCircle, MapPin, Calendar, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroMemory from "@/assets/hero-memory.webp";
import productLifestyle1 from "@/assets/product-lifestyle-1.webp";
import productLifestyle2 from "@/assets/product-lifestyle-2.webp";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Émotion",
      description: "Chaque cadre capture un moment unique, une émotion à préserver pour toujours."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Plexiglas premium et impression haute définition pour un rendu exceptionnel."
    },
    {
      icon: Gift,
      title: "Cadeau parfait",
      description: "Le présent idéal pour la Saint-Valentin, un anniversaire ou toute occasion spéciale."
    },
    {
      icon: Sparkles,
      title: "Personnalisation",
      description: "Chaque création est unique, conçue selon vos souvenirs et vos envies."
    }
  ];

  const milestones = [
    { year: "2022", title: "Naissance de Memory", description: "L'idée naît d'un simple constat : les plus beaux souvenirs méritent d'être gravés dans un objet aussi unique que l'instant vécu." },
    { year: "2023", title: "5 000 souvenirs créés", description: "Notre communauté grandit, portée par les émotions de milliers de couples et de familles." },
    { year: "2024", title: "Nouveaux modèles", description: "Lancement de la carte du ciel, du style album et de la plaque carte personnalisée." },
    { year: "2025", title: "50 000+ clients", description: "Aujourd'hui, Memory accompagne des milliers de personnes dans la célébration de leurs moments précieux." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
                  Notre Histoire
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
                  Capturer l'instant,<br />graver l'émotion.
                </h1>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Memory est né d'une conviction profonde : les moments les plus précieux de notre vie méritent d'être immortalisés dans un objet aussi unique que le souvenir lui-même.
                </p>
                <p className="text-muted-foreground mb-8">
                  Chaque cadre que nous créons raconte une histoire — votre histoire. Une première rencontre, un premier baiser, une demande en mariage... Ces instants fugaces qui changent une vie à jamais.
                </p>
                <Link to="/product">
                  <Button size="lg" className="rounded-full">
                    Créer mon souvenir
                  </Button>
                </Link>
              </motion.div>
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img 
                  src={heroMemory} 
                  alt="Cadre Memory personnalisé" 
                  className="rounded-2xl shadow-xl w-full"
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-lg border border-border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">50 000+</p>
                      <p className="text-xs text-muted-foreground">Souvenirs créés</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                Nos Valeurs
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground">
                Ce qui nous anime
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-all hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={productLifestyle1} 
                  alt="Memory en situation" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src={productLifestyle2} 
                  alt="Memory en situation" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
                  Notre Vision
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground mb-6">
                  Plus qu'un cadre, une émotion
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Tout a commencé par une question simple : comment offrir un cadeau vraiment unique, qui touche le cœur et traverse le temps ?
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Les photos s'oublient dans un téléphone. Les fleurs fanent. Mais un Memory reste là, posé sur une étagère, rappelant chaque jour l'intensité d'un moment vécu.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notre mission est de transformer vos souvenirs les plus précieux en œuvres d'art personnalisées, fabriquées avec soin et livrées avec amour.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                Notre Parcours
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground">
                Une aventure guidée par l'émotion
              </h2>
            </motion.div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4 md:gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-16 md:w-20 text-right">
                    <span className="text-xl md:text-2xl font-bold text-primary">{milestone.year}</span>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                Notre Promesse
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground mb-8">
                Pourquoi choisir Memory ?
              </h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
              {[
                "Plexiglas premium haute définition",
                "Support en bois naturel élégant",
                "Livraison gratuite en France",
                "Garantie satisfait ou remboursé 30 jours",
                "Service client réactif 7j/7",
                "Coffret cadeau inclus"
              ].map((promise, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 bg-background p-4 rounded-xl border border-border"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{promise}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/product">
              <Button size="lg" className="rounded-full">
                Créer mon Memory
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

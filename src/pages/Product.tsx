import { useState, useEffect } from "react";
import { 
  Star, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Clock,
  Heart,
  Eye,
  Users,
  Minus,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import product images
import productMain from "@/assets/product-lashes.jpg";
import productDetail1 from "@/assets/product-detail-1.jpg";
import productDetail2 from "@/assets/product-detail-2.jpg";
import productDetail3 from "@/assets/product-detail-3.jpg";
import reviewImg1 from "@/assets/review-1.jpg";

const productImages = [productMain, productDetail1, productDetail2, productDetail3];

const benefits = [
  { icon: "✨", text: "Application en 5 minutes seulement" },
  { icon: "💫", text: "Tenue longue durée jusqu'à 7 jours" },
  { icon: "🌸", text: "Légers et confortables toute la journée" },
  { icon: "♻️", text: "Réutilisables jusqu'à 10 fois" },
];

const features = [
  {
    icon: Shield,
    title: "Sans danger pour les yeux",
    description: "Colle hypoallergénique sans latex, testée dermatologiquement et adaptée aux yeux sensibles."
  },
  {
    icon: Sparkles,
    title: "Résultat naturel",
    description: "Des cils individuels qui se fondent parfaitement avec vos cils naturels pour un effet glamour."
  },
  {
    icon: Clock,
    title: "Application rapide",
    description: "Seulement 5 minutes pour un regard transformé. Idéal pour les matins pressés."
  },
  {
    icon: Heart,
    title: "Booste la confiance",
    description: "Révélez votre beauté naturelle et sentez-vous plus sûre de vous au quotidien."
  },
  {
    icon: Eye,
    title: "Convient à tous les yeux",
    description: "Disponible en plusieurs longueurs pour s'adapter à la forme de chaque regard."
  },
  {
    icon: Users,
    title: "Approuvé par +10 000 clientes",
    description: "Rejoignez notre communauté de femmes satisfaites qui ont transformé leur regard."
  },
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [visitors, setVisitors] = useState(127);
  const [stock, setStock] = useState(14);

  const price = 19.99;
  const originalPrice = 39.99;
  const discount = 50;

  // Sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate live visitors count
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(80, Math.min(180, newValue));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Swipe handling for mobile image gallery
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImage < productImages.length - 1) {
      setSelectedImage(prev => prev + 1);
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    }
  };

  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-3">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span>Retour à l'accueil</span>
        </a>
      </div>

      <main className="flex-1">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Image Gallery */}
            <div className="relative">
              <div 
                className="relative bg-gradient-to-br from-secondary/50 to-secondary rounded-2xl overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="aspect-square">
                  <img
                    src={productImages[selectedImage]}
                    alt="LASH GLOW - Faux cils individuels"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setIsZoomed(true)}
                  />
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        selectedImage === index 
                          ? "bg-foreground w-6" 
                          : "bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Excellent</span>
                <span className="text-sm text-muted-foreground">|</span>
                <span className="text-sm font-medium">4,9 sur 5</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-display font-normal text-foreground leading-tight">
                LASH GLOW | Faux cils individuels
              </h1>

              {/* Live Visitors Badge */}
              <div className="inline-flex items-center gap-2 border border-green-200 bg-green-50 rounded-full px-4 py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm text-green-700 font-medium">
                  <strong>{visitors} personnes</strong> consultent ce produit
                </span>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 py-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{benefit.icon}</span>
                    <span className="text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-3xl font-bold text-foreground">{price.toFixed(2)} €</span>
                <span className="text-xl text-muted-foreground line-through">{originalPrice.toFixed(2)} €</span>
                <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  - {discount}%
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">Quantité</span>
                <div className="inline-flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                size="lg" 
                className="w-full rounded-full py-7 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                AJOUTER AU PANIER
              </Button>

              {/* Stock Alert */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-5 py-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span className="text-sm text-orange-700 font-medium">
                    Seulement {stock} LASH GLOW en stock !
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-8 w-8 text-primary" />
                  <span className="text-xs font-medium text-foreground">Livraison offerte</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RefreshCw className="h-8 w-8 text-primary" />
                  <span className="text-xs font-medium text-foreground">Retour 30 jours</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <span className="text-xs font-medium text-foreground">Paiement sécurisé</span>
                </div>
              </div>

              {/* Customer Review */}
              <div className="bg-secondary/50 rounded-2xl p-5">
                <div className="flex gap-4">
                  <img 
                    src={reviewImg1} 
                    alt="Cliente satisfaite" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-foreground italic leading-relaxed">
                      « J'ai enfin trouvé les faux cils parfaits ! Faciles à appliquer et tellement naturels. Mes amies n'en reviennent pas ! »
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium text-sm">Sophie L.</span>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes LASH GLOW Unique Section */}
        <section className="py-12 px-4 md:px-6 bg-gradient-to-b from-secondary/30 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-display font-normal text-foreground mb-6">
              Qu'est-ce qui rend<br />LASH GLOW unique ?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              LASH GLOW utilise une <strong className="text-foreground">technologie de fibres ultra-légères</strong> qui se fondent 
              naturellement avec vos cils. Grâce à notre colle hypoallergénique et une 
              précision <strong className="text-foreground">3 fois supérieure aux extensions classiques</strong>, 
              vous obtenez un regard <strong className="text-foreground">sublimé en seulement 5 minutes</strong>, 
              tout en préservant la santé de vos cils naturels.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 px-4 md:px-6 bg-primary/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border">
                    <feature.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="py-12 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src={productDetail2} 
                  alt="LASH GLOW en action" 
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left space-y-4">
                <h3 className="text-2xl font-display text-foreground">
                  Un kit complet pour des résultats professionnels
                </h3>
                <p className="text-muted-foreground">
                  Chaque kit LASH GLOW contient tout le nécessaire : faux cils individuels de différentes longueurs, 
                  colle longue tenue, pince de précision et guide d'application détaillé.
                </p>
                <Button className="rounded-full px-8">
                  ACHETER MAINTENANT →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 md:px-6 bg-primary/10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-display text-foreground">
              Prête à transformer votre regard ?
            </h2>
            <p className="text-muted-foreground">
              Rejoignez plus de 10 000 femmes satisfaites et découvrez la magie LASH GLOW.
            </p>
            <Button size="lg" className="rounded-full px-10 py-6 text-lg font-semibold">
              <ShoppingBag className="mr-2 h-5 w-5" />
              COMMANDER MAINTENANT — {price.toFixed(2)} €
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 md:px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-3">
                Questions fréquentes
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  question: "Comment appliquer les faux cils LASH GLOW ?",
                  answer: "L'application est très simple : nettoyez vos cils naturels, appliquez une fine couche de colle, attendez 30 secondes puis positionnez les cils à l'aide de la pince fournie. Un guide illustré complet est inclus dans chaque kit."
                },
                {
                  question: "Combien de temps tiennent les faux cils ?",
                  answer: "Avec notre colle longue tenue, les faux cils restent en place jusqu'à 7 jours. Ils résistent à l'eau et à la transpiration."
                },
                {
                  question: "Les faux cils sont-ils réutilisables ?",
                  answer: "Oui ! Avec un bon entretien, nos faux cils peuvent être réutilisés jusqu'à 10 fois. Nettoyez-les délicatement après chaque utilisation."
                },
                {
                  question: "Sont-ils adaptés aux yeux sensibles ?",
                  answer: "Absolument. Notre colle est formulée sans latex, testée dermatologiquement et convient aux yeux sensibles et aux porteuses de lentilles."
                },
                {
                  question: "Quels sont les délais de livraison ?",
                  answer: "Expédition sous 24h, livraison en 2-3 jours ouvrés en France métropolitaine. Livraison gratuite sans minimum d'achat."
                },
              ].map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-white border border-border rounded-xl px-5"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sticky Add to Cart Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-2xl py-4 px-4 z-50 transition-transform duration-300 ${
        showStickyBar ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={productMain} 
              alt="LASH GLOW" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm">LASH GLOW</p>
              <p className="text-primary font-bold">{(price * quantity).toFixed(2)} €</p>
            </div>
          </div>
          <Button className="rounded-full px-6">
            <ShoppingBag className="mr-2 h-4 w-4" />
            AJOUTER AU PANIER
          </Button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={() => setIsZoomed(false)}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div 
            className="w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={productImages[selectedImage]}
              alt="LASH GLOW"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  selectedImage === index 
                    ? "bg-white w-8" 
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

import { useState, useEffect } from "react";
import { 
  Star, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  RefreshCw,
  Clock,
  ChevronLeft,
  ZoomIn,
  X,
  Award,
  Zap,
  Package,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import product images
import productMain from "@/assets/product-lashes.jpg";
import productDetail1 from "@/assets/product-detail-1.jpg";
import productDetail2 from "@/assets/product-detail-2.jpg";
import productDetail3 from "@/assets/product-detail-3.jpg";

const productImages = [productMain, productDetail1, productDetail2, productDetail3];

const offers = [
  { id: 1, units: 1, price: 19.99, originalPrice: null, label: null, savings: null },
  { id: 2, units: 2, price: 36.00, originalPrice: 39.98, label: "Plus populaire", savings: 4.00 },
  { id: 3, units: 3, price: 48.00, originalPrice: 59.97, label: null, savings: 12.00 },
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(1);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 47, seconds: 32 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentOffer = offers.find(o => o.id === selectedOffer) || offers[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Retour à l'accueil
        </a>
      </div>

      {/* Countdown Banner */}
      <div className="px-6 mb-8">
        <div className="max-w-7xl mx-auto bg-primary rounded-full py-3.5 px-8">
          <div className="flex items-center justify-center gap-4 text-primary-foreground">
            <Clock className="h-5 w-5" />
            <span className="font-medium text-sm">OFFRE LIMITÉE — Livraison gratuite</span>
            <div className="flex items-center gap-2">
              <span className="bg-gray-800 text-white px-3 py-1.5 rounded-lg font-semibold text-sm">
                {String(countdown.hours).padStart(2, '0')}h
              </span>
              <span className="font-bold text-primary-foreground">:</span>
              <span className="bg-gray-800 text-white px-3 py-1.5 rounded-lg font-semibold text-sm">
                {String(countdown.minutes).padStart(2, '0')}m
              </span>
              <span className="font-bold text-primary-foreground">:</span>
              <span className="bg-gray-800 text-white px-3 py-1.5 rounded-lg font-semibold text-sm">
                {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div 
                className="relative bg-white rounded-2xl overflow-hidden cursor-zoom-in group border border-gray-100 shadow-sm"
                onClick={() => setIsZoomed(true)}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={productImages[selectedImage]}
                    alt="LASH GLOW - Faux cils individuels"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {/* Collection Label & Rating */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  COLLECTION PREMIUM
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(847 avis)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-[2.5rem] font-display font-normal text-foreground leading-tight">
                LASH GLOW - Faux cils individuels
              </h1>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                Faux cils individuels LASH GLOW de qualité professionnelle. Faciles à appliquer, légers et naturels. Disponibles en différentes longueurs (10mm, 12mm, 14mm) pour un regard sur-mesure.
              </p>

              {/* Stock Alert */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-sm text-primary font-medium">Stock limité — Forte demande</span>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 py-2">
                <div className="flex items-start gap-2.5">
                  <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Résultats visibles dès la 1ère utilisation</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Award className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Design primé internationalement</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Garantie 2 ans incluse</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Livraison gratuite en France</span>
                </div>
              </div>

              {/* Offers Selection */}
              <div className="space-y-3 pt-2">
                <p className="font-medium text-foreground">Choisissez votre offre</p>
                <div className="space-y-3">
                  {offers.map((offer) => (
                    <button
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer.id)}
                      className={`w-full p-4 rounded-xl border transition-all relative flex items-center justify-between ${
                        selectedOffer === offer.id 
                          ? "border-primary bg-white shadow-sm" 
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      {offer.label && (
                        <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-xs px-3 py-0.5 rounded-full">
                          {offer.label}
                        </Badge>
                      )}
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedOffer === offer.id 
                            ? "border-primary bg-primary" 
                            : "border-gray-300 bg-white"
                        }`}>
                          {selectedOffer === offer.id && (
                            <Check className="h-3.5 w-3.5 text-white" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-foreground">
                            {offer.units} unité{offer.units > 1 ? 's' : ''}
                          </span>
                          {offer.savings && (
                            <span className="text-sm text-primary">
                              Économisez {offer.savings.toFixed(2)} €
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">{offer.price.toFixed(2)} €</span>
                        {offer.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {offer.originalPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <Button size="lg" className="w-full rounded-full py-7 text-base font-medium mt-2">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ajouter au panier — {currentOffer.price.toFixed(2)} €
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-8 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="h-4 w-4" />
                  <span>Satisfait ou remboursé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Expédition 24h</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Paiements acceptés :</span>
                </div>
                <div className="flex gap-2">
                  {['VISA', 'MC', 'AMEX', 'PayPal'].map((method) => (
                    <div key={method} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-foreground">
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-secondary/50 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      Livraison estimée : 18-20 Janvier
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Commandez avant 14h pour une expédition aujourd'hui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-3">
                Découvrez le produit en action
              </h2>
              <p className="text-muted-foreground">
                Une application simple et rapide pour un résultat professionnel
              </p>
            </div>
            
            {/* Video Player */}
            <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
              <video
                className="w-full aspect-video"
                controls
                poster={productMain}
              >
                <source src="/videos/tutorial-lashes.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-normal text-foreground mb-3">
                Questions fréquentes
              </h2>
              <p className="text-muted-foreground">
                Tout ce que vous devez savoir sur nos faux cils
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  question: "Comment appliquer les faux cils LASH GLOW ?",
                  answer: "L'application est très simple : nettoyez vos cils naturels, appliquez une fine couche de colle, attendez 30 secondes puis positionnez les cils à l'aide de la pince fournie. Un guide illustré complet est inclus dans chaque kit."
                },
                {
                  question: "Combien de temps tiennent les faux cils ?",
                  answer: "Avec notre colle longue tenue, les faux cils restent en place jusqu'à 24 heures. Ils résistent à l'eau et à la transpiration."
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
                  question: "Quelle est la politique de retour ?",
                  answer: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Si vous n'êtes pas satisfaite, retournez le produit pour un remboursement complet."
                },
                {
                  question: "Quels sont les délais de livraison ?",
                  answer: "Expédition sous 24h, livraison en 2-3 jours ouvrés en France métropolitaine. Livraison gratuite sans minimum d'achat."
                },
              ].map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-white border border-gray-100 rounded-xl px-6"
                >
                  <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
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
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 px-6 z-50 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={productMain} 
                alt="LASH GLOW" 
                className="w-12 h-12 rounded-lg object-cover hidden sm:block"
              />
              <div>
                <p className="font-medium text-foreground text-sm">LASH GLOW - Faux cils</p>
                <p className="text-primary font-bold">{currentOffer.price.toFixed(2)} €</p>
              </div>
            </div>
            <Button size="lg" className="rounded-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsZoomed(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={productImages[selectedImage]}
            alt="LASH GLOW"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Product;

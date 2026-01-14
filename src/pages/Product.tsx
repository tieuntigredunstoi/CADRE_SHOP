import { useState, useEffect } from "react";
import { Star, ShoppingBag, Check, Truck, Shield, RefreshCw, Clock, ChevronLeft, ZoomIn, X, Award, Zap, Package, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import product images
import productMain from "@/assets/product-lashes.jpg";
import productDetail1 from "@/assets/product-detail-1.jpg";
import productDetail2 from "@/assets/product-detail-2.jpg";
import productDetail3 from "@/assets/product-detail-3.jpg";

// Import payment logos
import { logoVisa, logoMastercard, logoAmex } from "@/components/PaymentLogos";
const productImages = [productMain, productDetail1, productDetail2, productDetail3];
const offers = [{
  id: 1,
  units: 1,
  price: 19.99,
  originalPrice: null,
  label: null,
  savings: null
}, {
  id: 2,
  units: 2,
  price: 36.00,
  originalPrice: 39.98,
  label: "Plus populaire",
  savings: 4.00
}, {
  id: 3,
  units: 3,
  price: 48.00,
  originalPrice: 59.97,
  label: null,
  savings: 12.00
}];
const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(1);
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 47,
    seconds: 32
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const currentOffer = offers.find(o => o.id === selectedOffer) || offers[0];

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
  return <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb - Hidden on very small screens */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-3 md:py-4">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden xs:inline">Retour à l'accueil</span>
          <span className="xs:hidden">Retour</span>
        </a>
      </div>

      {/* Countdown Banner - Optimized for mobile */}
      <div className="px-4 md:px-6 mb-6 md:mb-8">
        <div className="max-w-7xl mx-auto bg-primary rounded-2xl md:rounded-full py-3 px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium text-xs md:text-sm">OFFRE LIMITÉE — Livraison gratuite</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="bg-gray-800 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm">
                {String(countdown.hours).padStart(2, '0')}h
              </span>
              <span className="font-bold text-primary-foreground">:</span>
              <span className="bg-gray-800 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm">
                {String(countdown.minutes).padStart(2, '0')}m
              </span>
              <span className="font-bold text-primary-foreground">:</span>
              <span className="bg-gray-800 text-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg font-semibold text-xs md:text-sm">
                {String(countdown.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16">
            {/* Image Gallery - Mobile optimized with swipe */}
            <div>
              {/* Main Image with swipe support */}
              <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden group border border-gray-100 shadow-sm touch-pan-y" onClick={() => setIsZoomed(true)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="aspect-square md:aspect-[4/3]">
                  <img src={productImages[selectedImage]} alt="LASH GLOW - Faux cils individuels" className="w-full h-full object-cover" />
                </div>
                {/* Desktop zoom button */}
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hidden md:flex">
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </button>
                
                {/* Mobile image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                  {productImages.map((_, index) => <button key={index} onClick={e => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }} className={`w-2 h-2 rounded-full transition-all ${selectedImage === index ? "bg-primary w-6" : "bg-white/60"}`} />)}
                </div>
              </div>

              {/* Desktop Thumbnails - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-4 gap-3 mt-4">
                {productImages.map((img, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-border"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>)}
              </div>
            </div>

            {/* Product Info - Mobile optimized */}
            <div className="space-y-4 md:space-y-5">
              {/* Collection Label & Rating */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-primary">
                  COLLECTION PREMIUM
                </span>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 md:h-4 w-3.5 md:w-4 fill-primary text-primary" />)}
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">(847 avis)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-[2.5rem] font-display font-normal text-foreground leading-tight">
                LASH GLOW - Faux cils individuels
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Faux cils individuels LASH GLOW de qualité professionnelle. Faciles à appliquer, légers et naturels. Disponibles en différentes longueurs (10mm, 12mm, 14mm) pour un regard sur-mesure.
              </p>

              {/* Stock Alert */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500"></span>
                <span className="text-xs md:text-sm text-primary font-medium">Stock limité — Forte demande</span>
              </div>

              {/* Key Benefits - Horizontal scroll on mobile, grid on desktop */}
              <div className="py-1 md:py-2">
                {/* Desktop: Grid layout */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-2.5 md:gap-3">
                  <div className="flex items-center gap-2.5">
                    <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground">Résultats visibles dès la 1ère utilisation</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground">Design primé internationalement</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground">Garantie 2 ans incluse</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground">Livraison gratuite en France</span>
                  </div>
                </div>
                
                {/* Mobile: Horizontal scroll */}
                <div className="sm:hidden -mx-4 px-4">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                    <div className="flex-shrink-0 w-[140px] snap-start bg-secondary/30 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">Sans danger</span>
                      
                    </div>
                    <div className="flex-shrink-0 w-[140px] snap-start bg-secondary/30 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                      
                      <span className="text-xs font-medium text-foreground">Résultat naturel</span>
                      <span className="text-[10px] text-muted-foreground leading-tight">Effet glamour et naturel</span>
                    </div>
                    <div className="flex-shrink-0 w-[140px] snap-start bg-secondary/30 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">Longue tenue</span>
                      <span className="text-[10px] text-muted-foreground leading-tight">Jusqu'à 7 jours de tenue</span>
                    </div>
                    <div className="flex-shrink-0 w-[140px] snap-start bg-secondary/30 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">Livraison rapide</span>
                      <span className="text-[10px] text-muted-foreground leading-tight">Expédition sous 24h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offers Selection */}
              <div className="space-y-2.5 md:space-y-3 pt-1 md:pt-2">
                <p className="font-medium text-foreground text-sm md:text-base">Choisissez votre offre</p>
                <div className="space-y-2.5 md:space-y-3">
                  {offers.map(offer => <button key={offer.id} onClick={() => setSelectedOffer(offer.id)} className={`w-full p-3 md:p-4 rounded-xl border transition-all relative flex items-center justify-between ${selectedOffer === offer.id ? "border-primary bg-white shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      {offer.label && <Badge className="absolute -top-2 md:-top-2.5 left-3 md:left-4 bg-primary text-primary-foreground text-[10px] md:text-xs px-2 md:px-3 py-0.5 rounded-full">
                          {offer.label}
                        </Badge>}
                      <div className="flex items-center gap-2.5 md:gap-3">
                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOffer === offer.id ? "border-primary bg-primary" : "border-gray-300 bg-white"}`}>
                          {selectedOffer === offer.id && <Check className="h-3 md:h-3.5 w-3 md:w-3.5 text-white" />}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-left">
                          <span className="font-medium text-foreground text-sm md:text-base">
                            {offer.units} unité{offer.units > 1 ? 's' : ''}
                          </span>
                          {offer.savings && <span className="text-xs md:text-sm text-primary">
                              Économisez {offer.savings.toFixed(2)} €
                            </span>}
                        </div>
                      </div>
                      <div className="text-right flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                        <span className="text-lg md:text-xl font-bold text-foreground">{offer.price.toFixed(2)} €</span>
                        {offer.originalPrice && <span className="text-xs md:text-sm text-muted-foreground line-through">
                            {offer.originalPrice.toFixed(2)} €
                          </span>}
                      </div>
                    </button>)}
                </div>
              </div>

              {/* Add to Cart - Hidden on mobile (shown in sticky bar) */}
              <div className="hidden md:block">
                <Button size="lg" className="w-full rounded-full py-7 text-base font-medium mt-2">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ajouter au panier — {currentOffer.price.toFixed(2)} €
                </Button>
              </div>

              {/* Trust Badges - Compact on mobile */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-2 md:py-3">
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <Shield className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <RefreshCw className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  <span>Satisfait ou remboursé</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <Package className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  <span>Expédition 24h</span>
                </div>
              </div>

              {/* Payment Methods - Scrollable on mobile */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
                  <CreditCard className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  <span>Paiements acceptés :</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="h-6 md:h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <img src={logoVisa} alt="Visa" className="h-4 md:h-5 w-auto" />
                  </div>
                  <div className="h-6 md:h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <img src={logoMastercard} alt="Mastercard" className="h-4 md:h-5 w-auto" />
                  </div>
                  <div className="h-6 md:h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                    <img src={logoAmex} alt="American Express" className="h-4 md:h-5 w-auto" />
                  </div>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-secondary/50 rounded-xl p-3 md:p-4">
                <div className="flex items-start gap-2.5 md:gap-3">
                  <Truck className="h-4 md:h-5 w-4 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm md:text-base">
                      Livraison estimée : 18-20 Janvier
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Commandez avant 14h pour une expédition aujourd'hui
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial Section */}
        <section className="pt-6 md:pt-10 pb-10 md:pb-16 px-4 md:px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-xl md:text-3xl font-display font-normal text-foreground mb-2 md:mb-3">
                Découvrez le produit en action
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Une application simple et rapide pour un résultat professionnel
              </p>
            </div>
            
            {/* Video Player */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-xl md:shadow-2xl">
              <video className="w-full aspect-video" controls playsInline poster={productMain}>
                <source src="/videos/tutorial-lashes.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        
      </main>

      <Footer />

      {/* Sticky Add to Cart Bar - Always visible on mobile, scroll-triggered on desktop */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-3 md:py-4 px-4 md:px-6 z-50 transition-transform duration-300 ${showStickyBar ? "translate-y-0" : "md:translate-y-full translate-y-0"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <img src={productMain} alt="LASH GLOW" className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover" />
            <div>
              <p className="font-medium text-foreground text-xs md:text-sm line-clamp-1">LASH GLOW - Faux cils</p>
              <p className="text-primary font-bold text-sm md:text-base">{currentOffer.price.toFixed(2)} €</p>
            </div>
          </div>
          <Button size="lg" className="rounded-full text-sm md:text-base px-4 md:px-6 py-2.5 md:py-3 h-auto">
            <ShoppingBag className="mr-1.5 md:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Ajouter au panier</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for sticky bar on mobile */}
      <div className="h-20 md:h-0" />

      {/* Image Zoom Modal */}
      {isZoomed && <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10" onClick={() => setIsZoomed(false)}>
            <X className="h-6 w-6" />
          </button>
          
          {/* Swipeable zoom image on mobile */}
          <div className="w-full h-full flex items-center justify-center" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <img src={productImages[selectedImage]} alt="LASH GLOW" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
          </div>

          {/* Image indicators in zoom modal */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {productImages.map((_, index) => <button key={index} onClick={e => {
          e.stopPropagation();
          setSelectedImage(index);
        }} className={`w-2.5 h-2.5 rounded-full transition-all ${selectedImage === index ? "bg-white w-8" : "bg-white/40"}`} />)}
          </div>
        </div>}
    </div>;
};
export default Product;
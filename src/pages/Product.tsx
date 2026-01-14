import { useState, useEffect } from "react";
import { Star, ShoppingBag, Check, Truck, Shield, RefreshCw, Clock, ChevronLeft, ChevronRight, ZoomIn, X, Minus, Plus, Calendar, RotateCcw } from "lucide-react";
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
import reviewAvatar from "@/assets/review-1.jpg";

// Import payment logos
import { logoVisa, logoMastercard, logoAmex } from "@/components/PaymentLogos";
const productImages = [productMain, productDetail1, productDetail2, productDetail3];
const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [visitors, setVisitors] = useState(203);
  const [stock, setStock] = useState(8);
  const originalPrice = 59.99;
  const currentPrice = 29.99;
  const discountPercent = Math.round((1 - currentPrice / originalPrice) * 100);

  // Simulate live visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
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
    if (distance > 50 && selectedImage < productImages.length - 1) {
      setSelectedImage(prev => prev + 1);
    }
    if (distance < -50 && selectedImage > 0) {
      setSelectedImage(prev => prev - 1);
    }
  };
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % productImages.length);
  };
  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + productImages.length) % productImages.length);
  };
  return <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="aspect-square">
                  <img src={productImages[selectedImage]} alt="LASH GLOW - Faux cils individuels" className="w-full h-full object-cover cursor-zoom-in" onClick={() => setIsZoomed(true)} />
                </div>
                
                {/* Navigation Arrows */}
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100">
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100">
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>

                {/* Mobile Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                  {productImages.map((_, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`w-2 h-2 rounded-full transition-all ${selectedImage === index ? "bg-primary w-6" : "bg-white/60"}`} />)}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {productImages.map((img, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>)}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-sm font-medium text-foreground">Excellent</span>
                <span className="text-sm text-muted-foreground">| 4,8 sur 5</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight">
                LASH GLOW | Faux cils individuels
              </h1>

              {/* Live Visitors */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{visitors} personnes</strong> consultent ce produit
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-2.5 py-2">
                <div className="flex items-center gap-3">
                  <span className="text-lg">✨</span>
                  <span className="text-sm text-muted-foreground">Parfait pour un regard naturel et glamour</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌸</span>
                  <span className="text-sm text-muted-foreground">Profitez d'une colle hypoallergénique et douce</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">⏱️</span>
                  <span className="text-sm text-muted-foreground">Une tenue jusqu'à 7 jours sans retouche</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">💝</span>
                  <span className="text-sm text-muted-foreground">Convient à tous les types d'yeux</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 py-2">
                <span className="text-3xl font-bold text-foreground">{currentPrice.toFixed(2)} €</span>
                <span className="text-lg text-muted-foreground line-through">{originalPrice.toFixed(2)} €</span>
                <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                  -{discountPercent} %
                </Badge>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quantité</label>
                <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center text-base font-medium border-x border-gray-200">
                    {quantity}
                  </span>
                  <button onClick={() => setQuantity(q => Math.min(stock, q + 1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button size="lg" className="w-full rounded-xl py-7 text-base font-semibold uppercase tracking-wide">
                Ajouter au panier
              </Button>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <img src={logoVisa} alt="Visa" className="h-5 w-auto" />
                </div>
                <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <img src={logoMastercard} alt="Mastercard" className="h-5 w-auto" />
                </div>
                <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center justify-center">
                  <img src={logoAmex} alt="American Express" className="h-5 w-auto" />
                </div>
                
                
              </div>

              {/* Stock Alert */}
              

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-100">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Livraison offerte</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Essai de 90 jours</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <RotateCcw className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">Retour facile</span>
                </div>
              </div>

              {/* Customer Testimonial */}
              <div className="bg-secondary/50 rounded-2xl p-5">
                <div className="flex gap-4">
                  <img src={reviewAvatar} alt="Charlotte V." className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      « Je ne retournerai jamais à une autre méthode. Mes cils sont magnifiques et naturels. J'aurais aimé découvrir ça bien plus tôt. »
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <span className="text-sm font-medium text-foreground">Charlotte V.</span>
                      <span className="text-green-500">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="application" className="border-gray-200">
                  <AccordionTrigger className="text-sm font-medium py-4">
                    <div className="flex items-center gap-2">
                      <span>💄</span>
                      <span>Application et utilisation</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    Application facile en 5 minutes. Nettoyez vos cils naturels, appliquez la colle sur le support, attendez 30 secondes et placez délicatement les cils. Résultat professionnel garanti.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="caracteristiques" className="border-gray-200">
                  <AccordionTrigger className="text-sm font-medium py-4">
                    <div className="flex items-center gap-2">
                      <span>📋</span>
                      <span>Caractéristiques techniques</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    <ul className="space-y-1.5">
                      <li>• Longueurs disponibles : 10mm, 12mm, 14mm</li>
                      <li>• Matériau : Fibres synthétiques haute qualité</li>
                      <li>• Colle : Hypoallergénique, sans latex</li>
                      <li>• Durée de tenue : Jusqu'à 7 jours</li>
                      <li>• Réutilisable : Jusqu'à 20 fois</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="livraison" className="border-gray-200 border-b-0">
                  <AccordionTrigger className="text-sm font-medium py-4">
                    <div className="flex items-center gap-2">
                      <span>📦</span>
                      <span>Livraison et retours</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    Livraison gratuite en France métropolitaine sous 3-5 jours ouvrés. Retour gratuit sous 90 jours si vous n'êtes pas satisfaite. Remboursement intégral garanti.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Cross-sell Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-center mb-8">
            Offres Exclusives
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* Bundle 1 - Standard */}
            <div className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-3xl">1️⃣</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">1 LASH GLOW</h3>
                  <p className="text-sm text-muted-foreground">Kit complet individuel</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-foreground">19,99 €</span>
                </div>
                <Button variant="outline" className="w-full rounded-xl py-6">
                  Sélectionner
                </Button>
              </div>
            </div>

            {/* Bundle 2 - Best Value */}
            <div className="relative bg-card border-2 border-primary rounded-2xl p-6 hover:shadow-lg transition-all">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                Plus populaire
              </Badge>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-3xl">2️⃣</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">2 LASH GLOW</h3>
                  <p className="text-sm text-muted-foreground">Un pour vous, un à offrir</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-foreground">29,99 €</span>
                  <span className="text-sm text-muted-foreground line-through">39,98 €</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                  Économisez 10 €
                </Badge>
                <Button className="w-full rounded-xl py-6">
                  Sélectionner
                </Button>
              </div>
            </div>

            {/* Bundle 3 - Max Savings */}
            <div className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1">
                Meilleure économie
              </Badge>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-3xl">3️⃣</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">3 LASH GLOW</h3>
                  <p className="text-sm text-muted-foreground">Pour vous et vos amies</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-foreground">39,99 €</span>
                  <span className="text-sm text-muted-foreground line-through">59,97 €</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-0">
                  Économisez 20 €
                </Badge>
                <Button variant="outline" className="w-full rounded-xl py-6">
                  Sélectionner
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-3 px-4 z-50 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-foreground text-sm">LASH GLOW</p>
            <p className="text-primary font-bold">{currentPrice.toFixed(2)} €</p>
          </div>
          <Button className="rounded-xl px-6 py-3 h-auto font-semibold">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 md:h-0" />

      {/* Image Zoom Modal */}
      {isZoomed && <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsZoomed(false)}>
            <X className="h-6 w-6" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <img src={productImages[selectedImage]} alt="LASH GLOW" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
          </div>

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
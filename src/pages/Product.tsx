import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, Check, Truck, Shield, RefreshCw, Clock, ChevronLeft, ChevronRight, ZoomIn, X, Minus, Plus, Calendar, RotateCcw, Pipette, ClipboardList, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
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
const bundles = [
  { id: 1, quantity: 1, price: 19.99, originalPrice: 19.99, savings: 0 },
  { id: 2, quantity: 2, price: 29.99, originalPrice: 39.98, savings: 9.99 },
  { id: 3, quantity: 3, price: 39.99, originalPrice: 59.97, savings: 19.98 },
];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(2); // Default to most popular
  const [visitors, setVisitors] = useState(203);
  const [stock, setStock] = useState(8);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const currentBundle = bundles.find(b => b.id === selectedBundle) || bundles[1];

  const handleAddToCart = () => {
    addToCart({
      name: `LASH GLOW x${currentBundle.quantity}`,
      quantity: 1,
      unitPrice: currentBundle.price,
      totalPrice: currentBundle.price,
      image: productMain,
    });
    toast({
      title: "✨ Ajouté au panier !",
      description: `${currentBundle.quantity} LASH GLOW — ${currentBundle.price.toFixed(2).replace(".", ",")} €`,
    });
  };

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
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="aspect-square">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={selectedImage}
                      src={productImages[selectedImage]} 
                      alt="LASH GLOW - Faux cils individuels" 
                      className="w-full h-full object-cover cursor-zoom-in" 
                      onClick={() => setIsZoomed(true)}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
                
                {/* Floating sparkle effect */}
                <motion.div 
                  className="absolute top-4 right-4 text-primary"
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
                
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
                {productImages.map((img, index) => (
                  <motion.button 
                    key={index} 
                    onClick={() => setSelectedImage(index)} 
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Rating */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">Excellent</span>
                <span className="text-sm text-muted-foreground">| 4,8 sur 5</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                LASH GLOW | Faux cils individuels
              </motion.h1>

              {/* Live Visitors */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-muted-foreground">
                  <motion.strong 
                    className="text-foreground"
                    key={visitors}
                    initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                    animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                    transition={{ duration: 0.3 }}
                  >
                    {visitors} personnes
                  </motion.strong> consultent ce produit
                </span>
              </motion.div>

              {/* Benefits */}
              <div className="space-y-2.5 py-2">
                {[
                  { emoji: "✨", text: "Parfait pour un regard naturel et glamour" },
                  { emoji: "🌸", text: "Profitez d'une colle hypoallergénique et douce" },
                  { emoji: "⏱️", text: "Une tenue jusqu'à 7 jours sans retouche" },
                  { emoji: "💝", text: "Convient à tous les types d'yeux" },
                ].map((benefit, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <motion.span 
                      className="text-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {benefit.emoji}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bundle Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Choisissez votre offre</label>
                <div className="space-y-3">
                  {bundles.map((bundle) => {
                    const isSelected = selectedBundle === bundle.id;
                    const isPopular = bundle.id === 2;
                    
                    return (
                      <div
                        key={bundle.id}
                        onClick={() => setSelectedBundle(bundle.id)}
                        className={`relative rounded-2xl p-3 md:p-4 cursor-pointer transition-all duration-300 ease-out ${
                          isSelected 
                            ? "border-2 border-primary bg-primary/5 md:scale-[1.02] shadow-md" 
                            : "border border-border hover:border-primary/30 hover:bg-secondary/30"
                        }`}
                      >
                        {isPopular && (
                          <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs px-3 py-1">
                            Plus populaire
                          </Badge>
                        )}
                        
                        <div className="flex items-center gap-4">
                          {/* Radio Circle */}
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isSelected ? "border-primary bg-primary scale-110" : "border-muted-foreground/30"
                          }`}>
                            <Check className={`h-4 w-4 text-primary-foreground transition-all duration-200 ${
                              isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                            }`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <p className={`font-medium transition-colors duration-200 ${
                                isSelected ? "text-primary" : "text-foreground"
                              }`}>
                                {bundle.quantity} unité{bundle.quantity > 1 ? "s" : ""}
                              </p>
                              {bundle.savings > 0 && (
                                <p className="text-sm text-amber-700 font-medium">
                                  Économisez {bundle.savings.toFixed(2).replace(".", ",")} €
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <span className={`text-xl font-bold transition-colors duration-200 ${
                                isSelected ? "text-primary" : "text-foreground"
                              }`}>
                                {bundle.price.toFixed(2).replace(".", ",")} €
                              </span>
                              {bundle.savings > 0 && (
                                <p className="text-sm text-muted-foreground line-through">
                                  {bundle.originalPrice.toFixed(2).replace(".", ",")} €
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="w-full rounded-xl py-7 text-base font-semibold uppercase tracking-wide relative overflow-hidden group"
                  onClick={handleAddToCart}
                >
                  <span className="relative z-10">Ajouter au panier — {currentBundle.price.toFixed(2).replace(".", ",")} €</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ opacity: 0.3 }}
                  />
                </Button>
              </motion.div>

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

              {/* Info Sections - Always visible */}
              <div className="space-y-4">
                {/* Application et utilisation */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Pipette className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Application et utilisation</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Application facile en 5 minutes. Nettoyez vos cils naturels, appliquez la colle sur le support, attendez 30 secondes et placez délicatement les cils. Résultat professionnel garanti.
                  </p>
                </div>

                {/* Caractéristiques techniques */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Caractéristiques techniques</span>
                  </div>
                  <ul className="text-sm text-muted-foreground pl-8 space-y-1.5">
                    <li>• Longueurs disponibles : 10mm, 12mm, 14mm</li>
                    <li>• Matériau : Fibres synthétiques haute qualité</li>
                    <li>• Colle : Hypoallergénique, sans latex</li>
                    <li>• Durée de tenue : Jusqu'à 7 jours</li>
                    <li>• Réutilisable : Jusqu'à 20 fois</li>
                  </ul>
                </div>

                {/* Livraison et retours */}
                <div className="pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Livraison et retours</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Livraison gratuite en France métropolitaine sous 3-5 jours ouvrés. Retour gratuit sous 90 jours si vous n'êtes pas satisfaite. Remboursement intégral garanti.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-center mb-8">
            Questions fréquentes
          </h2>
          
          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem value="faq-1" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Comment appliquer les faux cils LASH GLOW ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Nettoyez vos cils naturels, appliquez une fine couche de colle sur le support, attendez 30 secondes que la colle devienne légèrement collante, puis placez délicatement les cils le long de votre ligne de cils. L'application prend environ 5 minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Combien de temps durent les faux cils ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Nos faux cils peuvent tenir jusqu'à 7 jours avec une application correcte. Ils sont également réutilisables jusqu'à 20 fois si vous en prenez soin et les nettoyez délicatement après chaque utilisation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                La colle est-elle adaptée aux peaux sensibles ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Oui ! Notre colle est hypoallergénique et sans latex, spécialement formulée pour les peaux sensibles. Elle a été testée dermatologiquement et convient à tous les types de peau.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Puis-je me maquiller avec les faux cils ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Absolument ! Vous pouvez appliquer du mascara, de l'eye-liner et tout autre maquillage pour les yeux. Nous recommandons d'utiliser des produits à base d'eau pour prolonger la durée de vie de vos cils.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Comment retirer les faux cils en toute sécurité ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Utilisez un coton imbibé d'huile de coco ou d'un démaquillant à base d'huile. Appliquez-le sur la ligne des cils pendant quelques secondes, puis retirez délicatement les cils de l'extérieur vers l'intérieur. Ne tirez jamais brusquement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Quelle est votre politique de retour ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Nous offrons une garantie satisfait ou remboursé de 90 jours. Si vous n'êtes pas entièrement satisfaite de votre achat, contactez-nous et nous vous rembourserons intégralement, sans poser de questions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <Footer />

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-3 px-4 z-50 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-foreground text-sm">LASH GLOW</p>
            <p className="text-primary font-bold">{currentBundle.price.toFixed(2).replace(".", ",")} €</p>
          </div>
          <Button 
            className="rounded-xl px-6 py-3 h-auto font-semibold"
            onClick={handleAddToCart}
          >
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
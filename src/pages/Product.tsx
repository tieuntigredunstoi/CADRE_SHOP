import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Check, Truck, Shield, RefreshCw, Clock, ChevronLeft, ChevronRight, ZoomIn, X, Minus, Plus, Calendar, RotateCcw, Heart, ClipboardList, Package, Sparkles, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { trackViewContent } from "@/lib/facebookPixel";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import product images
import productNightSky from "@/assets/product-night-sky.webp";
import productSpotify from "@/assets/product-spotify.webp";
import productStreetSign from "@/assets/product-street-sign.webp";
import productCoordinates from "@/assets/product-coordinates.webp";
import productPerfectMatch from "@/assets/product-perfect-match.webp";
import reviewAvatar from "@/assets/review-1.jpg";

// Import how it works images
import productMapPlaque from "@/assets/product-map-plaque.webp";
import productNightSkyDemo from "@/assets/product-night-sky-demo.webp";
import productAlbumCover from "@/assets/product-album-cover.webp";
import productLifestyle1 from "@/assets/product-lifestyle-1.webp";
import productLifestyle2 from "@/assets/product-lifestyle-2.webp";

// Import payment logos
import { logoVisa, logoMastercard, logoAmex } from "@/components/PaymentLogos";

const productModels = [
  { id: "night-sky", name: "The Night We Met", description: "Carte du ciel", image: productNightSky },
  { id: "spotify", name: "Our Song", description: "Lecteur Spotify", image: productSpotify },
  { id: "street-sign", name: "Street Sign", description: "Noms croisés", image: productStreetSign },
  { id: "coordinates", name: "Coordinates", description: "Lieu de rencontre", image: productCoordinates },
  { id: "perfect-match", name: "Perfect Match", description: "Union des cœurs", image: productPerfectMatch },
];

const Product = () => {
  const [selectedModel, setSelectedModel] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [visitors, setVisitors] = useState(203);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const currentModel = productModels[selectedModel];
  const productImages = productModels.map(m => m.image);

  const handleAddToCart = () => {
    addToCart({
      name: `Memory — ${currentModel.name}`,
      quantity: 1,
      unitPrice: 9.99,
      totalPrice: 9.99,
      image: currentModel.image,
    });
    toast({
      title: "✨ Ajouté au panier !",
      description: `Cadre Memory "${currentModel.name}" — 9,99 €`,
    });
  };

  // Countdown timer - ends at midnight
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      const diff = midnight.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          hours: Math.floor(diff / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live visitors
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track ViewContent after 3 seconds on product page
  useEffect(() => {
    const timer = setTimeout(() => {
      trackViewContent({
        content_name: currentModel.name,
        content_ids: [currentModel.id],
        content_type: "product",
        value: 9.99,
        currency: "EUR",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentModel.id, currentModel.name]);

  const nextImage = () => {
    setSelectedModel((prev) => (prev + 1) % productImages.length);
  };
  const prevImage = () => {
    setSelectedModel((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 pb-32 md:pb-0">
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
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group">
                <div className="aspect-square">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={selectedModel}
                      src={productImages[selectedModel]} 
                      alt={`Memory - ${currentModel.name}`}
                      className="w-full h-full object-cover cursor-zoom-in" 
                      onClick={() => setIsZoomed(true)}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>
                
                {/* Floating heart effect */}
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
                  <Heart className="h-6 w-6" />
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
                  {productImages.map((_, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedModel(index)} 
                      className={`w-2 h-2 rounded-full transition-all ${selectedModel === index ? "bg-primary w-6" : "bg-white/60"}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {productModels.map((model, index) => (
                  <motion.button 
                    key={index} 
                    onClick={() => setSelectedModel(index)} 
                    className={`aspect-square w-full rounded-xl overflow-hidden border-2 transition-all ${selectedModel === index ? "border-primary ring-2 ring-primary/20" : "border-gray-200 hover:border-gray-300"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img src={model.image} alt={model.name} className="w-full h-full object-cover" loading="lazy" />
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
                <span className="text-sm text-muted-foreground">| 4,9 sur 5</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-3xl md:text-4xl font-display font-semibold text-foreground leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Memory | Cadre Souvenir Personnalisé
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
                  { emoji: "💝", text: "Capturez l'essence de vos moments uniques" },
                  { emoji: "✨", text: "Plaque plexiglas haute définition premium" },
                  { emoji: "🪵", text: "Support en bois véritable élégant" },
                  { emoji: "🎁", text: "Le cadeau parfait pour la Saint-Valentin" },
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

              {/* Countdown Timer - Modern */}
              <motion.div 
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-foreground to-foreground/90 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-red-500"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-xs font-medium text-background/70 uppercase tracking-wider">Offre Saint-Valentin</span>
                  </div>
                  
                   <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                     {/* Hours */}
                     <div className="text-center">
                       <motion.div 
                         className="bg-background/10 backdrop-blur-sm rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-background/10"
                         key={timeLeft.hours}
                         initial={{ rotateX: -90 }}
                         animate={{ rotateX: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       >
                         <span className="text-2xl sm:text-3xl font-bold text-background tabular-nums">
                           {String(timeLeft.hours).padStart(2, '0')}
                         </span>
                       </motion.div>
                       <span className="text-[10px] text-background/50 uppercase mt-1 block">Heures</span>
                     </div>
                     
                     <span className="text-xl sm:text-2xl font-light text-background/40 -mt-4">:</span>
                     
                     {/* Minutes */}
                     <div className="text-center">
                       <motion.div 
                         className="bg-background/10 backdrop-blur-sm rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-background/10"
                         key={timeLeft.minutes}
                         initial={{ rotateX: -90 }}
                         animate={{ rotateX: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       >
                         <span className="text-2xl sm:text-3xl font-bold text-background tabular-nums">
                           {String(timeLeft.minutes).padStart(2, '0')}
                         </span>
                       </motion.div>
                       <span className="text-[10px] text-background/50 uppercase mt-1 block">Minutes</span>
                     </div>
                     
                     <span className="text-xl sm:text-2xl font-light text-background/40 -mt-4">:</span>
                     
                     {/* Seconds */}
                     <div className="text-center">
                       <motion.div 
                         className="bg-primary/80 backdrop-blur-sm rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border border-primary/50"
                         key={timeLeft.seconds}
                         initial={{ rotateX: -90 }}
                         animate={{ rotateX: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       >
                         <span className="text-2xl sm:text-3xl font-bold text-primary-foreground tabular-nums">
                           {String(timeLeft.seconds).padStart(2, '0')}
                         </span>
                       </motion.div>
                       <span className="text-[10px] text-background/50 uppercase mt-1 block">Secondes</span>
                     </div>
                   </div>
                  
                  <p className="text-center text-sm text-background/80 mt-4">
                    <span className="text-primary font-semibold">-50%</span> + Livraison GRATUITE
                  </p>
                </div>
              </motion.div>

              {/* Model Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Choisissez votre modèle</label>
                <div className="space-y-3">
                  {productModels.map((model, index) => {
                    const isSelected = selectedModel === index;
                    const isPopular = index === 0;
                    
                    return (
                      <div
                        key={model.id}
                        onClick={() => setSelectedModel(index)}
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
                        
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Radio Circle */}
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isSelected ? "border-primary bg-primary scale-110" : "border-muted-foreground/30"
                          }`}>
                            <Check className={`h-4 w-4 text-primary-foreground transition-all duration-200 ${
                              isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                            }`} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className={`font-medium leading-snug break-words transition-colors duration-200 ${
                                isSelected ? "text-primary" : "text-foreground"
                              }`}>
                                {model.name}
                              </p>
                              <p className="text-sm text-muted-foreground leading-snug break-words">
                                {model.description}
                              </p>
                            </div>
                            
                            <div className="text-right flex-shrink-0">
                              <span className={`text-xl font-bold transition-colors duration-200 ${
                                isSelected ? "text-primary" : "text-foreground"
                              }`}>
                                9,99 €
                              </span>
                              <p className="text-sm text-muted-foreground line-through">
                                20,00 €
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full rounded-xl h-auto py-4 md:py-7 text-sm md:text-base font-semibold uppercase tracking-wide relative overflow-hidden group whitespace-normal leading-tight"
                    onClick={() => navigate(`/customize?model=${currentModel.id}`)}
                  >
                    <Palette className="mr-2 h-5 w-5 shrink-0" />
                    <span className="relative z-10 text-center">
                      <span className="md:hidden">Personnaliser</span>
                      <span className="hidden md:inline">Personnaliser mon Memory</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      style={{ opacity: 0.3 }}
                    />
                  </Button>
                </motion.div>
              </div>

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
                  <span className="text-xs font-medium text-foreground">Garanti 30 jours</span>
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
                  <img src={reviewAvatar} alt="Marie L." className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      « J'ai offert ce cadre à mon mari pour notre anniversaire. Revoir cette date gravée sur le ciel étoilé de notre première rencontre... l'émotion était indescriptible. Un souvenir éternel. »
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <span className="text-sm font-medium text-foreground">Marie L.</span>
                      <span className="text-green-500">✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Sections - Always visible */}
              <div className="space-y-4">
                {/* Personnalisation */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Personnalisation</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Après votre commande, vous recevrez un email pour personnaliser votre cadre : choisissez votre date, lieu, titre et photo. Notre équipe créera votre design unique.
                  </p>
                </div>

                {/* Caractéristiques techniques */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Caractéristiques</span>
                  </div>
                  <ul className="text-sm text-muted-foreground pl-8 space-y-1.5">
                    <li>• Dimensions : 15 x 20 cm</li>
                    <li>• Matériau : Plexiglas haute qualité 5mm</li>
                    <li>• Support : Bois de hêtre naturel</li>
                    <li>• Impression : Haute définition durable</li>
                    <li>• Emballage : Coffret cadeau inclus</li>
                  </ul>
                </div>

                {/* Livraison et retours */}
                <div className="pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">Livraison et retours</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    Livraison gratuite en France métropolitaine sous 3-5 jours ouvrés. Retour gratuit sous 30 jours si vous n'êtes pas satisfait. Remboursement intégral garanti.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-secondary/30 py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-10 md:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                Personnalisation
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-semibold text-foreground">
                Créez votre souvenir unique
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Choisissez parmi nos modèles et personnalisez chaque détail pour un cadeau vraiment unique
              </p>
            </motion.div>

            {/* Product Types Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {/* Map Plaque */}
              <motion.div
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={productMapPlaque} 
                  alt="Plaque carte personnalisée" 
                  className="w-full h-auto mb-4"
                />
                <h3 className="font-semibold text-lg text-foreground mb-2">Plaque Carte</h3>
                <p className="text-sm text-muted-foreground">
                  Marquez le lieu de votre rencontre avec une carte personnalisée, la date et un titre de votre choix.
                </p>
              </motion.div>

              {/* Night Sky */}
              <motion.div
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={productNightSkyDemo} 
                  alt="Carte du ciel personnalisée" 
                  className="w-full h-auto mb-4"
                />
                <h3 className="font-semibold text-lg text-foreground mb-2">Carte du Ciel</h3>
                <p className="text-sm text-muted-foreground">
                  Capturez les étoiles exactes de votre moment spécial avec date, lieu et titre personnalisés.
                </p>
              </motion.div>

              {/* Album Cover */}
              <motion.div
                className="bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <img 
                  src={productAlbumCover} 
                  alt="Plaque style Spotify" 
                  className="w-full h-auto mb-4"
                />
                <h3 className="font-semibold text-lg text-foreground mb-2">Style Album</h3>
                <p className="text-sm text-muted-foreground">
                  Votre photo avec votre chanson préférée, le titre et l'artiste de votre choix.
                </p>
              </motion.div>
            </div>

            {/* Lifestyle Gallery */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-2">
                Ils ont créé leur Memory
              </h3>
              <p className="text-muted-foreground text-sm">Des souvenirs qui touchent le cœur</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <motion.div
                className="rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img 
                  src={productLifestyle1} 
                  alt="Memory en situation" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img 
                  src={productLifestyle2} 
                  alt="Memory en situation" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
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
                Comment personnaliser mon cadre Memory ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Après votre commande, vous recevrez un email avec un lien vers notre formulaire de personnalisation. Vous pourrez y indiquer la date, le lieu, le titre souhaité et télécharger votre photo. Notre équipe créera ensuite votre design unique et vous l'enverra pour validation avant production.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Quels sont les délais de livraison ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                La production de votre cadre personnalisé prend 2-3 jours ouvrés après validation du design. La livraison gratuite en France métropolitaine prend ensuite 3-5 jours ouvrés. Pour la Saint-Valentin, commandez avant le 8 février pour une réception garantie.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Quelle est la qualité d'impression ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Nous utilisons une technologie d'impression UV haute définition directement sur le plexiglas. Le résultat est net, durable et résistant aux UV. Les couleurs restent éclatantes pendant des années sans jaunir ni s'estomper.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Puis-je offrir le cadre en cadeau ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Absolument ! C'est le cadeau idéal pour la Saint-Valentin, un anniversaire ou toute occasion spéciale. Chaque cadre est livré dans un élégant coffret cadeau. Vous pouvez aussi ajouter une carte personnalisée avec votre message.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Comment fonctionne le modèle "Carte du ciel" ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Le modèle "The Night We Met" affiche les constellations exactes telles qu'elles étaient visibles depuis un lieu précis à une date donnée. Vous nous indiquez la date et le lieu de votre souvenir, et nous générons une carte du ciel authentique et unique.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6" className="border border-border rounded-xl px-4 data-[state=open]:bg-secondary/30">
              <AccordionTrigger className="text-sm md:text-base font-medium py-4 hover:no-underline">
                Quelle est votre politique de retour ?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                Nous offrons une garantie satisfait ou remboursé de 30 jours. Si vous n'êtes pas entièrement satisfait de votre cadre, contactez-nous et nous vous rembourserons intégralement ou produirons un nouveau cadre avec les corrections souhaitées.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-4 px-4 z-50 md:hidden safe-area-bottom">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <img 
              src={currentModel.image} 
              alt={currentModel.name}
              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground text-xs truncate">{currentModel.name}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-primary font-bold text-sm">9,99 €</span>
                <span className="text-[10px] text-muted-foreground line-through">20€</span>
              </div>
            </div>
          </div>
          <Button 
            className="rounded-xl px-4 py-2.5 h-auto text-sm font-semibold flex-shrink-0"
            onClick={() => navigate(`/customize?model=${currentModel.id}`)}
          >
            Personnaliser
          </Button>
        </div>
      </div>
      <Footer />

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsZoomed(false)}>
            <X className="h-6 w-6" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center">
            <img src={productImages[selectedModel]} alt="Memory" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {productImages.map((_, index) => (
              <button 
                key={index} 
                onClick={e => {
                  e.stopPropagation();
                  setSelectedModel(index);
                }} 
                className={`w-2.5 h-2.5 rounded-full transition-all ${selectedModel === index ? "bg-white w-8" : "bg-white/40"}`} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

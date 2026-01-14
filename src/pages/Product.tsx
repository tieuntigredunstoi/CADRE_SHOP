import { useState, useEffect } from "react";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Check, 
  Truck, 
  Shield, 
  RefreshCw,
  Clock,
  MapPin,
  ChevronLeft,
  ZoomIn,
  X,
  Award,
  CreditCard,
  Package,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import ProductVideoSection from "@/components/ProductVideoSection";

// Import product images
import productMain from "@/assets/product-lashes.jpg";
import productDetail1 from "@/assets/product-detail-1.jpg";
import productDetail2 from "@/assets/product-detail-2.jpg";
import productDetail3 from "@/assets/product-detail-3.jpg";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";

const productImages = [productMain, productDetail1, productDetail2, productDetail3];

const reviews = [
  {
    id: 1,
    name: "Marie L.",
    rating: 5,
    date: "Il y a 2 jours",
    text: "Absolument incroyable ! Application super facile et le résultat est vraiment naturel. Je les réutilise depuis 3 semaines !",
    image: review1,
    verified: true,
  },
  {
    id: 2,
    name: "Sophie D.",
    rating: 5,
    date: "Il y a 1 semaine",
    text: "Meilleurs faux cils que j'ai jamais essayé. Tenue parfaite, même à la salle de sport. Je recommande à 100% !",
    image: review2,
    verified: true,
  },
  {
    id: 3,
    name: "Emma B.",
    rating: 4,
    date: "Il y a 2 semaines",
    text: "Très satisfaite ! Un peu de pratique nécessaire pour la première application, mais ensuite c'est un jeu d'enfant.",
    image: review3,
    verified: true,
  },
];

const featuredIn = ["ELLE", "Vogue", "Marie Claire", "Cosmopolitan"];

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [bundleSelected, setBundleSelected] = useState(false);
  const [stockCount] = useState(23);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 47, seconds: 33 });

  // Countdown timer for FOMO
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

  const basePrice = 19.99;
  const bundlePrice = 34.99;
  const originalBundlePrice = 39.98;
  const currentPrice = bundleSelected ? bundlePrice : basePrice;
  const savings = bundleSelected ? (originalBundlePrice - bundlePrice).toFixed(2) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 py-4">
        <a href="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Retour à la boutique
        </a>
      </div>

      <main className="flex-1">
        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with Zoom */}
              <div 
                className="relative aspect-square bg-card rounded-2xl overflow-hidden cursor-zoom-in group"
                onClick={() => setIsZoomed(true)}
              >
                <img
                  src={productImages[selectedImage]}
                  alt="LASH GLOW - Faux cils individuels"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </button>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  Best-seller
                </Badge>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-primary" 
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* FOMO: Stock Alert */}
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-destructive font-medium">
                  <AlertCircle className="h-4 w-4" />
                  Plus que {stockCount} en stock !
                </span>
                <span className="text-muted-foreground">
                  • {Math.floor(Math.random() * 50) + 30} personnes consultent ce produit
                </span>
              </div>

              <div>
                <p className="section-label mb-2">LASH GLOW</p>
                <h1 className="text-3xl md:text-4xl font-display font-normal text-foreground mb-2">
                  Faux cils individuels professionnels
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9/5 (847 avis)</span>
                </div>
              </div>

              {/* Price with Discount */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{currentPrice.toFixed(2)} €</span>
                  {bundleSelected && (
                    <>
                      <span className="text-lg line-through text-muted-foreground">
                        {originalBundlePrice.toFixed(2)} €
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        ÉCONOMISEZ {savings} €
                      </Badge>
                    </>
                  )}
                </div>
                
                {/* Countdown Timer */}
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    Offre expire dans {String(countdown.hours).padStart(2, '0')}:
                    {String(countdown.minutes).padStart(2, '0')}:
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground">
                Des cils parfaits en 5 minutes. Qualité salon à la maison.
              </p>

              {/* Key Benefits */}
              <ul className="space-y-2">
                {[
                  "✨ Application ultra-simple en 5 minutes",
                  "💎 Qualité professionnelle salon",
                  "♻️ Réutilisables jusqu'à 10 fois",
                  "🎯 Résultat naturel garanti",
                  "📦 Kit complet avec accessoires"
                ].map((benefit, i) => (
                  <li key={i} className="text-sm text-foreground">{benefit}</li>
                ))}
              </ul>

              {/* Bundle & Save */}
              <div className="space-y-3">
                <p className="font-medium text-foreground">Choisissez votre offre :</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setBundleSelected(false)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      !bundleSelected 
                        ? "border-primary bg-secondary" 
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <p className="font-medium text-foreground">1x Kit</p>
                    <p className="text-lg font-bold text-foreground">19,99 €</p>
                  </button>
                  <button
                    onClick={() => setBundleSelected(true)}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                      bundleSelected 
                        ? "border-primary bg-secondary" 
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      -12%
                    </Badge>
                    <p className="font-medium text-foreground">2x Kits</p>
                    <p className="text-lg font-bold text-foreground">34,99 €</p>
                    <p className="text-xs text-muted-foreground line-through">39,98 €</p>
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">Quantité :</span>
                <div className="flex items-center gap-3 bg-secondary rounded-full px-4 py-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart - Large & Prominent */}
              <Button size="lg" className="w-full rounded-full py-6 text-lg group">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ajouter au panier — {(currentPrice * quantity).toFixed(2)} €
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Livraison gratuite</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Paiement sécurisé</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Satisfait ou remboursé</p>
                </div>
              </div>

              {/* Delivery Estimate */}
              <div className="bg-secondary rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Livraison estimée</p>
                    <p className="text-sm text-muted-foreground">
                      Commandez maintenant, recevez le <strong>16-18 janvier</strong>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expédition sous 24h • Suivi en temps réel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tutorial Section - Right after product info */}
        <ProductVideoSection />

        {/* Product Details Tabs */}
        <section className="bg-secondary py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="delivery">Livraison</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
                <TabsTrigger value="warranty">Garantie</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <h3 className="text-xl font-display font-medium text-foreground">Le kit complet LASH GLOW</h3>
                <p className="text-muted-foreground">
                  Découvrez la solution ultime pour des cils parfaits à domicile. Notre kit comprend tout ce dont vous avez besoin pour une application professionnelle.
                </p>
                <ul className="space-y-2">
                  {[
                    "3 paires de faux cils individuels (différentes longueurs)",
                    "Colle hypoallergénique longue tenue",
                    "Pince applicatrice de précision",
                    "Guide d'application illustré",
                    "Étui de rangement réutilisable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="delivery" className="space-y-4">
                <h3 className="text-xl font-display font-medium text-foreground">Livraison & Retours</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Livraison gratuite</p>
                      <p className="text-sm text-muted-foreground">Expédition sous 24h, réception en 2-3 jours ouvrés</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Retours gratuits sous 30 jours</p>
                      <p className="text-sm text-muted-foreground">Retournez le produit non utilisé pour un remboursement complet</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-4">
                <h3 className="text-xl font-display font-medium text-foreground">Paiement sécurisé</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Moyens de paiement acceptés</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express, PayPal, Apple Pay</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Cryptage SSL</p>
                      <p className="text-sm text-muted-foreground">Vos données sont protégées par un cryptage de niveau bancaire</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="warranty" className="space-y-4">
                <h3 className="text-xl font-display font-medium text-foreground">Garantie satisfaction</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Garantie 100% satisfait ou remboursé</p>
                      <p className="text-sm text-muted-foreground">Si vous n'êtes pas satisfaite, nous vous remboursons intégralement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Qualité garantie</p>
                      <p className="text-sm text-muted-foreground">Produits testés dermatologiquement, hypoallergéniques</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured In */}
        <section className="py-12 px-6 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">Vu dans</p>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {featuredIn.map((media) => (
                <span key={media} className="text-xl md:text-2xl font-display font-medium text-muted-foreground/50">
                  {media}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-16 px-6 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-2">TÉMOIGNAGES</p>
              <h2 className="section-title">Ce que nos clientes disent</h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.9/5 basé sur 847 avis</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{review.name}</p>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Vérifié
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-brand-gold text-brand-gold" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="section-label mb-2">FAQ</p>
              <h2 className="section-title">Questions fréquentes</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Combien de temps dure l'application ?",
                  answer: "L'application prend environ 5 minutes une fois que vous maîtrisez la technique. Pour les débutantes, comptez 10-15 minutes pour les premières applications."
                },
                {
                  question: "Les cils sont-ils réutilisables ?",
                  answer: "Oui ! Avec un bon entretien, nos faux cils peuvent être réutilisés jusqu'à 10 fois. Nettoyez-les délicatement après chaque utilisation et rangez-les dans leur étui."
                },
                {
                  question: "La colle est-elle hypoallergénique ?",
                  answer: "Absolument. Notre colle est formulée sans latex, testée dermatologiquement et convient aux yeux sensibles et aux porteuses de lentilles."
                },
                {
                  question: "Comment retirer les faux cils ?",
                  answer: "Utilisez un démaquillant à base d'huile ou notre solution dissolvante. Les cils se retirent facilement sans tirer ni endommager vos cils naturels."
                },
                {
                  question: "Puis-je porter mes cils à la piscine ou au sport ?",
                  answer: "Oui ! Notre colle résiste à l'eau et à la transpiration. Vous pouvez nager, faire du sport et même pleurer (de joie !) sans perdre vos cils."
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl px-6">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
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
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg py-4 px-6 z-50 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={productMain} 
                alt="LASH GLOW" 
                className="w-12 h-12 rounded-lg object-cover hidden sm:block"
              />
              <div>
                <p className="font-medium text-foreground text-sm">LASH GLOW - Faux cils</p>
                <p className="text-primary font-bold">{currentPrice.toFixed(2)} €</p>
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
          className="fixed inset-0 bg-foreground/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button 
            className="absolute top-4 right-4 text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
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

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Music, User, Heart, Upload, X, ArrowRight, Check, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { trackAddToCart } from "@/lib/facebookPixel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import productNightSky from "@/assets/product-night-sky.webp";
import productSpotify from "@/assets/product-spotify.webp";
import productStreetSign from "@/assets/product-street-sign.webp";
import productCoordinates from "@/assets/product-coordinates.webp";
import productPerfectMatch from "@/assets/product-perfect-match.webp";
import productMapPlaque from "@/assets/product-map-plaque.webp";

interface FrameModel {
  id: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  fields: FieldConfig[];
}

interface FieldConfig {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "date" | "location" | "photo";
  icon: React.ElementType;
  required?: boolean;
  maxLength?: number;
}

const frameModels: FrameModel[] = [
  {
    id: "night-sky",
    name: "The Night We Met",
    shortName: "Ciel",
    description: "Carte du ciel personnalisée",
    image: productNightSky,
    fields: [
      { id: "location", label: "Lieu", placeholder: "Search Location", type: "location", icon: MapPin, required: true },
      { id: "date", label: "Date", placeholder: "Select Date", type: "date", icon: Calendar, required: true },
      { id: "title", label: "Titre", placeholder: "Enter Title - eg. Happy Anniversary!, First Date", type: "text", icon: Star, required: true, maxLength: 19 },
      { id: "locationTitle", label: "Titre de localisation", placeholder: "Enter Location Title - eg. Starbucks, Star Casino", type: "text", icon: MapPin, required: false, maxLength: 45 },
    ],
  },
  {
    id: "spotify",
    name: "Our Song",
    shortName: "Song",
    description: "Lecteur Spotify personnalisé",
    image: productSpotify,
    fields: [
      { id: "songTitle", label: "Titre de la chanson", placeholder: "Perfect", type: "text", icon: Music, required: true },
      { id: "artistName", label: "Nom de l'artiste", placeholder: "Ed Sheeran", type: "text", icon: User, required: true },
      { id: "photo1", label: "Photo 1", placeholder: "Téléchargez votre première photo", type: "photo", icon: Upload, required: true },
      { id: "photo2", label: "Photo 2", placeholder: "Téléchargez votre deuxième photo", type: "photo", icon: Upload, required: true },
    ],
  },
  {
    id: "street-sign",
    name: "Street Sign",
    shortName: "Street",
    description: "Panneaux de rue croisés",
    image: productStreetSign,
    fields: [
      { id: "name1", label: "Premier prénom", placeholder: "Marie", type: "text", icon: User, required: true },
      { id: "name2", label: "Deuxième prénom", placeholder: "Thomas", type: "text", icon: User, required: true },
      { id: "year", label: "Année", placeholder: "2024", type: "text", icon: Calendar, required: true },
    ],
  },
  {
    id: "coordinates",
    name: "Coordinates",
    shortName: "GPS",
    description: "Coordonnées GPS personnalisées",
    image: productCoordinates,
    fields: [
      { id: "location", label: "Lieu", placeholder: "Search Location", type: "location", icon: MapPin, required: true },
      { id: "title", label: "Titre", placeholder: "Enter Title - eg. Happy Anniversary!, First Date", type: "text", icon: Star, required: true, maxLength: 19 },
      { id: "locationTitle", label: "Titre de localisation", placeholder: "Enter Location Title - eg. Starbucks, Star Casino", type: "text", icon: MapPin, required: false, maxLength: 45 },
      { id: "date", label: "Date", placeholder: "Select Date", type: "date", icon: Calendar, required: true },
    ],
  },
  {
    id: "perfect-match",
    name: "Perfect Match",
    shortName: "Match",
    description: "Union des cœurs",
    image: productPerfectMatch,
    fields: [
      { id: "name1", label: "Premier prénom", placeholder: "Marie", type: "text", icon: User, required: true },
      { id: "name2", label: "Deuxième prénom", placeholder: "Thomas", type: "text", icon: User, required: true },
      { id: "date", label: "Date spéciale", placeholder: "Sélectionnez une date", type: "date", icon: Calendar, required: true },
      { id: "photo1", label: "Photo 1", placeholder: "Première photo", type: "photo", icon: Upload, required: true },
      { id: "photo2", label: "Photo 2", placeholder: "Deuxième photo", type: "photo", icon: Upload, required: true },
    ],
  },
  {
    id: "map-plaque",
    name: "Map Plaque",
    shortName: "Map",
    description: "Where We Met",
    image: productMapPlaque,
    fields: [
      { id: "location", label: "Lieu", placeholder: "Search Location", type: "location", icon: MapPin, required: true },
      { id: "date", label: "Date", placeholder: "Select Date", type: "date", icon: Calendar, required: true },
      { id: "title", label: "Titre", placeholder: "Enter Title - eg. Happy Anniversary!, First Date", type: "text", icon: Star, required: true, maxLength: 19 },
      { id: "locationTitle", label: "Titre de localisation", placeholder: "Enter Location Title - eg. Starbucks, Star Casino", type: "text", icon: MapPin, required: false, maxLength: 45 },
    ],
  },
];

const Customize = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const modelParam = searchParams.get("model") || "night-sky";
  const [selectedModel, setSelectedModel] = useState(
    frameModels.find(m => m.id === modelParam) || frameModels[0]
  );
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<Record<string, { file: File; preview: string }>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [showLimitDialog, setShowLimitDialog] = useState(false);

  // Scroll vers le haut au chargement de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [modelParam]);

  const handleModelChange = (model: FrameModel) => {
    setSelectedModel(model);
    setFormData({});
    setPhotos({});
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handlePhotoUpload = (fieldId: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos(prev => ({
        ...prev,
        [fieldId]: { file, preview: reader.result as string }
      }));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (fieldId: string) => {
    setPhotos(prev => {
      const updated = { ...prev };
      delete updated[fieldId];
      return updated;
    });
    if (fileInputRefs.current[fieldId]) {
      fileInputRefs.current[fieldId]!.value = "";
    }
  };

  const isFormValid = () => {
    return selectedModel.fields.every(field => {
      if (!field.required) return true;
      if (field.type === "photo") {
        return !!photos[field.id];
      }
      return !!formData[field.id]?.trim();
    });
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    // Vérifier si le panier est déjà plein
    const added = addToCart({
      name: `Memory — ${selectedModel.name}`,
      quantity: 1,
      unitPrice: 9.95,
      totalPrice: 9.95,
      image: selectedModel.image,
    });

    if (!added) {
      // Le panier est déjà plein, afficher le popup
      setShowLimitDialog(true);
      return;
    }

    // Track AddToCart event with fbclid
    trackAddToCart({
      content_name: `Memory — ${selectedModel.name}`,
      content_ids: [selectedModel.id],
      content_type: "product",
      value: 9.95,
      currency: "EUR",
      quantity: 1,
    });

    toast({
      title: "✨ Cadre personnalisé ajouté !",
      description: `${selectedModel.name} — 9,95 €`,
    });

    navigate("/product");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-6 md:py-12 pb-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="section-label mb-2">PERSONNALISATION</p>
            <h1 className="text-2xl md:text-4xl font-display font-semibold text-foreground mb-2 md:mb-4">
              Créez votre Memory
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Personnalisez votre cadre avec vos souvenirs les plus précieux.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Left: Model Selection & Form */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Model Selector */}
              <div className="space-y-3">
                <Label className="text-sm md:text-base font-medium">1. Choisissez votre modèle</Label>

                {/* Mobile: Grid (no horizontal scroll) */}
                <div className="grid grid-cols-3 gap-2 md:hidden">
                  {frameModels.map((model) => (
                    <motion.button
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        selectedModel.id === model.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="aspect-square">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedModel.id === model.id && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-2.5 w-2.5 text-primary-foreground" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5">
                        <span className="text-[10px] text-white font-medium">{model.shortName}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid grid-cols-5 gap-3">
                  {frameModels.map((model) => (
                    <motion.button
                      key={model.id}
                      onClick={() => handleModelChange(model)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        selectedModel.id === model.id
                          ? "border-primary ring-2 ring-primary/20 scale-105"
                          : "border-border hover:border-primary/30"
                      }`}
                      whileHover={{ scale: selectedModel.id === model.id ? 1.05 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="aspect-square">
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedModel.id === model.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <p className="text-xs md:text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedModel.name}</span> — {selectedModel.description}
                </p>
              </div>

              {/* Notice sur la personnalisation - Mobile */}
              <div className="lg:hidden mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 font-medium mb-1">
                      Votre personnalisation est bien prise en compte
                    </p>
                    <p className="text-xs text-blue-700 mb-2">
                      L'image ci-dessus est un exemple de rendu. Votre cadre personnalisé sera créé avec les informations que vous avez saisies.
                    </p>
                    <p className="text-xs text-blue-900 font-semibold">
                      🎁 Livré avant la Saint-Valentin ou remboursé !
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Form */}
              <div className="space-y-4">
                <Label className="text-sm md:text-base font-medium">2. Personnalisez votre cadre</Label>
                
                <motion.div 
                  className="space-y-4"
                  key={selectedModel.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedModel.fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Label htmlFor={field.id} className="flex items-center gap-2 text-sm">
                        <field.icon className="h-4 w-4 text-primary" />
                        {field.label}
                        {field.required && <span className="text-destructive">*</span>}
                      </Label>
                      
                      {field.type === "photo" ? (
                        <div className="space-y-2">
                          {photos[field.id] ? (
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border border-border">
                              <img 
                                src={photos[field.id].preview} 
                                alt="Aperçu"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => removePhoto(field.id)}
                                className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => fileInputRefs.current[field.id]?.click()}
                              className="w-full h-24 md:h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all active:bg-secondary/50"
                            >
                              <Upload className="h-6 w-6 md:h-8 md:w-8 text-muted-foreground" />
                              <span className="text-xs md:text-sm text-muted-foreground">Télécharger une photo</span>
                            </div>
                          )}
                          <input
                            ref={el => fileInputRefs.current[field.id] = el}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePhotoUpload(field.id, file);
                            }}
                          />
                        </div>
                      ) : field.type === "date" ? (
                        <Input
                          id={field.id}
                          type="date"
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="rounded-xl h-12"
                        />
                      ) : field.type === "location" ? (
                        <Input
                          id={field.id}
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="rounded-xl h-12"
                        />
                      ) : (
                        <div className="relative">
                          <Input
                            id={field.id}
                            type="text"
                            placeholder={field.placeholder}
                            value={formData[field.id] || ""}
                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                            className="rounded-xl h-12 pr-16"
                            maxLength={field.maxLength}
                          />
                          {field.maxLength && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              {(formData[field.id] || "").length}/{field.maxLength}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Mobile CTA - Below form */}
              <div className="lg:hidden mt-6">
                <div className="bg-card rounded-2xl p-5 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix total</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">9,95 €</span>
                        <span className="text-base text-muted-foreground line-through">20,00 €</span>
                      </div>
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      -50%
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full rounded-xl py-6 text-base font-semibold"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Ajouter au panier
                    </Button>
                  </motion.div>

                  {!isFormValid() && (
                    <p className="text-xs text-center text-muted-foreground">
                      Remplissez tous les champs pour continuer
                    </p>
                  )}
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:block">
                <div className="bg-card rounded-2xl p-5 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Prix total</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">9,95 €</span>
                        <span className="text-base text-muted-foreground line-through">20,00 €</span>
                      </div>
                    </div>
                    <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      -50%
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full rounded-xl py-6 text-base font-semibold"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Ajouter au panier
                    </Button>
                  </motion.div>

                  {!isFormValid() && (
                    <p className="text-xs text-center text-muted-foreground">
                      Remplissez tous les champs pour continuer
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Preview - Hidden on mobile, shown on desktop */}
            <motion.div 
              className="hidden lg:block space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label className="text-base font-medium">Aperçu de votre Memory</Label>
              
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border sticky top-24">
                {/* Frame Preview */}
                <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden bg-white shadow-xl">
                  {/* Image de base du modèle */}
                  <img 
                    src={selectedModel.image} 
                    alt={selectedModel.name}
                    className="w-full h-full object-cover"
                  />
                  
                  
                </div>
                
                {/* Notice sur la personnalisation */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-900 font-medium mb-1">
                        Votre personnalisation est bien prise en compte
                      </p>
                      <p className="text-xs text-blue-700 mb-2">
                        L'image ci-dessus est un exemple de rendu. Votre cadre personnalisé sera créé avec les informations que vous avez saisies.
                      </p>
                      <p className="text-xs text-blue-900 font-semibold">
                        🎁 Livré avant la Saint-Valentin ou remboursé !
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personalization Summary */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium text-foreground">{selectedModel.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.fields.map(field => {
                      const hasValue = field.type === "photo" ? !!photos[field.id] : !!formData[field.id];
                      return (
                        <span 
                          key={field.id}
                          className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                            hasValue 
                              ? "bg-primary/10 text-primary" 
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {hasValue && <Check className="h-3 w-3" />}
                          {field.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Livraison gratuite • Coffret cadeau inclus</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>


      {/* Alert Dialog pour la limitation à un produit */}
      <AlertDialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limitation à un produit</AlertDialogTitle>
            <AlertDialogDescription className="pt-2">
              En raison de la forte demande et de notre promesse de livraison, 
              la commande est limitée à un produit par client pour garantir 
              la qualité et les délais de livraison.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowLimitDialog(false)}>
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Customize;

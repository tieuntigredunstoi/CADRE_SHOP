import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Music, User, Heart, Upload, X, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import productNightSky from "@/assets/product-night-sky.webp";
import productSpotify from "@/assets/product-spotify.webp";
import productStreetSign from "@/assets/product-street-sign.webp";
import productCoordinates from "@/assets/product-coordinates.webp";
import productPerfectMatch from "@/assets/product-perfect-match.webp";

interface FrameModel {
  id: string;
  name: string;
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
}

const frameModels: FrameModel[] = [
  {
    id: "night-sky",
    name: "The Night We Met",
    description: "Carte du ciel personnalisée",
    image: productNightSky,
    fields: [
      { id: "title", label: "Titre", placeholder: "The Night We Met", type: "text", icon: Star, required: true },
      { id: "date", label: "Date de l'événement", placeholder: "Sélectionnez une date", type: "date", icon: Calendar, required: true },
      { id: "location", label: "Lieu", placeholder: "Paris, France", type: "location", icon: MapPin, required: true },
    ],
  },
  {
    id: "spotify",
    name: "Our Song",
    description: "Lecteur Spotify personnalisé",
    image: productSpotify,
    fields: [
      { id: "songTitle", label: "Titre de la chanson", placeholder: "Perfect", type: "text", icon: Music, required: true },
      { id: "artistName", label: "Nom de l'artiste", placeholder: "Ed Sheeran", type: "text", icon: User, required: true },
      { id: "photo", label: "Votre photo", placeholder: "Téléchargez votre photo", type: "photo", icon: Upload, required: true },
    ],
  },
  {
    id: "street-sign",
    name: "Street Sign",
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
    description: "Coordonnées GPS personnalisées",
    image: productCoordinates,
    fields: [
      { id: "title", label: "Titre", placeholder: "Where We Met", type: "text", icon: Star, required: true },
      { id: "location", label: "Lieu exact", placeholder: "Tour Eiffel, Paris", type: "location", icon: MapPin, required: true },
      { id: "date", label: "Date", placeholder: "Sélectionnez une date", type: "date", icon: Calendar, required: true },
    ],
  },
  {
    id: "perfect-match",
    name: "Perfect Match",
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

    // Create personalization summary
    const personalization = selectedModel.fields
      .map(field => {
        if (field.type === "photo") {
          return photos[field.id] ? `${field.label}: ✓` : null;
        }
        return formData[field.id] ? `${field.label}: ${formData[field.id]}` : null;
      })
      .filter(Boolean)
      .join(" | ");

    addToCart({
      name: `Memory — ${selectedModel.name}`,
      quantity: 1,
      unitPrice: 9.99,
      totalPrice: 9.99,
      image: selectedModel.image,
    });

    toast({
      title: "✨ Cadre personnalisé ajouté !",
      description: `${selectedModel.name} — 9,99 €`,
    });

    navigate("/product");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="section-label mb-2">PERSONNALISATION</p>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Créez votre Memory unique
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Personnalisez votre cadre avec vos souvenirs les plus précieux. Chaque détail compte pour créer un moment éternel.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Model Selection & Form */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Model Selector */}
              <div className="space-y-4">
                <Label className="text-base font-medium">1. Choisissez votre modèle</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
                <p className="text-sm text-muted-foreground">
                  Sélectionné : <span className="font-medium text-foreground">{selectedModel.name}</span> — {selectedModel.description}
                </p>
              </div>

              {/* Dynamic Form */}
              <div className="space-y-4">
                <Label className="text-base font-medium">2. Personnalisez votre cadre</Label>
                
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
                            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-border">
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
                              className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-secondary/30 transition-all"
                            >
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Cliquez pour télécharger</span>
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
                          className="rounded-xl"
                        />
                      ) : (
                        <Input
                          id={field.id}
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="rounded-xl"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Preview */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label className="text-base font-medium">Aperçu de votre Memory</Label>
              
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border">
                {/* Frame Preview */}
                <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden bg-white shadow-xl">
                  <img 
                    src={selectedModel.image} 
                    alt={selectedModel.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with personalization details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <div className="text-white space-y-1">
                      {selectedModel.fields.filter(f => f.type !== "photo").slice(0, 3).map(field => (
                        formData[field.id] && (
                          <p key={field.id} className="text-sm opacity-90">
                            {field.label}: <span className="font-medium">{formData[field.id]}</span>
                          </p>
                        )
                      ))}
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
              </div>

              {/* Price & CTA */}
              <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Prix total</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">9,99 €</span>
                      <span className="text-lg text-muted-foreground line-through">20,00 €</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                      -50%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Livraison gratuite • Coffret cadeau inclus</span>
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
                    Ajouter au panier
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                {!isFormValid() && (
                  <p className="text-xs text-center text-muted-foreground">
                    Remplissez tous les champs obligatoires pour continuer
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Customize;

import { useState } from "react";
import { Mail, Clock, MapPin, Send, MessageCircle, Heart, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "💌 Message envoyé !",
      description: "Notre équipe vous répondra dans les plus brefs délais.",
    });
    
    setFormData({ name: "", email: "", orderNumber: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@memory-frame.fr",
      subtitle: "Réponse sous 24h"
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun-Ven : 9h-18h",
      subtitle: "Sam : 10h-16h"
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Paris, France",
      subtitle: "Fabrication artisanale"
    },
    {
      icon: Heart,
      title: "Satisfaction",
      value: "98% clients satisfaits",
      subtitle: "Plus de 50 000 avis"
    }
  ];

  const faqItems = [
    {
      question: "Comment personnaliser mon Memory ?",
      answer: "Après votre commande, vous recevrez un email avec un lien pour personnaliser votre cadre : date, lieu, titre et photo."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Production sous 2-3 jours ouvrés après validation du design, puis livraison gratuite en 3-5 jours en France métropolitaine."
    },
    {
      question: "Puis-je modifier ma personnalisation ?",
      answer: "Oui, vous pouvez demander des modifications avant la validation finale. Notre équipe vous envoie un aperçu avant production."
    },
    {
      question: "Comment retourner un produit ?",
      answer: "Vous disposez de 30 jours pour retourner votre produit. Contactez-nous pour obtenir une étiquette de retour gratuite."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
                Contact
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
                Une question ? On est là.
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Notre équipe est à votre écoute pour vous accompagner dans la création de votre Memory parfait.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="bg-background rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-all hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{info.title}</h3>
                  <p className="text-foreground font-semibold">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">Envoyez-nous un message</h2>
                    <p className="text-sm text-muted-foreground">Réponse garantie sous 24h</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Marie Dupont"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        maxLength={100}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="marie@exemple.fr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        maxLength={255}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-foreground mb-1.5">
                        N° de commande <span className="text-muted-foreground">(optionnel)</span>
                      </label>
                      <Input
                        id="orderNumber"
                        type="text"
                        placeholder="MEM-XXXXX"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        maxLength={50}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Question sur ma commande"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        maxLength={150}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez votre demande en détail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      maxLength={1000}
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Questions fréquentes
                </h2>
                
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-background rounded-xl p-5 border border-border hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <h3 className="font-semibold text-foreground mb-2">Suivez-nous</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Rejoignez notre communauté pour découvrir les créations de nos clients et nos nouveautés.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

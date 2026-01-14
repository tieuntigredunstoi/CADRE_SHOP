import { useState } from "react";
import { Mail, Phone, Clock, MapPin, Send, MessageCircle } from "lucide-react";
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
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "contact@lashglow.fr",
      subtitle: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+33 1 23 45 67 89",
      subtitle: "Appel gratuit"
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
      value: "15 Rue de la Paix",
      subtitle: "75002 Paris, France"
    }
  ];

  const faqItems = [
    {
      question: "Comment suivre ma commande ?",
      answer: "Rendez-vous sur notre page de suivi de commande avec votre numéro de commande et votre email."
    },
    {
      question: "Quel est le délai de livraison ?",
      answer: "La livraison standard est de 2-3 jours ouvrés en France métropolitaine."
    },
    {
      question: "Comment retourner un produit ?",
      answer: "Vous disposez de 30 jours pour retourner un produit non utilisé. Contactez-nous pour obtenir une étiquette de retour."
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
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
              Contact
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-normal text-foreground mb-4">
              Nous sommes là pour vous
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une question, une suggestion ou besoin d'aide ? Notre équipe est à votre écoute pour vous accompagner.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{info.title}</h3>
                  <p className="text-foreground font-semibold">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-normal text-foreground">Envoyez-nous un message</h2>
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
                        className="bg-white"
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
                        className="bg-white"
                      />
                    </div>
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
                      className="bg-white"
                    />
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
                      className="bg-white resize-none"
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
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-xl font-display font-normal text-foreground mb-6">
                  Questions fréquentes
                </h2>
                
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 border border-gray-100">
                      <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/10">
                  <h3 className="font-medium text-foreground mb-2">Besoin d'une réponse rapide ?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Appelez-nous directement pendant nos horaires d'ouverture pour une assistance immédiate.
                  </p>
                  <a href="tel:+33123456789">
                    <Button variant="outline" className="rounded-full">
                      <Phone className="mr-2 h-4 w-4" />
                      +33 1 23 45 67 89
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

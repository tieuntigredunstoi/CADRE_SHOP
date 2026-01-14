import { useState } from "react";
import { Instagram, Facebook, Mail, Phone, MapPin, Truck, Shield, Award, Headphones, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const benefits = [
    { icon: Truck, text: "Livraison gratuite" },
    { icon: Award, text: "Qualité premium" },
    { icon: Shield, text: "Paiement sécurisé" },
    { icon: Headphones, text: "Support réactif" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Benefits Bar */}
      <div className="border-b border-primary-foreground/10 py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-center">
              <benefit.icon className="h-5 w-5 text-primary-foreground/70" />
              <span className="text-sm text-primary-foreground/70">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-2">
              <Link to="/">
                <img 
                  src={logo} 
                  alt="LASH GLOW" 
                  className="h-10 w-auto mb-4 brightness-0 invert opacity-90"
                />
              </Link>
              <p className="text-sm text-primary-foreground/70 mb-6 max-w-sm">
                Des faux cils professionnels pour un regard sublimé. Qualité salon, application facile.
              </p>

              {/* Newsletter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Inscrivez-vous à notre newsletter</h4>
                {subscribed ? (
                  <p className="text-sm text-green-400">✓ Merci pour votre inscription !</p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Votre email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                      required
                    />
                    <Button type="submit" variant="secondary" className="shrink-0">
                      S'inscrire
                    </Button>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-primary-foreground/70">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@lashglow.fr
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +33 1 23 45 67 89
                </p>
                <p className="text-xs mt-2">
                  Service client : Lun-Ven 9h-18h
                </p>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <Link to="/" className="hover:text-primary-foreground transition-colors">
                    Notre histoire
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="hover:text-primary-foreground transition-colors">
                    Catalogue produits
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#tracking" className="hover:text-primary-foreground transition-colors">
                    Suivi de commande
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Informations légales</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Conditions générales de vente
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Politique de cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    Politique de retour
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Payment */}
            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex gap-3 mb-6">
                <a 
                  href="https://instagram.com/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:contact@lashglow.fr" 
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>

              {/* Payment Methods */}
              <h4 className="font-semibold mb-3">Paiement sécurisé</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-primary-foreground/10 rounded px-3 py-1.5 text-xs font-medium">
                  VISA
                </div>
                <div className="bg-primary-foreground/10 rounded px-3 py-1.5 text-xs font-medium">
                  Mastercard
                </div>
                <div className="bg-primary-foreground/10 rounded px-3 py-1.5 text-xs font-medium">
                  Amex
                </div>
                <div className="bg-primary-foreground/10 rounded px-3 py-1.5 text-xs font-medium">
                  PayPal
                </div>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="border-t border-primary-foreground/10 pt-8 mb-6">
            <p className="text-xs text-primary-foreground/50 text-center max-w-3xl mx-auto">
              lashglow.fr est détenu et exploité par LASH GLOW SAS, une société par actions simplifiée 
              immatriculée en France, avec son siège social au 15 Rue de la Beauté, 75008 Paris, France.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2025 LASH GLOW. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs">Paiement 100% sécurisé</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

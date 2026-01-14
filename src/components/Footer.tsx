import { useState } from "react";
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  Clock, 
  Truck, 
  Shield, 
  Award, 
  Headphones,
  Send,
  Twitter,
  Linkedin
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

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
    { icon: Truck, title: "Livraison gratuite", subtitle: "Dès 50€ d'achat" },
    { icon: Shield, title: "Paiement sécurisé", subtitle: "SSL 256 bits" },
    { icon: Award, title: "Qualité premium", subtitle: "Garantie 2 ans" },
    { icon: Headphones, title: "Support réactif", subtitle: "7j/7" },
  ];

  return (
    <footer className="bg-[#3D2B3A] text-white">
      {/* Benefits Bar */}
      <div className="py-8 px-4 md:px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-5 w-5 text-white/70" />
              </div>
              <div>
                <p className="font-medium text-sm text-white">{benefit.title}</p>
                <p className="text-xs text-white/50">{benefit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-10 px-4 md:px-6 border-b border-white/10">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-display font-normal mb-3">Restez informé</h3>
          <p className="text-sm text-white/60 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir nos actualités et offres exclusives.
          </p>
          
          {subscribed ? (
            <p className="text-sm text-green-400">✓ Merci pour votre inscription !</p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full py-6 pl-6 pr-14"
                required
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand Info */}
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-xl font-bold mb-4">LASH GLOW</h2>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                L'excellence réinventée. Nous créons des produits qui transforment votre quotidien.
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                lashglow.fr est détenu et exploité par LASH GLOW SAS, société par actions simplifiée immatriculée en France, dont le siège social est situé au 15 Rue de la Paix, 75002 Paris.
              </p>
            </div>

            {/* Liens utiles */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Liens utiles</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Notre Histoire
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="hover:text-white transition-colors">
                    Produit
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Suivi commande
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Liens légaux */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Liens légaux</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li>
                  <Link to="/cgv" className="hover:text-white transition-colors">
                    Conditions générales de vente
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/cgv" className="hover:text-white transition-colors">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="hover:text-white transition-colors">
                    Politique de livraison
                  </Link>
                </li>
                <li>
                  <Link to="/return-policy" className="hover:text-white transition-colors">
                    Politique de retour
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service client & Social */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Service client</h4>
              <ul className="space-y-3 text-sm text-white/60 mb-6">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>contact@lashglow.fr</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>Lun-Ven : 9h-18h</p>
                    <p>Sam : 10h-16h</p>
                  </div>
                </li>
              </ul>

              <h4 className="font-semibold mb-3 text-white">Suivez-nous</h4>
              <div className="flex gap-2">
                <a 
                  href="https://instagram.com/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://facebook.com/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="https://twitter.com/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="https://linkedin.com/company/lashglow" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="py-6 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-white/40">
            © 2026 LASH GLOW SAS. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

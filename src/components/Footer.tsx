import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <img 
              src={logo} 
              alt="LASH GLOW" 
              className="h-10 w-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="text-sm text-primary-foreground/70">
              Des faux cils professionnels pour un regard sublimé.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/product" className="hover:text-primary-foreground transition-colors">Tous les produits</Link></li>
              <li><Link to="/product" className="hover:text-primary-foreground transition-colors">Best-sellers</Link></li>
              <li><Link to="/product" className="hover:text-primary-foreground transition-colors">Nouveautés</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Aide</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><a href="#tracking" className="hover:text-primary-foreground transition-colors">Suivi commande</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:contact@lashglow.com" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© 2025 LASH GLOW. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

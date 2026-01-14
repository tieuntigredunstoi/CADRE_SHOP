import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Notre Histoire", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Suivi", href: "/tracking" },
  ];

  return (
    <>
      <header className="bg-background py-3 px-4 md:px-12 sticky top-0 z-40 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-foreground">LASH GLOW</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                to={link.href} 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            <Button 
              variant="default" 
              className="hidden md:flex rounded-full px-6"
              onClick={() => navigate("/product")}
            >
              Acheter
            </Button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20" 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute inset-0 bg-background animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <span className="text-xl font-bold text-foreground">LASH GLOW</span>
              <div className="flex items-center gap-1">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    0
                  </span>
                </button>
                <button 
                  className="p-2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-foreground hover:bg-gray-200 transition-colors ml-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-4 py-8 space-y-6">
              {navLinks.map((link, index) => (
                <Link 
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-2xl font-display transition-colors ${
                    index === 0 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* CTA Button */}
              <Button 
                size="lg"
                className="w-full rounded-full py-6 text-base font-medium mt-8"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/product");
                }}
              >
                Acheter maintenant
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

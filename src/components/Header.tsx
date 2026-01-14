import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import logoMemory from "@/assets/logo-memory.png";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { label: "Notre Histoire", href: "/about", highlight: true },
    { label: "Contact", href: "/contact", highlight: false },
    { label: "Suivi", href: "/tracking", highlight: false },
  ];

  return (
    <>
      <header className="bg-background py-3 px-4 md:px-12 sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logoMemory} alt="Memory" className="h-8 md:h-10 w-auto" />
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
              Commander
            </Button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              className={`md:hidden p-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                mobileMenuOpen 
                  ? "bg-gray-100 text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`md:hidden absolute left-0 right-0 top-full bg-background border-b border-border/50 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? "max-h-[400px] opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 py-6 space-y-5">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-xl font-display transition-colors ${
                  link.highlight 
                    ? "text-foreground font-medium" 
                    : "text-primary hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Button 
              size="lg"
              className="w-full rounded-full py-6 text-base font-medium mt-4"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/product");
              }}
            >
              Commander maintenant
            </Button>
          </nav>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/10 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

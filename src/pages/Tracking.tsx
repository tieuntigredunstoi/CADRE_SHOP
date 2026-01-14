import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Tracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderResult, setOrderResult] = useState<null | {
    status: string;
    steps: { title: string; date: string; completed: boolean; current?: boolean }[];
    estimatedDelivery: string;
    carrier: string;
    trackingNumber: string;
  }>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: show tracking result for any order starting with "LG"
    if (orderNumber.toUpperCase().startsWith("LG")) {
      setOrderResult({
        status: "En transit",
        estimatedDelivery: "20-21 Janvier 2026",
        carrier: "Colissimo",
        trackingNumber: "6A12345678901FR",
        steps: [
          { title: "Commande confirmée", date: "16 Jan 2026, 14:32", completed: true },
          { title: "En préparation", date: "16 Jan 2026, 15:45", completed: true },
          { title: "Expédiée", date: "17 Jan 2026, 09:12", completed: true },
          { title: "En transit", date: "18 Jan 2026, 06:30", completed: true, current: true },
          { title: "Livrée", date: "Estimée 20-21 Jan", completed: false }
        ]
      });
    } else {
      setError("Commande non trouvée. Vérifiez votre numéro de commande et email.");
      setOrderResult(null);
    }
    
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 block">
              Suivi de commande
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-normal text-foreground mb-4">
              Où est mon colis ?
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Suivez votre commande en temps réel et restez informée de chaque étape jusqu'à la livraison.
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="py-12 px-4 md:px-6">
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">Rechercher ma commande</h2>
                  <p className="text-sm text-muted-foreground">Entrez vos informations ci-dessous</p>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-foreground mb-1.5">
                    Numéro de commande
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="Ex: LG-2026-12345"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Vous trouverez ce numéro dans votre email de confirmation
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email utilisé lors de la commande
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-full"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    "Recherche en cours..."
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Suivre ma commande
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Tracking Result */}
        {orderResult && (
          <section className="pb-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Status Header */}
                <div className="bg-primary/5 p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Statut actuel</p>
                        <p className="font-semibold text-foreground text-lg">{orderResult.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Livraison estimée</p>
                      <p className="font-semibold text-primary">{orderResult.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Tracking Steps */}
                <div className="p-6">
                  <div className="space-y-0">
                    {orderResult.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? step.current 
                                ? "bg-primary text-white" 
                                : "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}>
                            {step.completed && !step.current ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : step.current ? (
                              <Truck className="h-4 w-4" />
                            ) : (
                              <Package className="h-4 w-4" />
                            )}
                          </div>
                          {index < orderResult.steps.length - 1 && (
                            <div className={`w-0.5 h-12 ${
                              step.completed ? "bg-green-500" : "bg-gray-200"
                            }`} />
                          )}
                        </div>
                        <div className="pb-8">
                          <p className={`font-medium ${
                            step.current ? "text-primary" : step.completed ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carrier Info */}
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Transporteur:</span>
                      <span className="font-medium text-foreground">{orderResult.carrier}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">N° suivi:</span>
                      <span className="font-medium text-foreground font-mono">{orderResult.trackingNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Help Section */}
        <section className="py-12 px-4 md:px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-display font-normal text-foreground mb-4">
              Besoin d'aide avec votre commande ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions concernant votre livraison.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact">
                <Button variant="outline" className="rounded-full">
                  Nous contacter
                </Button>
              </a>
              <a href="tel:+33123456789">
                <Button className="rounded-full">
                  Appeler le service client
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;

import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Votre panier ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-4">Votre panier est vide</p>
            <Button onClick={() => setIsCartOpen(false)}>
              Continuer mes achats
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-secondary/30 rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.unitPrice.toFixed(2).replace(".", ",")} € / unité
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-l-lg transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-r-lg transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-bold text-foreground">
                      {item.totalPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold text-primary">
                  {totalPrice.toFixed(2).replace(".", ",")} €
                </span>
              </div>
              
              <Button className="w-full py-6 text-base font-semibold">
                Commander maintenant
              </Button>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

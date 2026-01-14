import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-normal mb-8 text-foreground">
            Politique de Retour et Remboursement
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 14 janvier 2026
            </p>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Droit de Rétractation</h2>
              <p>
                Conformément à l'article L.221-18 du Code de la consommation, vous disposez d'un délai de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">2. Conditions de Retour</h2>
              <p>Pour être accepté, le retour doit respecter les conditions suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Les produits doivent être retournés dans leur emballage d'origine</li>
                <li>Les produits ne doivent pas avoir été ouverts ou utilisés (pour des raisons d'hygiène)</li>
                <li>Les produits doivent être en parfait état, non endommagés</li>
                <li>Le retour doit être effectué dans les 14 jours suivant la notification de rétractation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">3. Produits Non Retournables</h2>
              <p>
                Pour des raisons d'hygiène et de sécurité, les produits cosmétiques ouverts ou dont le sceau a été brisé ne peuvent pas être retournés ni remboursés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">4. Procédure de Retour</h2>
              <p>Pour effectuer un retour :</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contactez notre service client à contact@lashglow.fr en indiquant votre numéro de commande</li>
                <li>Vous recevrez un formulaire de retour et les instructions</li>
                <li>Emballez soigneusement les produits dans leur emballage d'origine</li>
                <li>Joignez le formulaire de retour complété</li>
                <li>Expédiez le colis à l'adresse indiquée</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">5. Frais de Retour</h2>
              <p>
                Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part. Dans ce cas, nous vous fournirons une étiquette de retour prépayée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">6. Remboursement</h2>
              <p>
                Une fois le retour reçu et vérifié, le remboursement sera effectué dans un délai de <strong>14 jours</strong> sur le moyen de paiement utilisé lors de la commande.
              </p>
              <p>
                Le remboursement comprend le prix des produits retournés. Les frais de livraison initiaux sont remboursés uniquement en cas de retour complet de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">7. Échange</h2>
              <p>
                Les échanges ne sont pas possibles directement. Si vous souhaitez un autre produit, effectuez un retour pour remboursement et passez une nouvelle commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">8. Produits Défectueux</h2>
              <p>
                Si vous recevez un produit défectueux ou endommagé, contactez-nous immédiatement avec des photos du produit. Nous organiserons le retour et le remboursement ou le remplacement sans frais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">9. Adresse de Retour</h2>
              <p>
                <strong>LASH GLOW - Service Retours</strong><br />
                15 Rue de la Paix<br />
                75002 Paris<br />
                France
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">10. Contact</h2>
              <p>
                Pour toute question concernant les retours :<br />
                Email : contact@lashglow.fr<br />
                Téléphone : +33 1 23 45 67 89<br />
                Horaires : Lun-Ven 9h-18h, Sam 10h-16h
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
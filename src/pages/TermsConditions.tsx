import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-normal mb-8 text-foreground">
            Conditions Générales de Vente
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 14 janvier 2026
            </p>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des ventes conclues entre LASH GLOW SAS (ci-après "le Vendeur") et ses clients (ci-après "le Client") via le site internet lashglow.fr.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">2. Identité du Vendeur</h2>
              <p>
                <strong>LASH GLOW SAS</strong><br />
                Société par actions simplifiée au capital de 10 000 €<br />
                Siège social : 15 Rue de la Paix, 75002 Paris, France<br />
                RCS Paris : XXX XXX XXX<br />
                N° TVA intracommunautaire : FR XX XXX XXX XXX<br />
                Email : contact@lashglow.fr<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">3. Produits</h2>
              <p>
                Les produits proposés à la vente sont ceux figurant sur le site lashglow.fr. Chaque produit est accompagné d'un descriptif établi par le Vendeur. Les photographies des produits sont les plus fidèles possibles mais ne peuvent assurer une similitude parfaite avec le produit offert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">4. Prix</h2>
              <p>
                Les prix sont indiqués en euros toutes taxes comprises (TTC). Le Vendeur se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable au Client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">5. Commande</h2>
              <p>
                Le Client passe commande sur le site internet lashglow.fr. La validation de la commande implique l'acceptation des présentes CGV. Un email de confirmation récapitulant la commande est envoyé au Client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">6. Paiement</h2>
              <p>
                Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express). Le paiement est sécurisé par notre prestataire de paiement. La commande est validée après acceptation du paiement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">7. Livraison</h2>
              <p>
                Les produits sont livrés à l'adresse indiquée par le Client lors de la commande. Les délais de livraison sont donnés à titre indicatif. Pour plus de détails, consultez notre Politique de Livraison.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">8. Droit de Rétractation</h2>
              <p>
                Conformément à l'article L.221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation. Pour plus de détails, consultez notre Politique de Retour.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">9. Garanties</h2>
              <p>
                Le Vendeur est tenu des défauts de conformité du bien au contrat et des vices cachés dans les conditions prévues aux articles L.217-4 et suivants du Code de la consommation et aux articles 1641 et suivants du Code civil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">10. Protection des Données</h2>
              <p>
                Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des commandes. Pour plus de détails, consultez notre Politique de Confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">11. Droit Applicable</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsConditions;
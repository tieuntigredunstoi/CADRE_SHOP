import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-normal mb-8 text-foreground">
            Politique de Livraison
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 14 janvier 2026
            </p>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Zones de Livraison</h2>
              <p>
                LASH GLOW livre actuellement dans les zones suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>France métropolitaine</strong></li>
                <li><strong>Belgique</strong></li>
                <li><strong>Suisse</strong></li>
                <li><strong>Luxembourg</strong></li>
                <li><strong>Monaco</strong></li>
              </ul>
              <p>
                Pour les autres destinations, veuillez nous contacter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">2. Délais de Livraison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 text-foreground">Destination</th>
                      <th className="text-left py-3 pr-4 text-foreground">Délai estimé</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">France métropolitaine</td>
                      <td className="py-3 pr-4">2-4 jours ouvrés</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Belgique, Luxembourg</td>
                      <td className="py-3 pr-4">3-5 jours ouvrés</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 pr-4">Suisse</td>
                      <td className="py-3 pr-4">4-6 jours ouvrés</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Monaco</td>
                      <td className="py-3 pr-4">2-4 jours ouvrés</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                Les délais sont donnés à titre indicatif et peuvent varier en fonction des périodes de forte activité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">3. Frais de Livraison</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>France métropolitaine :</strong> Gratuit dès 50€ d'achat, sinon 4,90€</li>
                <li><strong>Belgique, Luxembourg :</strong> 6,90€</li>
                <li><strong>Suisse :</strong> 9,90€</li>
                <li><strong>Monaco :</strong> 4,90€</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">4. Modes de Livraison</h2>
              <p>Nous proposons les modes de livraison suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Livraison à domicile :</strong> Le colis est livré directement à l'adresse indiquée</li>
                <li><strong>Point relais :</strong> Choisissez un point de retrait proche de chez vous</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">5. Suivi de Commande</h2>
              <p>
                Dès l'expédition de votre commande, vous recevrez un email avec un numéro de suivi vous permettant de suivre l'acheminement de votre colis en temps réel.
              </p>
              <p>
                Vous pouvez également suivre votre commande sur notre page de <a href="/tracking" className="text-primary hover:underline">suivi de commande</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">6. Réception du Colis</h2>
              <p>
                À la réception, vérifiez l'état du colis. En cas de dommage apparent, refusez le colis ou émettez des réserves écrites auprès du transporteur, et contactez-nous immédiatement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">7. Colis Non Réclamé</h2>
              <p>
                Si le colis n'est pas réclamé dans le délai imparti par le transporteur, il nous sera retourné. Des frais de réexpédition pourront être appliqués.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">8. Problème de Livraison</h2>
              <p>
                En cas de problème de livraison (colis perdu, endommagé, non reçu), contactez notre service client dans les 48h suivant la date de livraison prévue.
              </p>
              <p>
                Email : contact@lashglow.fr<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">9. Modification d'Adresse</h2>
              <p>
                Toute modification d'adresse doit être signalée avant l'expédition de la commande. Une fois le colis expédié, aucune modification n'est possible.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
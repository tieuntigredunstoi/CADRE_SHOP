import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-normal mb-8 text-foreground">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : 14 janvier 2026
            </p>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">1. Introduction</h2>
              <p>
                LASH GLOW SAS s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">2. Responsable du Traitement</h2>
              <p>
                <strong>LASH GLOW SAS</strong><br />
                15 Rue de la Paix, 75002 Paris, France<br />
                Email : privacy@lashglow.fr<br />
                Téléphone : +33 1 23 45 67 89
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">3. Données Collectées</h2>
              <p>Nous collectons les types de données suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                <li><strong>Données de livraison :</strong> adresse postale</li>
                <li><strong>Données de paiement :</strong> informations de carte bancaire (traitées par notre prestataire sécurisé)</li>
                <li><strong>Données de navigation :</strong> adresse IP, cookies, pages visitées</li>
                <li><strong>Données de commande :</strong> historique des achats, préférences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">4. Finalités du Traitement</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Traiter et livrer vos commandes</li>
                <li>Gérer votre compte client</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Améliorer nos services et notre site web</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">5. Base Légale</h2>
              <p>
                Le traitement de vos données est fondé sur : l'exécution du contrat (commandes), votre consentement (newsletter), nos intérêts légitimes (amélioration des services) et nos obligations légales (facturation).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">6. Durée de Conservation</h2>
              <p>
                Vos données sont conservées pendant la durée de la relation commerciale et jusqu'à 3 ans après votre dernière interaction, sauf obligation légale de conservation plus longue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">7. Partage des Données</h2>
              <p>
                Vos données peuvent être partagées avec nos prestataires de services (livraison, paiement) uniquement dans le cadre de l'exécution de votre commande. Nous ne vendons jamais vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">8. Vos Droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement (droit à l'oubli)</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à privacy@lashglow.fr
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">9. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">10. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-foreground mb-4">11. Contact</h2>
              <p>
                Pour toute question concernant cette politique, contactez notre Délégué à la Protection des Données : privacy@lashglow.fr
              </p>
              <p>
                Vous pouvez également déposer une réclamation auprès de la CNIL : www.cnil.fr
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
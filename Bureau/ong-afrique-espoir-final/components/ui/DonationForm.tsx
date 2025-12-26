"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { openPaymentWidget } from "@/components/ui/main";
import { processDonationSuccess } from "@/app/actions/donation";

export function DonationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    amount: "",
    frequency: "unique",
    name: "",
    email: "",
    phone: "",
    address: "",
    project: "",
    newsletter: false,
    importance: 5,
  });

  const [step, setStep] = useState(1); // 1: Info, 2: Payment

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate and go to payment
      if (!formData.amount || !formData.name || !formData.email || !formData.phone) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }
      setStep(2);
    } else {
      // Trigger KKiaPay via external function
      openPaymentWidget(formData.amount, formData);
    }
  };

  // Handle KKiaPay success callback via event listener
  useEffect(() => {
    const handleSuccess = async (event: CustomEvent) => {
      console.log("Payment successful:", event);
      
      // Send email notification
      try {
        await processDonationSuccess({
          amount: formData.amount,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          frequency: formData.frequency,
          project: formData.project,
          transactionId: event.detail?.transactionId || "N/A"
        });
      } catch (error) {
        console.error("Error sending notification:", error);
      }

      router.push("/merci");
    };

    const handleFailed = (event: unknown) => {
      console.log("Payment failed:", event);
    };

    window.addEventListener('kkiapaySuccess', handleSuccess as unknown as EventListener);
    window.addEventListener('kkiapayFailed', handleFailed);

    return () => {
      window.removeEventListener('kkiapaySuccess', handleSuccess as unknown as EventListener);
      window.removeEventListener('kkiapayFailed', handleFailed);
    };
  }, [router, formData]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <>
          <div>
            <h3 className="mb-4 text-xl font-bold text-terra-dark">Informations de Don</h3>
            
            {/* Amount */}
            <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Montant du Don (FCFA) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                required
                min="500"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
                placeholder="Ex: 5000"
              />
            </div>

            {/* Frequency */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Fréquence du Don <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {["unique", "mensuel", "trimestriel", "annuel"].map((freq) => (
                  <label
                    key={freq}
                    className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                      formData.frequency === freq
                        ? "border-terra-green bg-terra-green/10"
                        : "border-gray-300 hover:border-terra-green/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={freq}
                      checked={formData.frequency === freq}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium capitalize">{freq}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project */}
            <div className="mb-4">
              <label htmlFor="project" className="mb-2 block text-sm font-medium">
                Dédier votre don à un projet spécifique ? (Optionnel)
              </label>
              <select
                id="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
              >
                <option value="">Soutien général</option>
                <option value="education">Éducation</option>
                <option value="environnement">Environnement</option>
                <option value="sante">Santé</option>
                <option value="femmes">Autonomisation des Femmes</option>
                <option value="tic">Technologies (TIC)</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-terra-dark">Vos Coordonnées</h3>
            
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nom Complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
                placeholder="Jean Dupont"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Adresse E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
                placeholder="jean@example.com"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Numéro de Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
                placeholder="+229 XX XX XX XX"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="mb-2 block text-sm font-medium">
                Adresse Postale (Optionnel, pour reçu fiscal)
              </label>
              <textarea
                id="address"
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-md border border-gray-300 p-3 focus:border-terra-green focus:outline-none focus:ring-1 focus:ring-terra-green"
                placeholder="Votre adresse complète"
              />
            </div>

            {/* Newsletter */}
            <div className="mb-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-terra-green focus:ring-terra-green"
                />
                <span className="text-sm text-gray-600">
                  Oui, je souhaite recevoir des mises à jour sur l&apos;impact de mon don et les actualités d&apos;Afrique Espoir
                </span>
              </label>
            </div>

            {/* Importance Rating */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">
                Comment évaluez-vous l&apos;importance des causes soutenues par Afrique Espoir ?
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Peu Important</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.importance}
                  onChange={(e) => setFormData({ ...formData, importance: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500">Très Important</span>
                <span className="ml-2 font-bold text-terra-green">{formData.importance}/10</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continuer vers le Paiement
          </Button>
        </>
      ) : (
        <>
          <div className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
            <h3 className="mb-6 text-center text-2xl font-bold text-terra-dark font-serif">Faire un don</h3>
            
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-terra-yellow/20 px-8 py-3 text-xl font-bold text-terra-dark">
                Contribution : {formData.amount} FCFA
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="mb-4 text-sm font-medium text-gray-600">Moyens de paiement acceptés :</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Image 
                  src="/payment-icons.png" 
                  alt="Moyens de paiement : Visa, Mastercard, MoMo, Moov Money" 
                  width={300} 
                  height={50} 
                  className="h-auto w-full max-w-[300px] object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => openPaymentWidget(formData.amount, formData)} 
                className="w-full bg-terra-green hover:bg-terra-green/90 text-lg py-6"
              >
                Payer {formData.amount} F CFA
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep(1)}
                className="w-full text-gray-500"
              >
                Annuler / Modifier
              </Button>
            </div>
          </div>
        </>
      )}
      <Script src="https://cdn.kkiapay.me/k.js" strategy="lazyOnload" />
    </form>
  );
}

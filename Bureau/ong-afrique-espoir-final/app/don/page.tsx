import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DonationForm } from "@/components/ui/DonationForm";

export default function DonPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-terra-green to-terra-blue py-16 text-center text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Faire un Don</h1>
            <p className="mx-auto max-w-2xl text-lg text-blue-100">
              Soutenez les initiatives d&apos;Afrique Espoir pour l&apos;amélioration des conditions de vie en Afrique.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
              <DonationForm />
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-terra-dark">L&apos;Impact de Votre Don</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-terra-light p-6">
                  <div className="mb-2 text-3xl font-bold text-terra-green">5 000 FCFA</div>
                  <p className="text-sm text-gray-600">Fournitures scolaires pour un enfant pendant 1 an</p>
                </div>
                <div className="rounded-lg bg-terra-light p-6">
                  <div className="mb-2 text-3xl font-bold text-terra-blue">15 000 FCFA</div>
                  <p className="text-sm text-gray-600">Plantation de 50 arbres pour le reboisement</p>
                </div>
                <div className="rounded-lg bg-terra-light p-6">
                  <div className="mb-2 text-3xl font-bold text-terra-yellow">25 000 FCFA</div>
                  <p className="text-sm text-gray-600">Formation numérique pour 5 jeunes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

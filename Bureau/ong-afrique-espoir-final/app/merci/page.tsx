import Link from "next/link";
import { CheckCircle, Download, Home } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function DonateSuccess() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex grow items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-16 w-16 text-terra-green" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-terra-dark">Merci pour votre don !</h1>
          
          <p className="mb-8 text-gray-600">
            Votre générosité nous permet de continuer nos actions sur le terrain. 
            Un email de confirmation vous a été envoyé.
          </p>

          <div className="mb-8 rounded-lg border border-green-100 bg-green-50 p-4 text-left text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Statut</span>
              <span className="font-bold text-terra-green">Confirmé</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Date</span>
              <span className="font-bold text-gray-900">{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Organisation</span>
              <span className="font-bold text-gray-900">ONG Afrique Espoir</span>
            </div>
          </div>

          <div className="space-y-3">
            
            <Link href="/" className="block w-full">
              <Button className="w-full gap-2">
                <Home className="h-4 w-4" />
                Retour à l&apos;accueil
              </Button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

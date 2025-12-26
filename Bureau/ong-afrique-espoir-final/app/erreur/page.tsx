import Link from "next/link";
import { AlertCircle, RefreshCw, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function DonateError() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex grow items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="mb-4 text-2xl font-bold text-terra-dark">Oups, un petit souci...</h1>
          
          <p className="mb-8 text-gray-600">
            Le processus de paiement a été annulé ou a échoué. 
            Aucune somme n&apos;a été débitée de votre compte.
          </p>

          <div className="space-y-3">
            <Link href="/don" className="block w-full">
              <Button className="w-full gap-2 bg-terra-yellow hover:bg-terra-yellow/90 text-terra-dark">
                <RefreshCw className="h-4 w-4" />
                Réessayer le don
              </Button>
            </Link>
            
            <Link href="/#contact" className="block w-full">
              <Button variant="ghost" className="w-full gap-2 text-gray-500">
                <Mail className="h-4 w-4" />
                Signaler un problème
              </Button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

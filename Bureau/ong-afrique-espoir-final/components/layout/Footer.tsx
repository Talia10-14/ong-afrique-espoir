import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-terra-dark text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-terra-yellow">Afrique Espoir</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Œuvrer ensemble pour un avenir durable et solidaire en Afrique.
              Rejoignez notre mission pour l&apos;éducation, la santé et l&apos;environnement.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-terra-yellow">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-terra-green mt-1 shrink-0" />
                <span>Godomey Dèkoungbé, Immeuble à étage avant barrière sur la voie de Togbin<br />08 BP 1106 Cotonou</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-terra-green" />
                <span>97 05 74 41 / 96 06 45 76 / 66 88 99 86</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-terra-green" />
                <span>ongafriqueespoir06@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-terra-yellow">Suivez-nous</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-terra-yellow transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-terra-yellow transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-terra-yellow transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-4">
            <p>&copy; {new Date().getFullYear()} ONG Afrique Espoir. Tous droits réservés.</p>
            <Link 
              href="/admin/login" 
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors opacity-60 hover:opacity-100"
              title="Accès administrateur"
            >
              ⚙️
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

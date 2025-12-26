import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-terra-green/20 bg-terra-green shadow-md">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Image */}
          <Image 
            src="/logo.jpg" 
            alt="Logo Afrique Espoir" 
            width={80} 
            height={80} 
            className="h-20 w-auto rounded-md bg-white" 
          />
          <span className="text-2xl font-bold text-white hidden sm:inline-block">Afrique Espoir</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-base font-medium text-white/90 hover:text-terra-yellow transition-colors">
            Accueil
          </Link>
          <Link href="/#about" className="text-base font-medium text-white/90 hover:text-terra-yellow transition-colors">
            À Propos
          </Link>
          <Link href="/#domains" className="text-base font-medium text-white/90 hover:text-terra-yellow transition-colors">
            Nos Domaines
          </Link>
          <Link href="/actions" className="text-base font-medium text-white/90 hover:text-terra-yellow transition-colors">
            Découvrir nos actions
          </Link>
          <Link href="/#contact" className="text-base font-medium text-white/90 hover:text-terra-yellow transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/don" >
            <Button variant="primary" size="sm" className="hidden md:inline-flex shadow-sm">
              Faire un don
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-terra-green/80 hover:text-terra-yellow">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

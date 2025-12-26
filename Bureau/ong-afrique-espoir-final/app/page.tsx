import { HeroCarousel } from "@/components/ui/HeroCarousel";
import { Section } from "@/components/ui/Section";
import { ImpactCard } from "@/components/ui/ImpactCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Leaf, Users, Laptop } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import { LatestNews } from "@/components/ui/LatestNews";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* Latest News Section */}
        <LatestNews />

        {/* About Section */}
        <Section id="about" className="bg-white">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
              <img 
                src="/about.jpg" 
                alt="Équipe ONG Afrique Espoir" 
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-terra-dark md:text-4xl">
                Qui Sommes-Nous ?
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                Fondée avec la conviction que chaque action compte, l&apos;ONG Afrique Espoir œuvre quotidiennement sur le terrain pour apporter des solutions concrètes aux défis de notre temps.
              </p>
              <p className="mb-8 text-gray-600">
                Notre mission est double : protéger notre patrimoine naturel unique et offrir des opportunités d&apos;avenir à la jeunesse à travers l&apos;éducation et l&apos;innovation technologique.
              </p>
              <Button variant="link" className="px-0 text-terra-green">
                En savoir plus sur notre histoire <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Section>

        {/* Domains Section */}
        <Section id="domains" className="bg-terra-light">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-terra-dark md:text-4xl">Nos Domaines d&apos;Action</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Nous intervenons là où les besoins sont les plus urgents, avec une approche holistique et durable.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <ImpactCard
              title="Environnement"
              description="Reboisement, sensibilisation à l'écologie et protection de la biodiversité pour un cadre de vie sain."
              icon={Leaf}
              color="green"
            />
            <ImpactCard
              title="Social & Éducation"
              description="Soutien scolaire, aide aux familles défavorisées et programmes d'autonomisation des femmes."
              icon={Users}
              color="blue"
            />
            <ImpactCard
              title="Technologie (TIC)"
              description="Formation aux outils numériques et réduction de la fracture numérique pour la jeunesse."
              icon={Laptop}
              color="yellow"
            />
          </div>
        </Section>

        {/* Partners Section */}
        <Section id="partners" className="bg-white">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-terra-dark md:text-4xl">Nos Partenaires</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Ils nous soutiennent dans notre mission pour un impact durable.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="relative h-24 w-48">
               <img src="/partners/afrijus.jpg" alt="Afrijus" className="h-full w-full object-contain" />
            </div>
            <div className="relative h-24 w-48">
               <img src="/partners/tams.jpg" alt="TAMS Technologies" className="h-full w-full object-contain" />
            </div>
            <div className="relative h-24 w-48">
               <img src="/partners/nissi.jpg" alt="Agence Nissi Communication" className="h-full w-full object-contain" />
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="bg-terra-light">
          <div className="rounded-2xl bg-terra-blue p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Rejoignez le Mouvement</h2>
                <p className="mb-6 text-blue-100">
                  Vous souhaitez devenir bénévole, partenaire ou simplement nous poser une question ? N&apos;hésitez pas à nous contacter.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li>ongafriqueespoir@gmail.com</li>
                  <li>97 05 74 41 / 96 06 45 76</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white p-6 text-terra-dark shadow-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

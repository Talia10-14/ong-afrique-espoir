import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getActions } from "@/app/actions/actions";
import { ActionsList } from "@/components/ui/ActionsList";

export default async function ActionsPage() {
  // Fetch all actions server-side
  const actions = await getActions();

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-terra-dark py-20 text-center text-white">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Nos Actions sur le Terrain</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Découvrez comment nous transformons vos dons en actions concrètes pour un impact durable.
            </p>
          </div>
        </div>

        {/* Actions List with Instant Search */}
        <Section className="bg-gray-50">
          <ActionsList actions={actions} />
        </Section>

        {/* CTA Section */}
        <Section className="bg-terra-green text-white">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Vous avez un projet en tête ?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-green-100">
              Nous sommes toujours à la recherche de nouvelles initiatives pour aider les communautés. Contactez-nous pour en discuter.
            </p>
            <Link href="/#contact">
              <Button variant="secondary" size="lg" className="bg-white text-terra-green hover:bg-gray-100">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

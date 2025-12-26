import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

async function getLatestActions() {
  return await prisma.action.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
  });
}

export async function LatestNews() {
  const actions = await getLatestActions();

  if (actions.length === 0) return null;

  return (
    <Section id="latest-news" className="bg-gray-50">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-terra-dark md:text-4xl">Nos Actualités</h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Découvrez les dernières actions menées par nos équipes sur le terrain.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {actions.map((action) => (
          <div key={action.id} className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
            <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
              {action.image ? (
                <Image
                  src={action.image}
                  alt={action.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  Pas d&apos;image
                </div>
              )}
              {action.category && (
                <div className="absolute top-4 left-4 rounded-full bg-terra-yellow px-3 py-1 text-xs font-bold text-terra-dark shadow-sm">
                  {action.category}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                {action.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {action.date}
                  </div>
                )}
              </div>
              <h3 className="mb-3 text-xl font-bold text-terra-dark line-clamp-2 group-hover:text-terra-green transition-colors">
                {action.title}
              </h3>
              <p className="mb-6 text-gray-600 line-clamp-3 text-sm">
                {action.description}
              </p>
              <Link href="/actions">
                <Button variant="link" className="px-0 text-terra-green hover:text-terra-dark">
                  Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/actions">
          <Button variant="outline" className="border-terra-green text-terra-green hover:bg-terra-green hover:text-white">
            Voir toutes nos actions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { Action } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Calendar, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ActionsList({ actions }: { actions: Action[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 4;

  const filteredActions = actions.filter((action) =>
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (action.category && action.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleActions = showAll ? filteredActions : filteredActions.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="container mx-auto px-4">
      {/* Search Section */}
      <div className="mx-auto mb-12 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-200 py-3 pl-10 pr-4 shadow-sm outline-none focus:border-terra-green focus:ring-1 focus:ring-terra-green"
          />
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {visibleActions.length > 0 ? (
          visibleActions.map((action) => (
            <div key={action.id} className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                {action.image ? (
                  <div 
                    className="relative h-full w-full cursor-pointer" 
                    onClick={() => setSelectedImage(action.image || null)}
                  >
                    <Image
                      src={action.image}
                      alt={action.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                        <span className="opacity-0 transition-opacity group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm">Agrandir</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    Pas d&apos;image
                  </div>
                )}
                {action.category && (
                  <div className="absolute top-4 left-4 pointer-events-none rounded-full bg-terra-yellow px-3 py-1 text-xs font-bold text-terra-dark shadow-sm">
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
                  {action.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {action.location}
                    </div>
                  )}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-terra-dark group-hover:text-terra-green transition-colors">
                  {action.title}
                </h3>
                <p className="mb-6 text-gray-600 line-clamp-3">
                  {action.description}
                </p>
                <Link href="/don">
                  <Button variant="outline" className="w-full border-terra-green text-terra-green hover:bg-terra-green hover:text-white">
                    Soutenir ce projet <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {searchTerm ? "Aucun résultat trouvé." : "Aucune action pour le moment."}
          </p>
        )}
      </div>

      {/* Show More Button */}
      {filteredActions.length > INITIAL_DISPLAY_COUNT && (
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="min-w-[200px]"
          >
            {showAll ? "Voir moins" : "Voir plus"}
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg">
            <Image
              src={selectedImage}
              alt="Agrandissement"
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button 
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

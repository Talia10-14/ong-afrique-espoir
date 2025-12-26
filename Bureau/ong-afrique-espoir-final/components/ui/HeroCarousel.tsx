"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "/hero/child.png",
    title: "L'Espoir d'un Avenir Meilleur",
    subtitle: "Chaque enfant mérite une éducation de qualité et un environnement sain pour grandir.",
  },
  {
    id: 2,
    image: "/hero/forest.png",
    title: "Protégeons Notre Nature",
    subtitle: "Préserver la biodiversité africaine pour les générations futures est notre devoir.",
  },
  {
    id: 3,
    image: "/hero/digital.png",
    title: "Innovation & Technologie",
    subtitle: "Réduire la fracture numérique et former la jeunesse aux métiers de demain.",
  },
  {
    id: 4,
    image: "/hero/social.png",
    title: "Solidarité & Entraide",
    subtitle: "Soutenir les communautés vulnérables pour construire une société plus juste.",
  },
];

export function HeroCarousel() {
  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-terra-dark">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true} // Add navigation arrows for better usability
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <div className="relative h-full w-full">
              {/* Image with overlay */}
              <div className="absolute inset-0">
                 <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover brightness-50 transition-transform duration-[10000ms] ease-linear hover:scale-105" // Subtle zoom effect
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terra-dark/80 via-transparent to-terra-dark/30" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container px-4 text-center md:px-6">
                  <div className="animate-fade-in-up">
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg leading-tight">
                      {slide.title}
                    </h1>
                    <p className="mx-auto mb-8 max-w-xl text-base text-gray-100 sm:text-lg md:text-xl drop-shadow-md font-light">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Link href="/don"  className="w-full sm:w-auto">
                        <Button size="lg" className="w-full shadow-xl sm:w-auto text-base py-6">
                          Faire un don
                        </Button>
                      </Link>
                      <Link href="/actions" className="w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-white text-white hover:bg-white hover:text-terra-dark shadow-xl sm:w-auto text-base py-6"
                        >
                          Découvrir nos actions
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: var(--color-terra-yellow);
          opacity: 1;
          width: 12px;
          height: 12px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          opacity: 1;
          color: var(--color-terra-yellow);
        }
        /* Hide navigation on very small screens to avoid clutter */
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

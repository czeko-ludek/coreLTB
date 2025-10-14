import React from 'react';
import { Button } from '@/components/ui';

export function ProjectModificationCTA() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            ZMIANY W PROJEKCIE?
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/90 mb-4 leading-relaxed">
            Chcesz wybudować dom według tego projektu lecz potrzebujesz wprowadzić kilka zmian?
          </p>
          <p className="text-base lg:text-lg text-white/80 mb-8">
            Skorzystaj z usługi naszego <strong>STUDIA ADAPTACJI</strong>: bezpłatna wycena zmian i
            adaptacja ponad 100 sprawdzonych architektów na terenie całej Polski Nigdy tak łatwo nie
            było zmienić projektu i adaptacja
          </p>

          {/* CTA Button */}
          <Button variant="outline-white" size="lg" href="/kontakt">
            ZAMÓW ZMIANY
          </Button>
        </div>
      </div>
    </section>
  );
}

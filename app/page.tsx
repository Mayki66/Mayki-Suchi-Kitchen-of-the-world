// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/world-background.jpg"
          alt="Carte du monde"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="backdrop-blur-sm bg-black/60 p-8 rounded-xl max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Mayki & Suchi - Kitchen of the World</h1>
        <p className="text-lg">
          Explore un monde de saveurs végétariennes et ajoute les ingrédients que tu as chez toi pour
          découvrir ce que tu peux cuisiner !
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/ingredients">
            <Button className="text-lg px-6 py-3">🧺 Mes ingrédients</Button>
          </Link>
          <Link href="/recettes">
            <Button className="text-lg px-6 py-3" variant="secondary">
              📖 Voir les recettes
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

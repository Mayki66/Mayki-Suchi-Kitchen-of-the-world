"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import recipesData from "@/data/recipes.json";

export default function RecettesPage() {
  const allRecipes = Object.values(recipesData).flat();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchName = recipe.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = selectedFilter
      ? recipe.ingredients.some((i: string) => i.toLowerCase().includes(selectedFilter.toLowerCase()))
      : true;
    return matchName && matchFilter;
  });

  return (
    <main className="min-h-screen px-4 py-6 bg-background text-foreground">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="outline">⬅️ Retour</Button>
        </Link>
        <Link href="/ingredients">
          <Button variant="secondary">🧺 Mes ingrédients</Button>
        </Link>
      </div>

      {/* Titre */}
      <h1 className="text-4xl font-bold mb-2 text-center">Les recettes végétariennes du monde</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Filtrez les recettes par nom, ingrédient, glucides ou protéines pour découvrir des plats du monde entier.
      </p>

      {/* Recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <input
          type="text"
          placeholder="🔍 Rechercher un plat ou un ingrédient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
        />

        <select
          onChange={(e) => setSelectedFilter(e.target.value || null)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Filtrer par glucide ou protéine</option>
          <option value="glucide">Glucides</option>
          <option value="protéine">Protéines</option>
        </select>

        <Link href="/ajouter-recette">
          <Button>➕ Ajouter une recette</Button>
        </Link>
      </div>

      {/* Tableau des recettes */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nom du plat</th>
              <th className="p-3 text-left">Pays</th>
              <th className="p-3 text-left">Glucides / Protéines</th>
              <th className="p-3 text-left">Lien</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.map((recipe: any, index: number) => (
              <tr key={index} className="border-b hover:bg-muted/40">
                <td className="p-3 font-medium">{recipe.nom}</td>
                <td className="p-3">{recipe.pays}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  {recipe.ingredients.map((ing: string, i: number) => (
                    <Badge key={i}>{ing}</Badge>
                  ))}
                </td>
                <td className="p-3 text-blue-600">
                  <Link href={`/recettes/${encodeURIComponent(recipe.nom.toLowerCase().replace(/\s+/g, "-"))}`}>
                    Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

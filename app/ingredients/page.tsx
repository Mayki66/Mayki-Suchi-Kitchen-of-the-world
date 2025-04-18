"use client";

import { useState } from "react";
import Link from "next/link";
import ingredientsData from "@/data/ingredients.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  const handleCheckboxChange = (ingredient: string, checked: boolean) => {
    setSelectedIngredients((prev) => ({ ...prev, [ingredient]: checked }));
  };

  const handleQuantityChange = (ingredient: string, value: string) => {
    setQuantities((prev) => ({ ...prev, [ingredient]: value }));
  };

  return (
    <main className="relative min-h-screen bg-white/80 text-black px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="absolute top-4 left-4">
          ⬅️ Retour
        </Button>
      </Link>

      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Ajoutez les ingrédients de votre cuisine</h1>
        <p className="text-lg max-w-2xl">
          Cochez les ingrédients que vous avez, et ajoutez une quantité si vous le souhaitez. Cela permettra de filtrer les recettes correspondantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {Object.entries(ingredientsData).map(([category, list]) => (
          <div key={category} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {category === "legumes" && "🥦 Légumes"}
              {category === "fruits" && "🍎 Fruits"}
              {category === "cereales" && "🌾 Céréales"}
              {category === "epices" && "🧂 Épices"}
              {category === "liquides" && "💧 Liquides"}
              {category === "oleagineux" && "🌿 Oléagineux"}
            </h2>
            <ul className="space-y-2">
              {list.map((item, index) => {
                const uniqueKey = `${category}-${item.name}`;
                if (!item.name) return null;
                return (
                  <li key={uniqueKey} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={uniqueKey}
                        checked={selectedIngredients[item.name] || false}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(item.name, Boolean(checked))
                        }
                      />
                      <label htmlFor={uniqueKey} className="text-sm font-medium">
                        {item.name}
                      </label>
                      <div className="text-sm text-gray-500">
                        {item.glucide && <span className="mr-1">🥖</span>}
                        {item.proteine && <span>💪</span>}
                      </div>
                    </div>
                    {selectedIngredients[item.name] && (
                      <Input
                        placeholder="Quantité"
                        value={quantities[item.name] || ""}
                        onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                        className="ml-6 max-w-[200px]"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="default" size="lg">
          🔍 Trouver des recettes correspondantes
        </Button>
      </div>
    </main>
  );
}

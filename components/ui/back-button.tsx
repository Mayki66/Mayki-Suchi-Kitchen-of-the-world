"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30 transition text-white"
      aria-label="Revenir en arrière"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}

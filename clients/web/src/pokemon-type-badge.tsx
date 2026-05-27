import { Badge } from "@design-system/components/ui/badge";
import { cn } from "@design-system/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  fire: "bg-orange-500 text-white border-orange-600",
  water: "bg-blue-500 text-white border-blue-600",
  grass: "bg-green-500 text-white border-green-600",
  electric: "bg-yellow-400 text-black border-yellow-500",
  psychic: "bg-pink-500 text-white border-pink-600",
  normal: "bg-gray-400 text-white border-gray-500",
  fighting: "bg-red-600 text-white border-red-700",
  poison: "bg-purple-500 text-white border-purple-600",
  ground: "bg-amber-600 text-white border-amber-700",
  rock: "bg-stone-500 text-white border-stone-600",
  bug: "bg-lime-500 text-white border-lime-600",
  ghost: "bg-indigo-700 text-white border-indigo-800",
  steel: "bg-slate-400 text-white border-slate-500",
  dragon: "bg-violet-600 text-white border-violet-700",
  dark: "bg-neutral-700 text-white border-neutral-800",
  fairy: "bg-rose-400 text-white border-rose-500",
  ice: "bg-cyan-300 text-black border-cyan-400",
  flying: "bg-sky-400 text-white border-sky-500",
};

interface PokemonTypeBadgeProps {
  type: string;
  className?: string;
}

export function PokemonTypeBadge({ type, className }: PokemonTypeBadgeProps) {
  const colorClass = TYPE_COLORS[type] ?? "bg-gray-300 text-black border-gray-400";

  return (
    <Badge variant="outline" className={cn("border capitalize", colorClass, className)}>
      {type}
    </Badge>
  );
}

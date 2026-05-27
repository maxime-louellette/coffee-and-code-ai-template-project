import { Card, CardContent, CardHeader, CardTitle } from "@design-system/components/ui/card";
import { cn } from "@design-system/lib/utils";
import { useTranslation } from "react-i18next";

import type { PokemonSummary } from "./pokedex-types";

import { PokemonTypeBadge } from "./pokemon-type-badge";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  isSelected: boolean;
  onClick: () => void;
}

export function PokemonCard({ pokemon, isSelected, onClick }: PokemonCardProps) {
  const { t } = useTranslation("pokedex");

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card
        className={cn(
          "cursor-pointer gap-3 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md",
          isSelected && "shadow-md ring-2 ring-primary",
        )}
      >
        <CardHeader className="px-4 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold capitalize">{pokemon.name}</CardTitle>
            <span className="text-xs text-muted-foreground">
              {t(($) => $.POKEDEX_ID_LABEL, { id: String(pokemon.id) })}
            </span>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-0">
          <div className="mb-2 flex justify-center">
            <img src={pokemon.imageUrl} alt={pokemon.name} className="size-20 object-contain" loading="lazy" />
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

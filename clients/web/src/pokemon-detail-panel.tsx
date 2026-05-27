import { Card, CardContent, CardHeader, CardTitle } from "@design-system/components/ui/card";
import { Spinner } from "@design-system/components/ui/spinner";
import { useTranslation } from "react-i18next";

import type { PokemonDetail } from "./pokedex-types";

import { PokemonTypeBadge } from "./pokemon-type-badge";

const STAT_MAX = 200;

interface StatBarProps {
  label: string;
  value: number;
}

function StatBar({ label, value }: StatBarProps) {
  const pct = Math.min((value / STAT_MAX) * 100, 100);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-20 shrink-0 text-right text-xs text-muted-foreground">{label}</span>
      <span className="w-8 shrink-0 font-mono text-xs font-semibold">{value}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${String(pct)}%` }} />
      </div>
    </div>
  );
}

interface PokemonDetailPanelProps {
  detail: PokemonDetail | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function PokemonDetailPanel({ detail, isLoading, isError }: PokemonDetailPanelProps) {
  const { t } = useTranslation("pokedex");

  const getStatLabel = (statName: string): string => {
    switch (statName) {
      case "hp":
        return t(($) => $.POKEDEX_STAT_HP);
      case "attack":
        return t(($) => $.POKEDEX_STAT_ATTACK);
      case "defense":
        return t(($) => $.POKEDEX_STAT_DEFENSE);
      case "special-attack":
        return t(($) => $.POKEDEX_STAT_SPECIAL_ATTACK);
      case "special-defense":
        return t(($) => $.POKEDEX_STAT_SPECIAL_DEFENSE);
      case "speed":
        return t(($) => $.POKEDEX_STAT_SPEED);
      default:
        return statName;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center gap-2 text-muted-foreground">
        <Spinner size="md" />
        <span>{t(($) => $.POKEDEX_LOADING)}</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-destructive">
        {t(($) => $.POKEDEX_ERROR_STATE)}
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="flex h-48 items-center justify-center px-4 text-center text-sm text-muted-foreground">
        {t(($) => $.POKEDEX_DETAIL_EMPTY)}
      </div>
    );
  }

  return (
    <Card className="gap-4 py-4">
      <CardHeader className="px-5 pb-0">
        <div className="flex items-center gap-4">
          <img src={detail.imageUrl} alt={detail.name} className="size-24 object-contain" />
          <div>
            <CardTitle className="mb-1 text-xl capitalize">{detail.name}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {t(($) => $.POKEDEX_ID_LABEL, { id: String(detail.id) })}
            </span>
            <div className="mt-2 flex flex-wrap gap-1">
              {detail.types.map((type) => (
                <PokemonTypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-5">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="mb-1 text-xs text-muted-foreground">{t(($) => $.POKEDEX_HEIGHT_LABEL)}</p>
            <p className="font-semibold">
              {t(($) => $.POKEDEX_HEIGHT_VALUE, {
                value: detail.height.toFixed(1),
              })}
            </p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="mb-1 text-xs text-muted-foreground">{t(($) => $.POKEDEX_WEIGHT_LABEL)}</p>
            <p className="font-semibold">
              {t(($) => $.POKEDEX_WEIGHT_VALUE, {
                value: detail.weight.toFixed(1),
              })}
            </p>
          </div>
        </div>

        {detail.abilities.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t(($) => $.POKEDEX_ABILITIES_LABEL)}
            </p>
            <div className="flex flex-wrap gap-1">
              {detail.abilities.map((ability) => (
                <span key={ability} className="rounded-full bg-muted px-2.5 py-1 text-xs capitalize">
                  {ability}
                </span>
              ))}
            </div>
          </div>
        )}

        {detail.stats.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t(($) => $.POKEDEX_STATS_LABEL)}
            </p>
            <div className="space-y-2">
              {detail.stats.map((stat) => (
                <StatBar key={stat.name} label={getStatLabel(stat.name)} value={stat.baseStat} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

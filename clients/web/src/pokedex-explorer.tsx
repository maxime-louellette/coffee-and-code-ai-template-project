import { Button } from "@design-system/components/ui/button";
import { Input } from "@design-system/components/ui/input";
import { Spinner } from "@design-system/components/ui/spinner";
import { type KeyboardEvent, startTransition, useState } from "react";
import { useTranslation } from "react-i18next";

import type { PokemonSummary } from "./pokedex-types";

import { PokemonCard } from "./pokemon-card";
import { PokemonDetailPanel } from "./pokemon-detail-panel";
import { usePokemonDetail } from "./use-pokemon-detail";
import { usePokemonSearch } from "./use-pokemon-search";

export function PokedexExplorer() {
  const { t } = useTranslation("pokedex");
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonSummary | null>(null);

  const searchResult = usePokemonSearch(submittedQuery);
  const detailResult = usePokemonDetail(selectedPokemon?.name ?? null);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    startTransition(() => {
      setSubmittedQuery(trimmed);
      setSelectedPokemon(null);
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      {/* Search bar */}
      <div className="flex gap-2 lg:col-span-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t(($) => $.POKEDEX_SEARCH_PLACEHOLDER)}
          aria-label={t(($) => $.POKEDEX_SEARCH_LABEL)}
          className="flex-1"
        />
        <Button type="button" onClick={handleSearch} disabled={searchResult.isFetching} className="shrink-0 gap-2">
          {searchResult.isFetching ? <Spinner size="sm" className="text-primary-foreground" /> : null}
          {t(($) => $.POKEDEX_SEARCH_BUTTON)}
        </Button>
      </div>

      {/* Results grid */}
      <div>
        {searchResult.isLoading && (
          <div className="flex h-40 items-center justify-center gap-2 text-muted-foreground">
            <Spinner size="md" />
            <span>{t(($) => $.POKEDEX_LOADING)}</span>
          </div>
        )}

        {searchResult.isError && (
          <div className="flex h-40 items-center justify-center text-sm text-destructive">
            {t(($) => $.POKEDEX_ERROR_STATE)}
          </div>
        )}

        {searchResult.isSuccess && searchResult.data.length === 0 && submittedQuery && (
          <div className="flex h-40 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            {t(($) => $.POKEDEX_NOT_FOUND, { query: submittedQuery })}
          </div>
        )}

        {searchResult.isSuccess && searchResult.data.length === 0 && !submittedQuery && (
          <div className="flex h-40 items-center justify-center px-4 text-center text-sm text-muted-foreground">
            {t(($) => $.POKEDEX_EMPTY_STATE)}
          </div>
        )}

        {searchResult.isSuccess && searchResult.data.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
            {searchResult.data.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isSelected={selectedPokemon?.id === pokemon.id}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail panel */}
      <div>
        <PokemonDetailPanel
          detail={detailResult.data}
          isLoading={detailResult.isLoading}
          isError={detailResult.isError}
        />
      </div>
    </div>
  );
}

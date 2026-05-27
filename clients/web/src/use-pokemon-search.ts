import { useQuery } from "@tanstack/react-query";

import { searchPokemon } from "./pokedex-api-client";

export function usePokemonSearch(query: string) {
  return useQuery({
    queryKey: ["pokemon", "search", query],
    queryFn: () => searchPokemon(query),
    enabled: query.trim().length > 0,
    retry: false,
  });
}

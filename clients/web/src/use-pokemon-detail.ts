import { useQuery } from "@tanstack/react-query";

import { getPokemonDetail } from "./pokedex-api-client";

export function usePokemonDetail(nameOrId: string | null) {
  return useQuery({
    queryKey: ["pokemon", "detail", nameOrId],
    queryFn: () => {
      if (!nameOrId) throw new Error("No pokemon selected");
      return getPokemonDetail(nameOrId);
    },
    enabled: nameOrId !== null,
    retry: false,
  });
}

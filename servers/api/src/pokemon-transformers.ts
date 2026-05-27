import type { PokemonDetail, PokemonSummary } from "@shared/pokemon-types";

import type { PokeApiPokemon } from "./poke-api-client";

function getOfficialArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function toPokemonSummary(raw: PokeApiPokemon): PokemonSummary {
  return {
    id: raw.id,
    name: raw.name,
    imageUrl: raw.sprites.front_default ?? getOfficialArtworkUrl(raw.id),
    types: raw.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name),
  };
}

export function toPokemonDetail(raw: PokeApiPokemon): PokemonDetail {
  return {
    ...toPokemonSummary(raw),
    height: (raw.height ?? 0) / 10,
    weight: (raw.weight ?? 0) / 10,
    stats: raw.stats.map((s) => ({
      name: s.stat.name,
      baseStat: s.base_stat,
    })),
    abilities: raw.abilities.map((a) => a.ability.name),
  };
}

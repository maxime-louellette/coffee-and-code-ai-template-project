export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonSummary {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

export interface PokemonDetail extends PokemonSummary {
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: string[];
}

import { z } from "zod";

const pokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: z.object({ name: z.string(), url: z.string() }),
});

const pokemonApiSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number().nullable().optional(),
  weight: z.number().nullable().optional(),
  sprites: z.object({ front_default: z.string().nullable().optional() }).passthrough(),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string(), url: z.string() }),
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  stats: z.array(pokemonStatSchema),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string(), url: z.string() }),
    }),
  ),
});

export type PokeApiPokemon = z.infer<typeof pokemonApiSchema>;

const POKE_API_BASE = "https://pokeapi.co";

export async function fetchPokemon(nameOrId: string | number): Promise<PokeApiPokemon | null> {
  const response = await fetch(`${POKE_API_BASE}/api/v2/pokemon/${nameOrId}`);

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`PokeAPI error: ${String(response.status)}`);
  }

  const json: unknown = await response.json();
  return pokemonApiSchema.parse(json);
}

import type { PokemonDetail, PokemonSummary } from "./pokedex-types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Expected "${field}" to be a string`);
  }
}

function assertNumber(value: unknown, field: string): asserts value is number {
  if (typeof value !== "number") {
    throw new Error(`Expected "${field}" to be a number`);
  }
}

function parsePokemonSummary(value: unknown): PokemonSummary {
  if (!isRecord(value)) throw new Error("Expected pokemon to be an object");
  const { id, name, imageUrl, types } = value;

  assertNumber(id, "id");
  assertString(name, "name");
  assertString(imageUrl, "imageUrl");

  if (!Array.isArray(types)) throw new Error("Expected types to be an array");
  const parsedTypes: string[] = types.map((t) => {
    assertString(t, "type element");
    return t;
  });

  return { id, name, imageUrl, types: parsedTypes };
}

function parsePokemonDetail(value: unknown): PokemonDetail {
  if (!isRecord(value)) throw new Error("Expected pokemon detail to be an object");
  const { id, name, imageUrl, types, height, weight, stats, abilities } = value;

  assertNumber(id, "id");
  assertString(name, "name");
  assertString(imageUrl, "imageUrl");
  assertNumber(height, "height");
  assertNumber(weight, "weight");

  if (!Array.isArray(types)) throw new Error("Expected types to be an array");
  const parsedTypes: string[] = types.map((t) => {
    assertString(t, "type element");
    return t;
  });

  if (!Array.isArray(abilities)) throw new Error("Expected abilities to be an array");
  const parsedAbilities: string[] = abilities.map((a) => {
    assertString(a, "ability element");
    return a;
  });

  if (!Array.isArray(stats)) throw new Error("Expected stats to be an array");
  const parsedStats = stats.map((s) => {
    if (!isRecord(s)) throw new Error("Expected stat to be an object");
    const { name: statName, baseStat } = s;
    assertString(statName, "stat.name");
    assertNumber(baseStat, "stat.baseStat");
    return { name: statName, baseStat };
  });

  return {
    id,
    name,
    imageUrl,
    types: parsedTypes,
    height,
    weight,
    stats: parsedStats,
    abilities: parsedAbilities,
  };
}

export async function searchPokemon(query: string): Promise<PokemonSummary[]> {
  const url = new URL(`${API_BASE}/pokemon/search`);
  url.searchParams.set("q", query);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Search request failed: ${String(response.status)}`);
  }

  const data: unknown = await response.json();

  if (!isRecord(data)) throw new Error("Invalid search response");

  const { results } = data;
  if (!Array.isArray(results)) throw new Error("Invalid search results");

  return results.map(parsePokemonSummary);
}

export async function getPokemonDetail(nameOrId: string): Promise<PokemonDetail> {
  const response = await fetch(`${API_BASE}/pokemon/${encodeURIComponent(nameOrId)}`);

  if (response.status === 404) {
    throw new Error("not_found");
  }

  if (!response.ok) {
    throw new Error(`Detail request failed: ${String(response.status)}`);
  }

  const data: unknown = await response.json();
  return parsePokemonDetail(data);
}

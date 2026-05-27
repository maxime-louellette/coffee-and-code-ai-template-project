import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { fetchPokemon } from "./poke-api-client";
import { toPokemonDetail, toPokemonSummary } from "./pokemon-transformers";

export const pokemonRoutes = new Hono()
  .get("/search", zValidator("query", z.object({ q: z.string().min(1) })), async (c) => {
    const { q } = c.req.valid("query");

    try {
      const raw = await fetchPokemon(q.toLowerCase().trim());

      if (!raw) {
        return c.json({ results: [] });
      }

      return c.json({ results: [toPokemonSummary(raw)] });
    } catch {
      return c.json({ error: "Failed to reach Pokémon API" }, 502);
    }
  })
  .get("/:nameOrId", async (c) => {
    const nameOrId = c.req.param("nameOrId");

    try {
      const raw = await fetchPokemon(nameOrId.toLowerCase().trim());

      if (!raw) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(toPokemonDetail(raw));
    } catch {
      return c.json({ error: "Failed to reach Pokémon API" }, 502);
    }
  });

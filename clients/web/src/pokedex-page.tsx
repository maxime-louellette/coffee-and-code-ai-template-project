import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { PokedexExplorer } from "./pokedex-explorer";

export function PokedexPage() {
  const { t } = useTranslation("pokedex");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← {t(($) => $.POKEDEX_BACK_HOME)}
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="text-base font-semibold">{t(($) => $.POKEDEX_TITLE)}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-1 text-3xl font-bold tracking-tight">{t(($) => $.POKEDEX_TITLE)}</h2>
          <p className="text-muted-foreground">{t(($) => $.POKEDEX_SUBTITLE)}</p>
        </div>

        <PokedexExplorer />
      </main>
    </div>
  );
}

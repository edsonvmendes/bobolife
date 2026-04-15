"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminDirectiveRecord, AdminDirectiveType, SystemStateRecord } from "@/lib/types";
import { formatRelativePulse } from "@/lib/utils";

interface AdminConsoleProps {
  initialDirectives: AdminDirectiveRecord[];
  systemState: SystemStateRecord;
}

const directiveLabels: Record<AdminDirectiveType, string> = {
  whisper: "Cochicho",
  theme: "Tema",
};

const directiveStatusLabels: Record<AdminDirectiveRecord["status"], string> = {
  pending: "Pendente",
  used: "Usado",
  archived: "Arquivado",
};

export function AdminConsole({
  initialDirectives,
  systemState,
}: AdminConsoleProps) {
  const [directives, setDirectives] = useState(initialDirectives);
  const [currentSystemState, setCurrentSystemState] = useState(systemState);
  const [directiveType, setDirectiveType] = useState<AdminDirectiveType>("whisper");
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [priority, setPriority] = useState(3);
  const [isSaving, setIsSaving] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const pendingCount = useMemo(
    () => directives.filter((directive) => directive.status === "pending").length,
    [directives],
  );

  async function refreshDirectives() {
    const response = await fetch("/api/admin/directives", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Nao foi possivel atualizar a mesa editorial.");
    }

    const data = (await response.json()) as {
      directives: AdminDirectiveRecord[];
      systemState: SystemStateRecord;
    };
    setDirectives(data.directives);
    setCurrentSystemState(data.systemState);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const response = await fetch("/api/admin/directives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        directiveType,
        title,
        prompt,
        priority,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const data = (await response.json().catch(() => ({ error: "Falha ao criar item editorial." }))) as {
        error?: string;
      };
      setFeedback(data.error ?? "Falha ao criar item editorial.");
      return;
    }

    const data = (await response.json()) as { directive: AdminDirectiveRecord };
    setDirectives((current) => [data.directive, ...current]);
    setTitle("");
    setPrompt("");
    setPriority(3);
    setFeedback("Item adicionado. Ele entra no proximo pulso do simulador.");
  }

  async function handleForceTick() {
    setIsTriggering(true);
    setFeedback(null);

    const response = await fetch("/api/simulation/tick", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ force: true }),
    });

    setIsTriggering(false);

    if (!response.ok) {
      setFeedback("Nao consegui executar um pulso agora.");
      return;
    }

    await refreshDirectives().catch(() => null);
    setFeedback("Pulso executado. O Bob acabou de absorver o que estava na fila.");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1240px] flex-col gap-4 px-3 py-3 lg:p-5">
      <header className="glass-panel rounded-[2rem] border border-white/8 px-6 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
              Operacao Editorial
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Mesa Editorial</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Esta area fica fora do fluxo publico. Aqui o operador pode plantar um
              cochicho, puxar um tema novo e ajustar o rumo da simulacao sem
              aparecer para quem so esta lendo a inbox.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/chats"
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:bg-white/6 hover:text-white"
            >
              Abrir Inbox
            </Link>
            <button
              type="button"
              onClick={handleForceTick}
              disabled={isTriggering}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 disabled:opacity-60"
            >
              {isTriggering ? "Rodando..." : "Executar Pulso"}
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[420px_1fr]">
        <div className="glass-panel rounded-[2rem] border border-white/8 p-5">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Ultimo pulso
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {formatRelativePulse(currentSystemState.last_simulation_tick)}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Na fila
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">{pendingCount}</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Ferramenta
              </p>
              <div className="flex gap-2">
                {(["whisper", "theme"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setDirectiveType(value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      directiveType === value
                        ? "bg-[var(--accent)] text-slate-950"
                        : "border border-white/10 text-[var(--muted)] hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    {directiveLabels[value]}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Titulo curto
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                placeholder={
                  directiveType === "whisper"
                    ? "Ex: lembra do livro emprestado"
                    : "Ex: gincana da escola"
                }
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Briefing
              </span>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={5}
                className="w-full rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30"
                placeholder={
                  directiveType === "whisper"
                    ? "Faz o Bob ficar pensando nisso, sem parecer ordem direta."
                    : "Tema que pode atravessar grupos, recados ou conversas casuais."
                }
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Prioridade
              </span>
              <input
                type="range"
                min={1}
                max={5}
                value={priority}
                onChange={(event) => setPriority(Number(event.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="mt-2 text-sm text-[var(--muted)]">{priority} de 5</div>
            </label>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-[1.2rem] bg-white px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
            >
              {isSaving ? "Salvando..." : "Enviar para a fila do Bob"}
            </button>
          </form>

          {feedback ? (
            <p className="mt-4 rounded-[1.2rem] border border-white/8 bg-white/5 px-4 py-3 text-sm text-[var(--muted)]">
              {feedback}
            </p>
          ) : null}
        </div>

        <div className="glass-panel rounded-[2rem] border border-white/8 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                Fila editorial
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Cochichos e temas recentes
              </h2>
            </div>
            <button
              type="button"
              onClick={() => void refreshDirectives()}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:bg-white/6 hover:text-white"
            >
              Atualizar
            </button>
          </div>

          <div className="space-y-3">
            {directives.length === 0 ? (
              <div className="rounded-[1.4rem] border border-dashed border-white/10 bg-white/4 px-5 py-6 text-sm leading-7 text-[var(--muted)]">
                Nenhum item ainda. Esta tela existe para inserir atualidade,
                memorias, pistas e temas novos sem misturar essa operacao com a
                experiencia de leitura da inbox.
              </div>
            ) : (
              directives.map((directive) => (
                <article
                  key={directive.id}
                  className="rounded-[1.4rem] border border-white/8 bg-white/5 px-5 py-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-950">
                      {directiveLabels[directive.directive_type]}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      {directiveStatusLabels[directive.status]}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">
                      prioridade {directive.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{directive.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {directive.prompt}
                  </p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    criado {formatRelativePulse(directive.created_at)}
                    {directive.used_at ? ` | usado ${formatRelativePulse(directive.used_at)}` : ""}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

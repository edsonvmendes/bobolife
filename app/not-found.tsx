import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel w-full max-w-md rounded-[2rem] border border-white/10 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
          Bob Inbox
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Chat not found</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          This conversation does not exist in Bob&apos;s orbit yet.
        </p>
        <Link
          href="/chats"
          className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Back to inbox
        </Link>
      </div>
    </main>
  );
}

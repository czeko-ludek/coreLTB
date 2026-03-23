import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background-light min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-bold text-zinc-200 mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
          Strona nie została znaleziona
        </h1>
        <p className="text-zinc-600 mb-10 leading-relaxed">
          Przepraszamy, ale strona której szukasz nie istnieje lub została
          przeniesiona. Sprawdź adres URL lub skorzystaj z poniższych linków.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Strona główna
          </Link>
          <Link
            href="/projekty"
            className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Projekty domów
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-50 transition-colors"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </main>
  );
}

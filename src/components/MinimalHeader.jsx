import { Link } from "react-router-dom";

export default function MinimalHeader({ linkHome = true }) {
  const brand = (
    <>
      Jeremy Galloway <span className="text-seafoam">Fitness</span>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-3">
        {linkHome ? (
          <Link
            to="/"
            className="text-base font-semibold tracking-tight text-white transition-colors hover:text-seafoam sm:text-lg"
          >
            {brand}
          </Link>
        ) : (
          <span className="text-base font-semibold tracking-tight text-white sm:text-lg">
            {brand}
          </span>
        )}
      </div>
    </header>
  );
}

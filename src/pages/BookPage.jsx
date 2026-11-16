import { useEffect } from "react";
import { Link } from "react-router-dom";
import MinimalHeader from "../components/MinimalHeader.jsx";
import LeadForm from "../components/LeadForm.jsx";

export default function BookPage() {
  useEffect(() => {
    document.title = "Book Your Free Consult | Jeremy Galloway Fitness";
  }, []);

  return (
    <div className="min-h-screen bg-ink font-sans text-white antialiased">
      <MinimalHeader linkHome={false} />

      <main className="mx-auto max-w-lg px-6 pb-16 pt-4 sm:pt-8">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          Training that{" "}
          <span className="text-seafoam">comes to you.</span>
        </h1>
        <p className="mt-2 text-sm text-gray-300 sm:text-lg">
          Your home, your building&apos;s gym, or your office. Book your free
          consult.
        </p>
        <p className="mt-1.5 text-xs text-gray-400 sm:text-sm">
          ⭐ 5-star rated on Google · 90-day results guarantee
        </p>

        <div className="mt-4">
          <LeadForm formSource="book" />
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          <Link to="/privacy" className="transition-colors hover:text-gray-400">
            Privacy Policy
          </Link>
        </p>

        <div className="mt-10 space-y-6 border-t border-white/10 pt-8">
          <blockquote className="text-base text-gray-300">
            <p className="text-amber-400" aria-label="5 star rating">
              ★★★★★
            </p>
            <p className="mt-2">
              “Jeremy is very professional and has a great knowledge of the body
              and how it works. I have been a physical therapist for 40 years and
              he has taught me how to better train my body. Since working with
              him I have become stronger and lost 80 pounds. I highly recommend
              using him.”
            </p>
            <footer className="mt-2 text-sm text-seafoam">
              — Rose R., via Google
            </footer>
          </blockquote>
          <blockquote className="text-base text-gray-300">
            <p className="text-amber-400" aria-label="5 star rating">
              ★★★★★
            </p>
            <p className="mt-2">
              “When I first started with Jeremy, I was 120 pounds. I’ve been
              skinny my whole life, and I was intimidated, I was a complete
              beginner with training like this, and I didn’t know where to start
              but I knew it was time for me to gain some weight…”
            </p>
            <footer className="mt-2 text-sm text-seafoam">
              — Austin P., via Google
            </footer>
          </blockquote>
          <p className="text-sm text-gray-400">
            Show up to every session for 90 days. No results? I&apos;ll keep
            training you for free until you do.
          </p>
        </div>
      </main>
    </div>
  );
}

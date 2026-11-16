import { useEffect } from "react";
import { Link } from "react-router-dom";
import MinimalHeader from "../components/MinimalHeader.jsx";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Jeremy Galloway Fitness";
  }, []);

  return (
    <div className="min-h-screen bg-ink font-sans text-white antialiased">
      <MinimalHeader />

      <main className="mx-auto max-w-prose px-6 pb-16 pt-10 sm:pt-14">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-400">
          Effective date: November 15, 2026
        </p>
        <p className="mt-6 text-base text-gray-300">
          This privacy policy explains how Jeremy Galloway Fitness LLC (New
          Jersey) collects, uses, and shares information when you use our
          website and related services.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Information we collect
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-gray-300">
            <li>
              Through our forms: name, phone number, email address, fitness
              goal, and zip code.
            </li>
            <li>Through Calendly: booking information for scheduling consults.</li>
            <li>
              Cookies and advertising tags, including Meta Pixel and Google Ads
              tags.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            How we use your information
          </h2>
          <p className="mt-4 text-base text-gray-300">
            We use this information to respond to inquiries, schedule consults,
            provide training services, and measure and improve advertising.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            How we share information
          </h2>
          <p className="mt-4 text-base text-gray-300">
            We share information only with service providers such as Google,
            Meta, and Calendly to operate the site and ads. We do not sell
            personal information.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Text messaging</h2>
          <p className="mt-4 text-base text-gray-300">
            Mobile numbers and SMS opt-in consent will not be shared with or sold
            to third parties for marketing purposes. Message frequency varies.
            Msg &amp; data rates may apply. Reply STOP to opt out, or HELP for
            help.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Cookies and ad personalization
          </h2>
          <p className="mt-4 text-base text-gray-300">
            We use cookies and similar technologies, including Meta Pixel and
            Google Ads tags, to measure and improve advertising. You can opt out
            of ad personalization through your browser settings and the opt-out
            tools provided by Google and Meta.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">
            Access and deletion requests
          </h2>
          <p className="mt-4 text-base text-gray-300">
            To request access to or deletion of your personal information, email{" "}
            <a
              href="mailto:jeremy@jeremygallowayfitness.com"
              className="text-seafoam transition-colors hover:text-seafoam-dark"
            >
              jeremy@jeremygallowayfitness.com
            </a>
            .
          </p>
        </section>

        <p className="mt-12 text-sm text-gray-500">
          <Link
            to="/"
            className="transition-colors hover:text-seafoam"
          >
            Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}

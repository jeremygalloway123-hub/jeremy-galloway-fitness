import { useState } from "react";
import headshot from "./assets/jeremy-headshot.png";

const EMAIL = "jeremygalloway123@gmail.com";
const PHONE = "508-395-1104";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          Jeremy Galloway <span className="text-seafoam">Fitness</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gray-300 transition-colors hover:text-seafoam"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-200 transition-colors hover:text-seafoam md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-white/10 bg-ink px-6 py-3 text-sm font-medium md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-seafoam"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-28"
    >
      <div className="flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-2 md:gap-12">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Personal Training That{" "}
            <span className="text-seafoam">Comes to You</span>
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:mt-5 sm:text-lg">
            In-home, gym, and outdoor sessions
          </p>
          <a
            href="#contact"
            className="mt-7 inline-block rounded-md bg-seafoam px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-seafoam-dark sm:mt-8"
          >
            Book a Free Consult
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={headshot}
            alt="Jeremy Galloway, personal trainer"
            className="w-full max-w-xs rounded-2xl object-cover shadow-2xl shadow-black/40 sm:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-ink-soft px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          About
        </h2>
        <div className="mt-6 space-y-4 text-base text-gray-300 sm:text-lg">
          <p>
            Jeremy is a NASM certified personal trainer who has worked in
            commercial and non profit gym environments, as well as years of
            one-on-one private training. He sets himself apart with his
            programming ability, developing custom training programs for clients
            of all levels, fully editable in google sheets with linked technique
            videos and exercise substitutions included in each one. His
            adaptability makes him a good trainer for so many different people.
          </p>
          <p>
            Over the years Jeremy has developed a sharp instinct for when to
            push, when to pull back, and when to simply reassure, because he
            knows that most people don't struggle from lack of effort, but from
            goals that are too vague, unrealistic, or impossible to measure. He's
            a firm believer in SMART goal setting and brings that structure to
            every client relationship.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-soft p-6 transition-colors hover:border-seafoam/40 sm:p-8">
      <h3 className="text-2xl font-semibold text-seafoam sm:text-3xl">{title}</h3>
      <p className="mt-4 text-base text-gray-300 sm:text-lg">{children}</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="px-6 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Services
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <ServiceCard title="1-on-1 Training">
            In-home, at the gym, and outdoor personal training for all levels
            and goals. Cues for technique, programming, and accountability
            tailored to you.
          </ServiceCard>
          <ServiceCard title="Custom Training Programs">
            Personalized programs delivered via Google Sheets, complete with
            linked exercise technique videos. Specific to your goals, schedule,
            and enjoyment.
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}

const MUSICIAN_BENEFITS = [
  "Custom programs designed to adapt around gigs and rehearsals",
  "Posture correction and core strengthening",
  "Muscle Imbalance Correction",
  "Back, Neck, Shoulder, Elbow, and Wrist Health",
  "Weight Loss / Body Composition",
];

function Musicians() {
  return (
    <section
      id="musicians"
      className="border-t border-white/10 bg-ink-soft px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-seafoam sm:text-4xl md:text-5xl">
          Training Built for Musicians
        </h2>
        <p className="mt-4 text-center text-base text-gray-300 sm:text-lg">
          A unique approach for a unique lifestyle.
        </p>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-seafoam" />
        <p className="mt-8 text-base text-gray-300 sm:text-lg">
          As a professional guitarist and NASM Certified Personal Trainer, I know
          how long practice sessions, repetitive motion, 3-hour standing
          performances, and irregular gig and work schedules can put stress on
          your body. I design a training approach that works with your life, not
          against it. Whether you have 1 day a week or five, I can build you a
          program that fits your schedule, makes you stronger, more mobile, and
          healthier, so you can look and feel better on and off stage.
        </p>
        <ul className="mt-8 space-y-3">
          {MUSICIAN_BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-r-md border-l-2 border-seafoam bg-white/5 py-2 pl-4 text-base text-gray-200 sm:text-lg"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SAMPLE_PROGRAM_ID =
  "1q1NyaQL3mAJpvk3ByLPCt--yh6gYXcaDuD8jpRcUYzQ";
const SAMPLE_PROGRAM_URL = `https://docs.google.com/spreadsheets/d/${SAMPLE_PROGRAM_ID}/edit?usp=sharing`;
const SAMPLE_PROGRAM_PREVIEW = `https://docs.google.com/spreadsheets/d/${SAMPLE_PROGRAM_ID}/preview`;

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-white/10 bg-ink-soft px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          See How It Works
        </h2>
        <p className="mt-6 text-base text-gray-300 sm:text-lg">
          Every program is built around your specific goals, schedule, and
          ability level. Here's a real example — a 3-day hypertrophy and strength
          program complete with linked technique videos, coaching notes, exercise
          substitutions, and weekly tracking boxes for progressive overload.
        </p>
        <div className="mt-8 h-[280px] overflow-hidden rounded-xl border border-white/10 bg-ink sm:h-[345px]">
          <iframe
            src={SAMPLE_PROGRAM_PREVIEW}
            title="Sample 3-day hypertrophy and strength program"
            loading="lazy"
            className="block h-[320px] w-full sm:h-[385px]"
            style={{ filter: "invert(0.9) hue-rotate(180deg) brightness(1.05)" }}
          />
        </div>
        <a
          href={SAMPLE_PROGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-md bg-seafoam px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-seafoam-dark"
        >
          View Sample Program
        </a>
      </div>
    </section>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykanpay";

function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-ink px-4 py-3 text-white placeholder-gray-500 focus:border-seafoam focus:outline-none focus:ring-1 focus:ring-seafoam";

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-ink-soft px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Contact
        </h2>
        <p className="mt-3 text-center text-gray-300">
          Send a message to book your free consult.
        </p>

        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Message"
              className={fieldClass}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-md bg-seafoam px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-seafoam-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Submit"}
            </button>
          </div>
          {status === "success" && (
            <p className="text-sm text-seafoam">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-300">
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-seafoam"
          >
            {EMAIL}
          </a>
          <span className="text-gray-600">|</span>
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="transition-colors hover:text-seafoam"
          >
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans text-white antialiased">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Musicians />
        <HowItWorks />
        <Contact />
      </main>
      <footer className="border-t border-white/10 px-6 py-8">
        <p className="mx-auto max-w-6xl text-sm text-gray-500">
          © {new Date().getFullYear()} Jeremy Galloway Fitness — Hartford, CT
        </p>
      </footer>
    </div>
  );
}

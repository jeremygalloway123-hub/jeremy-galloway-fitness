import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MinimalHeader from "../components/MinimalHeader.jsx";
import { trackLead, trackSchedule } from "../lib/tracking.js";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_EVENT_URL =
  "https://calendly.com/jeremygallowayfitness/free-consult-call";

function handleCalendlyScheduled() {
  trackSchedule();
}

function buildCalendlyUrl() {
  const url = new URL(CALENDLY_EVENT_URL);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("hide_event_type_details", "1");
  url.searchParams.set("background_color", "0a0c0b");
  url.searchParams.set("text_color", "ffffff");
  url.searchParams.set("primary_color", "5fd9b0");
  return url.toString();
}

function loadCalendlyScript() {
  if (typeof window !== "undefined" && window.Calendly) {
    return Promise.resolve();
  }

  const existing = document.querySelector(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Calendly")),
        { once: true }
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Calendly"));
    document.body.appendChild(script);
  });
}

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const widgetRef = useRef(null);
  const initStartedRef = useRef(false);
  const [booked, setBooked] = useState(false);

  const firstName =
    typeof location.state?.firstName === "string"
      ? location.state.firstName.trim()
      : "";
  const name =
    typeof location.state?.name === "string" ? location.state.name.trim() : "";
  const email =
    typeof location.state?.email === "string" ? location.state.email.trim() : "";

  useEffect(() => {
    document.title = "Thanks! | Jeremy Galloway Fitness";
  }, []);

  useEffect(() => {
    const submissionId =
      typeof location.state?.submissionId === "string"
        ? location.state.submissionId
        : "";
    if (!submissionId) return;

    let alreadyTracked = false;
    try {
      alreadyTracked =
        sessionStorage.getItem(`leadTracked:${submissionId}`) === "1";
    } catch {
      alreadyTracked = false;
    }

    if (!alreadyTracked) {
      trackLead(submissionId);
      try {
        sessionStorage.setItem(`leadTracked:${submissionId}`, "1");
      } catch {
        // ignore quota / private mode
      }
    }

    navigate(location.pathname, {
      replace: true,
      state: { ...location.state, submissionId: undefined },
    });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return undefined;

    let cancelled = false;

    // StrictMode: skip a second overlapping init while the first is still live
    if (initStartedRef.current) {
      return undefined;
    }
    initStartedRef.current = true;

    const prefill = {};
    if (name) prefill.name = name;
    if (email) prefill.email = email;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.Calendly) return;
        widgetRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: buildCalendlyUrl(),
          parentElement: widgetRef.current,
          prefill,
        });
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
        });
      })
      .catch(() => {
        initStartedRef.current = false;
      });

    const onMessage = (e) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        handleCalendlyScheduled();
        setBooked(true);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      cancelled = true;
      initStartedRef.current = false;
      window.removeEventListener("message", onMessage);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [name, email]);

  return (
    <div className="min-h-screen bg-ink font-sans text-white antialiased">
      <MinimalHeader />

      <main className="mx-auto max-w-lg px-6 pb-16 pt-10 sm:pt-14">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {firstName ? `Got it, ${firstName}!` : "Got it!"}
        </h1>
        <p className="mt-4 text-base text-gray-300 sm:text-lg">
          I&apos;ll reach out within 24 hours. Want to lock in a time now? Pick
          one below.
        </p>

        {booked && (
          <p className="mt-6 text-sm font-medium text-seafoam">
            You&apos;re booked! Check your email for the details.
          </p>
        )}

        <div
          ref={widgetRef}
          className="mt-10 h-[700px] w-full min-w-[320px] sm:h-[750px]"
        />

        <p className="mt-8 text-center text-xs text-gray-500">
          <Link to="/privacy" className="transition-colors hover:text-gray-400">
            Privacy Policy
          </Link>
        </p>
      </main>
    </div>
  );
}

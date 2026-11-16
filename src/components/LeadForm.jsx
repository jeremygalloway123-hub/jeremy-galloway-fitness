import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitLead } from "../lib/submitLead.js";

const GOAL_OPTIONS = [
  "Lose fat",
  "Build muscle",
  "Lose fat & build muscle",
  "Move better / less stiffness",
  "General fitness",
  "Other",
];

const fieldBase =
  "min-h-11 w-full rounded-md border border-white/15 bg-ink px-3.5 py-2.5 placeholder-gray-500 focus:border-seafoam focus:outline-none focus:ring-1 focus:ring-seafoam";

const fieldClass = `${fieldBase} text-white`;

const labelClass = "mb-0.5 block text-xs font-medium text-gray-300";

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function normalizePhoneDigits(value) {
  let digits = digitsOnly(value);
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function formatPhone(digits) {
  const d = digits.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function caretPosForDigitIndex(formatted, digitIndex) {
  if (digitIndex <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i])) {
      seen += 1;
      if (seen >= digitIndex) return i + 1;
    }
  }
  return formatted.length;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function getFirstName(fullName) {
  const trimmed = String(fullName || "").trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0];
}

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  const phoneDigits = digitsOnly(form.phone);
  if (!phoneDigits) {
    errors.phone = "Please enter your phone number.";
  } else if (phoneDigits.length !== 10) {
    errors.phone = "Enter a 10-digit US phone number.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.goal) {
    errors.goal = "Please select your main goal.";
  }

  const zipDigits = digitsOnly(form.zip);
  if (!zipDigits) {
    errors.zip = "Please enter your zip code.";
  } else if (zipDigits.length !== 5) {
    errors.zip = "Enter a 5-digit zip code.";
  }

  return errors;
}

export default function LeadForm({ formSource, showMessage = false }) {
  const navigate = useNavigate();
  const idPrefix = formSource || "lead";
  const phoneInputId = `${idPrefix}-phone`;

  const utm = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      pageUrl: window.location.href,
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
    zip: "",
    message: "",
    okToText: false,
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e) => {
    const input = e.target;
    const cursor = input.selectionStart ?? 0;
    const nextRaw = input.value;
    const prevFormatted = form.phone;
    const prevDigits = digitsOnly(prevFormatted);

    let nextDigits = normalizePhoneDigits(nextRaw);
    let digitsBeforeCursor = digitsOnly(nextRaw.slice(0, cursor)).length;

    if (
      nextRaw.length < prevFormatted.length &&
      nextDigits.length === prevDigits.length &&
      digitsBeforeCursor > 0
    ) {
      nextDigits =
        nextDigits.slice(0, digitsBeforeCursor - 1) +
        nextDigits.slice(digitsBeforeCursor);
      digitsBeforeCursor -= 1;
    }

    const formatted = formatPhone(nextDigits);
    setForm((prev) => ({ ...prev, phone: formatted }));

    requestAnimationFrame(() => {
      const el = document.getElementById(phoneInputId);
      if (!el) return;
      const pos = caretPosForDigitIndex(formatted, digitsBeforeCursor);
      el.setSelectionRange(pos, pos);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const firstName = getFirstName(form.name);
    const thankYouBase = {
      firstName,
      name: form.name.trim(),
      email: form.email.trim(),
    };

    if (form.honeypot.trim()) {
      navigate("/thank-you", { state: thankYouBase });
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: digitsOnly(form.phone),
      email: form.email.trim(),
      goal: form.goal,
      zip: digitsOnly(form.zip),
      message: showMessage ? form.message.trim() : "",
      textOk: form.okToText,
      honeypot: form.honeypot,
      formSource: formSource || "",
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      pageUrl: utm.pageUrl,
    };

    setSubmitting(true);
    try {
      await submitLead(payload);
      navigate("/thank-you", {
        state: {
          ...thankYouBase,
          submissionId: crypto.randomUUID(),
        },
      });
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or text me directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5" noValidate>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor={`${idPrefix}-company_website`}>Company website</label>
        <input
          id={`${idPrefix}-company_website`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={updateField("honeypot")}
        />
      </div>

      <input type="hidden" name="utm_source" value={utm.utm_source} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
      <input type="hidden" name="pageUrl" value={utm.pageUrl} />
      <input type="hidden" name="formSource" value={formSource || ""} />

      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelClass}>
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={updateField("name")}
          className={fieldClass}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor={phoneInputId} className={labelClass}>
          Phone
        </label>
        <input
          id={phoneInputId}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(201) 555-1234"
          value={form.phone}
          onChange={handlePhoneChange}
          className={fieldClass}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-email`} className={labelClass}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={form.email}
          onChange={updateField("email")}
          className={fieldClass}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-goal`} className={labelClass}>
          Main goal
        </label>
        <select
          id={`${idPrefix}-goal`}
          name="goal"
          value={form.goal}
          onChange={updateField("goal")}
          className={`${fieldBase} ${form.goal ? "text-white" : "text-gray-500"}`}
        >
          <option value="" disabled>
            Select your goal
          </option>
          {GOAL_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-ink text-white">
              {option}
            </option>
          ))}
        </select>
        {errors.goal && (
          <p className="mt-1 text-xs text-red-400">{errors.goal}</p>
        )}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-zip`} className={labelClass}>
          Zip code
        </label>
        <input
          id={`${idPrefix}-zip`}
          name="zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="07302"
          maxLength={10}
          value={form.zip}
          onChange={updateField("zip")}
          className={fieldClass}
        />
        {errors.zip && (
          <p className="mt-1 text-xs text-red-400">{errors.zip}</p>
        )}
      </div>

      {showMessage && (
        <div>
          <label htmlFor={`${idPrefix}-message`} className={labelClass}>
            Anything else I should know?
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows={4}
            value={form.message}
            onChange={updateField("message")}
            className={fieldClass}
          />
        </div>
      )}

      <div className="flex items-start gap-2.5">
        <input
          id={`${idPrefix}-ok-to-text`}
          name="okToText"
          type="checkbox"
          checked={form.okToText}
          onChange={updateField("okToText")}
          className="mt-0.5 h-4 w-4 shrink-0 appearance-none rounded border border-white/15 bg-ink checked:border-seafoam checked:bg-seafoam checked:bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27none%27 stroke=%27%230a0c0b%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M3.5 8.5 6.5 11.5 12.5 4.5%27/%3E%3C/svg%3E')] checked:bg-[length:12px_12px] checked:bg-center checked:bg-no-repeat focus:outline-none focus:ring-1 focus:ring-seafoam"
        />
        <div>
          <label
            htmlFor={`${idPrefix}-ok-to-text`}
            className="text-sm text-gray-300"
          >
            OK to text me about my consult
          </label>
          <p className="mt-0.5 text-xs text-gray-500">
            Msg &amp; data rates may apply. Reply STOP to opt out.
          </p>
        </div>
      </div>

      <div className="pt-0.5">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-11 w-full rounded-md bg-seafoam px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-seafoam-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Book My Free Consult"}
        </button>
        <p className="mt-1.5 text-center text-xs text-gray-500">
          I&apos;ll reach out within 24 hours.
        </p>
      </div>

      {submitError && (
        <p className="text-sm text-red-400" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
    });

    if (response.ok) {
      form.reset();
      setSubmitState("sent");
      return;
    }

    const result = await response.json().catch(() => null);
    setErrorMessage(result?.error || "Message could not be sent. Please try again.");
    setSubmitState("error");
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-5 py-16 text-[#18211f]">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-sm sm:p-12">
        <Link href="/" className="text-sm font-bold uppercase tracking-[0.12em] text-[#0e7a5f]">
          Back to ResultsBreakthrough
        </Link>
        <h1 className="mt-8 text-4xl font-black">Contact Us</h1>
        <p className="mt-6 text-base leading-8 text-[#5d6d66]">
          Have a question about a productivity guide, product category, affiliate link, or workflow-shopping topic? Send a note and we will review it.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black uppercase tracking-[0.1em] text-[#40514b]">Name</span>
              <input
                required
                type="text"
                name="name"
                autoComplete="name"
                className="mt-2 min-h-12 w-full rounded-md border border-[#cbd8cf] bg-white px-4 text-base outline-none transition focus:border-[#0e7a5f] focus:ring-4 focus:ring-[#0e7a5f]/10"
              />
            </label>

            <label className="block">
              <span className="text-sm font-black uppercase tracking-[0.1em] text-[#40514b]">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="mt-2 min-h-12 w-full rounded-md border border-[#cbd8cf] bg-white px-4 text-base outline-none transition focus:border-[#0e7a5f] focus:ring-4 focus:ring-[#0e7a5f]/10"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-black uppercase tracking-[0.1em] text-[#40514b]">Subject</span>
            <input
              required
              type="text"
              name="subject"
              className="mt-2 min-h-12 w-full rounded-md border border-[#cbd8cf] bg-white px-4 text-base outline-none transition focus:border-[#0e7a5f] focus:ring-4 focus:ring-[#0e7a5f]/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-black uppercase tracking-[0.1em] text-[#40514b]">Message</span>
            <textarea
              required
              name="message"
              rows={7}
              className="mt-2 w-full resize-y rounded-md border border-[#cbd8cf] bg-white px-4 py-3 text-base outline-none transition focus:border-[#0e7a5f] focus:ring-4 focus:ring-[#0e7a5f]/10"
            />
          </label>

          {submitState === "sent" && (
            <p className="rounded-md border border-[#bde7d5] bg-[#e8f7f0] px-4 py-3 text-sm font-bold text-[#0e7a5f]">
              Message sent. Thank you.
            </p>
          )}

          {submitState === "error" && (
            <p className="rounded-md border border-[#f0c9bf] bg-[#fff0ec] px-4 py-3 text-sm font-bold text-[#9b3d2a]">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={submitState === "sending"}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#0e7a5f] px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#0a5d49] disabled:cursor-not-allowed disabled:bg-[#7fa89b] sm:w-auto"
          >
            {submitState === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </article>
    </main>
  );
}

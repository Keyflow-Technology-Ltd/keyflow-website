"use client";
import { useState } from "react";
import { Button } from "./button";
import { clsx } from "clsx";

interface EarlyAccessCTAProps {
  headline: string;
  subtext?: string;
  variant?: "light" | "dark";
}

export function EarlyAccessCTA({
  headline,
  subtext,
  variant = "light",
}: EarlyAccessCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isDark = variant === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={clsx("py-24 px-6 text-center", isDark ? "bg-brand-dark" : "bg-brand-light")}>
        <h2 className={clsx("font-display text-3xl tablet:text-5xl font-bold mb-4", isDark ? "text-brand-light" : "text-brand-dark")}>
          You&apos;re in.
        </h2>
        <p className={clsx("font-accent italic text-lg", isDark ? "text-brand-light/70" : "text-brand-dark/70")}>
          We&apos;ll be in touch soon.
        </p>
      </section>
    );
  }

  return (
    <section className={clsx("py-24 px-6 text-center", isDark ? "bg-brand-dark" : "bg-brand-light")}>
      <h2 className={clsx("font-display text-3xl tablet:text-5xl font-bold mb-4", isDark ? "text-brand-light" : "text-brand-dark")}>
        {headline}
      </h2>
      {subtext && (
        <p className={clsx("font-accent italic text-lg mb-8", isDark ? "text-brand-light/70" : "text-brand-dark/70")}>
          {subtext}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col tablet:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={clsx(
            "flex-1 font-body text-base px-5 py-3.5 rounded-full border transition-all",
            isDark
              ? "bg-transparent border-brand-light/20 text-brand-light placeholder:text-brand-light/40 focus:border-brand-accent"
              : "bg-transparent border-brand-dark/20 text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-accent",
            "focus:ring-1 focus:ring-brand-accent focus:outline-none",
          )}
        />
        <Button type="submit" disabled={status === "loading"} size="lg">
          {status === "loading" ? "Joining..." : "Get Early Access"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3 font-body">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}

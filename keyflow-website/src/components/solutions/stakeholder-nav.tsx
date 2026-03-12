"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const STAKEHOLDERS = ["Agents", "Agencies", "Developers", "Owners", "Tenants"];

export function StakeholderNav() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-wrap justify-center gap-2 tablet:gap-4 py-8">
      {STAKEHOLDERS.map((s, i) => (
        <button
          key={s}
          onClick={() => setActive(i)}
          className={`relative px-6 py-3 font-body text-sm rounded-full transition-colors ${
            active === i
              ? "text-brand-light"
              : "text-brand-dark/60 hover:text-brand-dark"
          }`}
        >
          {active === i && (
            <motion.div
              layoutId="stakeholder-pill"
              className="absolute inset-0 bg-brand-dark rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{s}</span>
        </button>
      ))}
    </div>
  );
}

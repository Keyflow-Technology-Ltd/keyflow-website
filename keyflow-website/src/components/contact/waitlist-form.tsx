"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STAKEHOLDER_TYPES = [
  { value: "", label: "I am a..." },
  { value: "agent", label: "Real Estate Agent" },
  { value: "agency", label: "Real Estate Agency" },
  { value: "developer", label: "Property Developer" },
  { value: "owner", label: "Property Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "other", label: "Other" },
];

interface FormData {
  stakeholder_type: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address";
  if (!data.stakeholder_type) errors.stakeholder_type = "Please select your role";
  return errors;
}

export function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    stakeholder_type: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function updateField(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">
          You&apos;re in.
        </h2>
        <p className="font-accent italic text-lg text-brand-dark/60">
          We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="stakeholder-type" className="font-body text-sm text-brand-dark/70 block mb-1.5">
          I am a...
        </label>
        <select
          id="stakeholder-type"
          value={formData.stakeholder_type}
          onChange={(e) => updateField("stakeholder_type", e.target.value)}
          className="w-full font-body text-base px-4 py-3 bg-transparent border border-brand-dark/20 rounded-lg transition-all focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none"
        >
          {STAKEHOLDER_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.stakeholder_type && (
          <p className="text-red-500 text-xs font-body mt-1">{errors.stakeholder_type}</p>
        )}
      </div>

      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Company"
        value={formData.company}
        onChange={(e) => updateField("company", e.target.value)}
        placeholder="Optional"
      />

      <div>
        <label htmlFor="message" className="font-body text-sm text-brand-dark/70 block mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={4}
          placeholder="Tell us about your needs (optional)"
          className="w-full font-body text-base px-4 py-3 bg-transparent border border-brand-dark/20 rounded-lg transition-all focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none placeholder:text-brand-dark/30 resize-none"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Get Early Access"}
      </Button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center font-body">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import {
  Monitor,
  MessageCircle,
  Settings,
  Calendar,
  CheckCircle,
  Loader2,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

const CONTACT_EMAIL = "contact@keyflowae.com";
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  interest: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Work email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  return errors;
}

async function submitForm(data: FormData): Promise<boolean> {
  if (!FORM_ENDPOINT) return false;

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "demo_request",
        ...data,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function openMailtoFallback(data: FormData) {
  const subject = encodeURIComponent(
    `Demo Request from ${data.firstName} ${data.lastName}${data.company ? ` — ${data.company}` : ""}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      data.company ? `Company: ${data.company}` : null,
      data.role !== "Select your role" ? `Role: ${data.role}` : null,
      data.interest !== "Select a product"
        ? `Product Interest: ${data.interest}`
        : null,
      ``,
      `This person has requested a live demo of Keyflow.`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function RequestDemoPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "Select your role",
    interest: "Select a product",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(false);

    const success = await submitForm(formData);

    if (success) {
      setIsSubmitting(false);
      setSubmitted(true);
    } else {
      // Fallback: open mail client
      openMailtoFallback(formData);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setSubmitError(!FORM_ENDPOINT);
      }, 500);
    }
  }

  if (submitted) {
    return (
      <>
        <section className="py-20 md:py-28 px-6 md:px-20">
          <div className="mx-auto max-w-[1440px] text-center">
            <SectionLabel>REQUEST A DEMO</SectionLabel>
            <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
              See Keyflow in Action
            </h1>
          </div>
        </section>
        <section className="pb-24 px-6 md:px-20">
          <div className="mx-auto max-w-xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#F0FAF0] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-[#43A047]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-3">
              {submitError
                ? "Your email client should be open"
                : "Demo Request Received"}
            </h2>
            <p className="text-[#666] mb-6">
              {submitError
                ? "Your demo request has been prepared in your default email client. Simply hit send, and we'll reach out to schedule your personalized walkthrough."
                : "Thank you for your interest in Keyflow. Our team will reach out within 24 hours to schedule your personalized walkthrough."}
            </p>
            <p className="text-sm text-[#999] mb-8">
              You can also reach us directly at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#1B1B1B] font-medium underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setSubmitError(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  company: "",
                  role: "Select your role",
                  interest: "Select a product",
                });
              }}
              className="border border-[#E0E0E0] text-[#1B1B1B] px-6 py-3 rounded-lg font-medium hover:bg-[#F8F8F8] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionLabel>REQUEST A DEMO</SectionLabel>
          <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
            See Keyflow in Action
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto">
            Book a personalized walkthrough of our platforms and discover how
            Keyflow can transform your real estate operations.
          </p>
        </div>
      </section>

      {/* Form + Benefits */}
      <section className="pb-24 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Demo Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#1B1B1B] mb-2">
              Book Your Demo
            </h2>
            <p className="text-sm text-[#666] mb-6">
              Fill in your details and we&apos;ll schedule a personalized
              walkthrough.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-[#1B1B1B] mb-2"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
                      errors.firstName
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#E0E0E0] focus:border-[#1B1B1B]"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-[#1B1B1B] mb-2"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
                      errors.lastName
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#E0E0E0] focus:border-[#1B1B1B]"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#E0E0E0] focus:border-[#1B1B1B]"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+971 XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#E0E0E0] focus:border-[#1B1B1B]"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B1B1B] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-lg px-4 py-3 text-sm text-[#666] focus:outline-none focus:border-[#1B1B1B] transition-colors bg-white"
                >
                  <option>Select your role</option>
                  <option>Property Manager</option>
                  <option>Broker / Agent</option>
                  <option>Landlord</option>
                  <option>Developer</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Product Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-lg px-4 py-3 text-sm text-[#666] focus:outline-none focus:border-[#1B1B1B] transition-colors bg-white"
                >
                  <option>Select a product</option>
                  <option>LeaseFlow</option>
                  <option>LeadsFlow</option>
                  <option>Both Products</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1B1B1B] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Demo"
                )}
              </button>
            </form>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-[#1B1B1B] mb-6">
                What to Expect
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Monitor,
                    title: "Live Product Walkthrough",
                    desc: "A guided tour of the platform tailored to your specific use case and workflows.",
                  },
                  {
                    icon: MessageCircle,
                    title: "Q&A with Our Team",
                    desc: "Get answers to your questions directly from our product specialists.",
                  },
                  {
                    icon: Settings,
                    title: "Custom Integration Plan",
                    desc: "Understand how Keyflow fits into your existing tools and systems.",
                  },
                  {
                    icon: Calendar,
                    title: "Next Steps & Timeline",
                    desc: "Walk away with a clear plan for getting started with Keyflow.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F8F8] flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-[#1B1B1B]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1B1B1B] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-[#666] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F8F8] rounded-xl p-6">
              <p className="text-sm text-[#666] leading-relaxed">
                No commitment required. Free consultation with zero obligation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

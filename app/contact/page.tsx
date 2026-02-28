"use client";

import { useState, type FormEvent } from "react";
import { Mail, Clock, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";

const CONTACT_EMAIL = "contact@keyflowae.com";
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

async function submitForm(data: FormData): Promise<boolean> {
  if (!FORM_ENDPOINT) return false;

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
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
    `Contact from ${data.firstName} ${data.lastName} — ${data.interest !== "Select a product" ? data.interest : "General Inquiry"}`
  );
  const body = encodeURIComponent(
    [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      data.interest !== "Select a product"
        ? `Interest: ${data.interest}`
        : null,
      ``,
      `Message:`,
      data.message,
    ]
      .filter(Boolean)
      .join("\n")
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "Select a product",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
            <SectionLabel>CONTACT US</SectionLabel>
            <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
              Let&apos;s Start a Conversation
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
                : "Message Received"}
            </h2>
            <p className="text-[#666] mb-6">
              {submitError
                ? "Your message has been prepared in your default email client. Simply hit send, and we'll get back to you within 24 hours."
                : "Thank you for reaching out. Our team will get back to you within 24 hours."}
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
                  company: "",
                  interest: "Select a product",
                  message: "",
                });
              }}
              className="border border-[#E0E0E0] text-[#1B1B1B] px-6 py-3 rounded-lg font-medium hover:bg-[#F8F8F8] transition-colors"
            >
              Send Another Message
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
          <SectionLabel>CONTACT US</SectionLabel>
          <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
            Let&apos;s Start a Conversation
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto">
            Have a question about our products or want to explore how Keyflow
            can transform your real estate operations? We&apos;d love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-24 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#1B1B1B] mb-6">
              Send Us a Message
            </h2>
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
                    <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>
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
                    <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
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
                  htmlFor="interest"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  I&apos;m Interested In
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
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#1B1B1B] mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your needs..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#E0E0E0] focus:border-[#1B1B1B]"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#1B1B1B] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#F8F8F8] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#1B1B1B]">
                  Email Us
                </h3>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-[#666] hover:text-[#1B1B1B] transition-colors underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="bg-[#F8F8F8] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <Clock size={18} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-[#1B1B1B]">
                  Response Time
                </h3>
              </div>
              <p className="text-sm text-[#666]">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="border border-[#E0E0E0] rounded-xl p-6">
              <h3 className="text-base font-semibold text-[#1B1B1B] mb-2">
                Prefer a Live Demo?
              </h3>
              <p className="text-sm text-[#666] mb-4">
                See Keyflow in action. Book a personalized demo with our team.
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1B1B1B] hover:gap-3 transition-all"
              >
                Book a Demo <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

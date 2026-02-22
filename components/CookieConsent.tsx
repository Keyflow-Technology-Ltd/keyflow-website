"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Cookie Consent Banner — DIFC Data Protection Law Compliance
 *
 * - Essential cookies are always enabled (session, CSRF, routing)
 * - Analytics cookies require explicit opt-in consent
 * - Preference persisted in localStorage
 * - Only shown to first-time visitors (no existing preference)
 */

const COOKIE_CONSENT_KEY = "keyflow_cookie_consent";

type ConsentPreference = {
  essential: true; // Always true — cannot be disabled
  analytics: boolean;
  timestamp: string;
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check if user has already set a preference
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — show banner
      setVisible(true);
    }
  }, []);

  const savePreference = (analytics: boolean) => {
    const preference: ConsentPreference = {
      essential: true,
      analytics,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preference));
    } catch {
      // localStorage unavailable — still dismiss
    }
    setVisible(false);
  };

  const handleAcceptAll = () => {
    savePreference(true);
  };

  const handleEssentialOnly = () => {
    savePreference(false);
  };

  const handleSavePreferences = () => {
    savePreference(analyticsConsent);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6">
      <div className="mx-auto max-w-2xl bg-[#1A1A1A] border border-[#333] rounded-2xl shadow-2xl p-6">
        <div className="mb-4">
          <h3 className="text-white text-base font-semibold mb-2">
            Cookie Preferences
          </h3>
          <p className="text-[#999] text-sm leading-relaxed">
            We use essential cookies to operate our website. With your consent,
            we also use analytics cookies to understand how you interact with our
            site and improve your experience. You can change your preferences at
            any time.{" "}
            <Link
              href="/privacy-policy"
              className="text-[#C9A87C] hover:underline"
            >
              Read our Privacy Policy
            </Link>
          </p>
        </div>

        {/* Cookie options */}
        <div className="space-y-3 mb-5">
          {/* Essential — always on */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">
                Essential Cookies
              </p>
              <p className="text-[#777] text-xs">
                Required for the website to function. Cannot be disabled.
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <div className="w-10 h-5 bg-[#C9A87C] rounded-full relative cursor-not-allowed">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Analytics — opt-in */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">
                Analytics Cookies
              </p>
              <p className="text-[#777] text-xs">
                Help us understand how visitors use our website.
              </p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <button
                type="button"
                role="switch"
                aria-checked={analyticsConsent}
                onClick={() => setAnalyticsConsent(!analyticsConsent)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${
                  analyticsConsent ? "bg-[#C9A87C]" : "bg-[#444]"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    analyticsConsent
                      ? "translate-x-[22px]"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleEssentialOnly}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-[#999] bg-transparent border border-[#444] rounded-lg hover:border-[#666] hover:text-white transition-colors"
          >
            Essential Only
          </button>
          <button
            onClick={handleSavePreferences}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#333] border border-[#555] rounded-lg hover:bg-[#444] transition-colors"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] bg-[#C9A87C] rounded-lg hover:bg-[#D4B88D] transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Protection Policy — Keyflow Technology Ltd",
  description:
    "Keyflow Technology Ltd data protection policy covering LeaseFlow, LeadsFlow, Connect, and all Keyflow services. DIFC Data Protection Law compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="text-[#C9A87C] hover:underline text-sm"
          >
            &larr; Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-outfit, Outfit, sans-serif)" }}>
          Keyflow Technology Ltd &mdash; Data Protection Policy
        </h1>
        <p className="text-[#888] mb-2 text-sm">
          <strong className="text-[#FAFAFA]">Effective:</strong> 22 February 2026 &nbsp;|&nbsp;{" "}
          <strong className="text-[#FAFAFA]">Version:</strong> 1.0
        </p>

        <hr className="my-8 border-[#333]" />

        <div
          className="prose prose-invert prose-lg max-w-none leading-relaxed space-y-6
          [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
          [&_p]:text-[#ccc]
          [&_li]:text-[#ccc]
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
          [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse
          [&_th]:text-left [&_th]:border [&_th]:border-[#444] [&_th]:bg-[#1A1A1A] [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_th]:text-white
          [&_td]:border [&_td]:border-[#444] [&_td]:px-3 [&_td]:py-2 [&_td]:text-[#ccc]
          [&_a]:text-[#C9A87C] [&_a]:hover:underline
          [&_strong]:text-white"
        >
          <p>
            Keyflow Technology Ltd (&ldquo;Keyflow&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) values your security and privacy. Keyflow is a company registered in the Dubai International Financial Centre (DIFC License No. CL-12435, Reference SR-661431) and is required to comply with the DIFC Data Protection Law, DIFC Law No. 5 of 2020 (the &ldquo;DP Law&rdquo;), the DIFC Data Protection Regulations 2020, and may, for certain types of personal data processing, be subject to laws from other jurisdictions including UAE Federal Decree-Law No. 45 of 2021 (the &ldquo;Federal Data Protection Law&rdquo;) and the EU General Data Protection Regulation (GDPR) where applicable.
          </p>
          <p>
            It is the policy of Keyflow to respect the privacy of its users across all products and services. In accordance with the DP Law, Keyflow collects information about you when you use or access our products and services, including:
          </p>
          <ul>
            <li><strong>LeaseFlow</strong> (leaseflow.keyflow.me) &mdash; property and lease management platform</li>
            <li><strong>LeadsFlow</strong> (leadsflow.me) &mdash; real estate lead management and CRM</li>
            <li><strong>Connect</strong> (connect.keyflowae.com) &mdash; unified communications hub</li>
            <li><strong>Keyflow Website</strong> (keyflow.me) &mdash; our corporate website</li>
          </ul>
          <p>(collectively, the &ldquo;Services&rdquo;).</p>

          <h2>1. Scope and Application</h2>
          <p>This Policy applies to persons anywhere in the world who access or use any of Keyflow&apos;s Services, including real estate agency staff, property owners, tenants, leads, contacts, and website visitors.</p>

          <h2>2. Collection of Information</h2>
          <h3>2.1 Information You Give Us</h3>
          <p>Personal data you provide includes: full name, email, phone number, Emirates ID/passport details, nationality, date of birth, property and lease data, financial data, lead inquiry data, communication data (WhatsApp and email through Connect), and staff/agent data.</p>
          <h3>2.2 Information We Collect Automatically</h3>
          <p>Technical information (device type, browser, OS), log information (traffic data, access logs), and location information (IP address).</p>
          <h3>2.3 Information from Third Parties</h3>
          <p>Lead data from property portals (Bayut, PropertyFinder, Dubizzle), Meta Lead Ads, and webhook integrations.</p>

          <h2>3. Special Categories of Personal Data</h2>
          <p><strong>Biometric Data:</strong> AWS Rekognition is used within LeaseFlow only for identity verification, requiring explicit consent. Facial data is processed in transit and not permanently stored.</p>
          <p>We do not process data revealing racial origin, political opinions, religious beliefs, genetic data, health data, or sexual orientation. Our Services are not intended for children under 18.</p>

          <h2>4. Use of Personal Data</h2>
          <p>We process personal data for: service delivery and contract performance (Article 10(1)(b)), legal obligations including RERA/Ejari compliance (Article 10(1)(c)), legitimate interests including security and service improvement (Article 10(1)(f)), and consent-based activities including marketing, biometric processing, and analytics cookies (Article 10(1)(a)).</p>
          <p>AI services (AWS Bedrock, Textract, Rekognition) assist with document analysis and verification. No automated decisions with legal effects are made &mdash; all significant decisions are made by human operators.</p>

          <h2>5. Data Storage and International Transfers</h2>
          <p>Data is stored in AWS Middle East (UAE) region (me-central-1). International transfers to AWS and Meta are protected by Standard Contractual Clauses per Article 27(1) of the DP Law.</p>

          <h2>6. Sharing of Personal Data</h2>
          <p>We share data: within Keyflow products for integrated services; with AWS and Meta as data processors under DPAs; with third parties as configured by agencies (PropertyFinder, Zapier); and with regulatory authorities when legally required.</p>

          <h2>7. Data Retention</h2>
          <table>
            <thead><tr><th>Data Category</th><th>Retention Period</th></tr></thead>
            <tbody>
              <tr><td>Audit logs</td><td>7 years minimum</td></tr>
              <tr><td>Consent records</td><td>7 years</td></tr>
              <tr><td>Lease and property data</td><td>Subscription + 7 years</td></tr>
              <tr><td>Lead data</td><td>Subscription + 30 days</td></tr>
              <tr><td>Communication data</td><td>Subscription + 7 years</td></tr>
              <tr><td>User accounts</td><td>Subscription + 30 days</td></tr>
              <tr><td>Biometric comparison data</td><td>Not stored after verification</td></tr>
              <tr><td>Identity documents</td><td>Subscription + 7 years</td></tr>
            </tbody>
          </table>

          <h2>8. Your Rights</h2>
          <p>Under the DP Law you have rights of: access (Art. 32), rectification (Art. 33), erasure (Art. 34), restriction (Art. 35), data portability (Art. 36), objection (Art. 37), and withdrawal of consent (Art. 10).</p>
          <p>Exercise your rights via account settings or by contacting: <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a> | Phone: +971 56 754 0655 | Post: Keyflow Technology Ltd, Level 14, The Gate, DIFC, Dubai, UAE.</p>

          <h2>9. Security</h2>
          <p>We implement encryption at rest (KMS) and in transit (TLS), WAF protection, multi-tenant data isolation, RBAC, bcrypt password hashing, CodeQL scanning, and 7-year audit logging.</p>

          <h2>10. Cookies</h2>
          <p>We use essential cookies only by default (session, CSRF, load balancing). Analytics cookies require your opt-in consent.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We will notify you of material changes via the Services or email. Material changes may require re-consent.</p>

          <h2>12. Contact Us</h2>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p className="text-white font-semibold">Data Protection Officer</p>
            <p>Abdallah Al Shaqra (Interim DPO)</p>
            <p className="mt-2"><strong className="text-white">Email:</strong> <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></p>
            <p><strong className="text-white">Phone:</strong> +971 56 754 0655</p>
            <p><strong className="text-white">Post:</strong> Keyflow Technology Ltd, Level 14, The Gate, DIFC, P.O. Box 74777, Dubai, UAE</p>
          </div>

          <h2>13. Complaints</h2>
          <p>Lodge complaints with the DIFC Commissioner of Data Protection: Phone +971 4 362 2222, Email <a href="mailto:commissioner@dp.difc.ae">commissioner@dp.difc.ae</a>, Website <a href="https://www.difc.ae/business/operating/data-protection/" target="_blank" rel="noopener noreferrer">difc.ae/business/operating/data-protection</a>.</p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            This Policy was last updated on 22 February 2026.
          </p>
          <p className="text-sm text-[#666] italic">
            Keyflow Technology Ltd, DIFC License CL-12435, Level 14, The Gate, DIFC, Dubai, UAE
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#333]">
          <Link href="/" className="text-[#C9A87C] hover:underline text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Keyflow Technology Ltd",
  description:
    "Terms of Service for Keyflow Technology Ltd covering LeaseFlow, LeadsFlow, Connect, and all Keyflow services. DIFC governed.",
};

export default function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="text-[#888] mb-2 text-sm">
          <strong className="text-[#FAFAFA]">Effective:</strong> 22 February 2026 &nbsp;|&nbsp;{" "}
          <strong className="text-[#FAFAFA]">Version:</strong> 1.0 &nbsp;|&nbsp;{" "}
          <strong className="text-[#FAFAFA]">Ref:</strong> TOS-2026-001
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
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) and <strong>Keyflow Technology Ltd</strong> (&ldquo;Keyflow&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a company registered in the Dubai International Financial Centre (DIFC License No. CL-12435, Reference SR-661431), governing your access to and use of the Keyflow platform and services.
          </p>
          <p>
            By creating an account, accessing, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, our <a href="/privacy-policy">Data Protection Policy</a>, and any additional terms referenced herein.
          </p>
          <p>
            If you are entering into these Terms on behalf of a company, organization, or other legal entity (&ldquo;Agency&rdquo;), you represent and warrant that you have the authority to bind that entity to these Terms.
          </p>

          <h2>2. Definitions</h2>
          <ul>
            <li><strong>&ldquo;Services&rdquo;</strong> means the Keyflow platform and all products offered by Keyflow, including but not limited to LeaseFlow, LeadsFlow, Keyflow Connect, and the Keyflow website (keyflowae.com).</li>
            <li><strong>&ldquo;LeaseFlow&rdquo;</strong> means the property management platform available at leaseflow.keyflowae.com, providing lease management, tenant management, property management, owner portals, compliance, and financial tracking for real estate agencies.</li>
            <li><strong>&ldquo;LeadsFlow&rdquo;</strong> means the real estate CRM available at leadsflow.me, providing lead capture, distribution, tracking, analytics, and team management for real estate agencies.</li>
            <li><strong>&ldquo;Keyflow Connect&rdquo;</strong> (or &ldquo;Connect&rdquo;) means the communication hub available at connect.keyflowae.com, providing WhatsApp Business API and email integration for real estate agencies.</li>
            <li><strong>&ldquo;Content&rdquo;</strong> means all data, text, files, documents, images, and other materials you upload to or transmit through the Services.</li>
            <li><strong>&ldquo;Agency&rdquo;</strong> means the real estate agency, brokerage, or property management company that has registered for the Services.</li>
            <li><strong>&ldquo;Client&rdquo;</strong> means any property owner, tenant, buyer, seller, or other individual whose data is processed through the Services on behalf of an Agency.</li>
            <li><strong>&ldquo;Lead&rdquo;</strong> means a prospective client whose contact information is captured and managed through LeadsFlow.</li>
            <li><strong>&ldquo;Contact&rdquo;</strong> means an individual whose contact information is used for communication through Connect.</li>
          </ul>

          <h2>3. Eligibility</h2>
          <p>
            To use the Services, you must: (a) be at least 18 years of age; (b) have the legal capacity to enter into a binding agreement; (c) not be prohibited from receiving the Services under the laws of the DIFC, the UAE, or any other applicable jurisdiction; and (d) hold any necessary licenses or permits required by applicable law (including, where applicable, a valid RERA broker license issued by the Dubai Land Department).
          </p>

          <h2>4. Account Registration and Security</h2>
          <p><strong>4.1 Registration.</strong> You must provide accurate, current, and complete information during registration and keep your account information updated.</p>
          <p><strong>4.2 Account Security.</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us at <a href="mailto:support@keyflowae.com">support@keyflowae.com</a> if you become aware of any unauthorized use of your account.</p>
          <p><strong>4.3 Multi-Tenant Isolation.</strong> Each Agency&apos;s data is logically isolated within the Services. You must not attempt to access, view, or modify data belonging to other Agencies or their Clients.</p>

          <h2>5. License and Restrictions</h2>
          <p><strong>5.1 License Grant.</strong> Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes.</p>
          <p><strong>5.2 Restrictions.</strong> You agree not to: (a) sublicense, sell, resell, transfer, or distribute access to the Services; (b) modify, adapt, translate, reverse engineer, decompile, or disassemble any portion of the Services; (c) use the Services to build a competing product or service; (d) use automated means (bots, scrapers, etc.) to access the Services except through our published APIs; (e) exceed any rate limits or usage restrictions communicated to you.</p>

          <h2>6. User Content and Data</h2>
          <p><strong>6.1 Your Content.</strong> You retain ownership of all Content you upload to the Services. By uploading Content, you grant us a worldwide, non-exclusive license to use, store, process, and transmit your Content solely to provide the Services to you.</p>
          <p><strong>6.2 Responsibility for Content.</strong> You are solely responsible for the accuracy, legality, and appropriateness of your Content. You represent and warrant that:</p>
          <ul>
            <li>You have the right to upload and use the Content</li>
            <li>Your Content does not infringe any third-party intellectual property rights</li>
            <li>Your Content complies with all applicable laws and regulations, including the DIFC Data Protection Law 2020</li>
            <li>You have obtained all necessary consents from Clients and Contacts whose personal data you upload or process through the Services</li>
          </ul>
          <p><strong>6.3 Data Protection Responsibilities.</strong> You acknowledge that your Agency acts as the party with the direct relationship to Clients and Contacts. Your Agency is responsible for ensuring it has an appropriate lawful basis for collecting personal data and must inform Clients and Contacts about data processing in accordance with applicable data protection laws. Keyflow processes personal data in accordance with our <a href="/privacy-policy">Data Protection Policy</a>.</p>
          <p><strong>6.4 Cross-Product Data.</strong> Where you use multiple Services (e.g., LeaseFlow and Connect), your Content may be linked across Services to provide integrated functionality. This cross-product linking is governed by the Data Protection Policy.</p>

          <h2>7. Acceptable Use &mdash; Keyflow Connect</h2>
          <p>In addition to the general restrictions in Section 5, your use of Keyflow Connect is subject to the following:</p>
          <p><strong>7.1 WhatsApp Business API Compliance.</strong> When using Connect to send WhatsApp messages, you agree to comply with Meta&apos;s WhatsApp Business Policy and Commerce Policy, only send messages to contacts who have initiated a conversation or consented to receive messages, use approved templates for business-initiated messages, and not send spam, unsolicited marketing, or bulk messaging that violates Meta&apos;s policies.</p>
          <p><strong>7.2 Email Communications.</strong> When using Connect to send emails, you agree to comply with applicable anti-spam laws, not send unsolicited marketing without consent, include accurate sender identification, and honor unsubscribe requests promptly.</p>
          <p><strong>7.3 Communication Recording.</strong> You acknowledge that all messages sent and received through Connect are stored for conversation threading, audit logging, and service delivery. You are responsible for informing your Contacts that their communications are processed and stored by Keyflow.</p>

          <h2>8. Fees and Payment</h2>
          <p><strong>8.1 Subscription Fees.</strong> Use of the Services requires payment of subscription fees as specified in your selected plan. Fees are billed in advance on a monthly or annual basis.</p>
          <p><strong>8.2 Payment Terms.</strong> You agree to provide valid payment information and authorize us to charge your payment method. All fees are non-refundable except as required by applicable law.</p>
          <p><strong>8.3 Price Changes.</strong> We may change our fees upon 30 days&apos; written notice. Continued use of the Services after a price change constitutes acceptance of the new fees.</p>
          <p><strong>8.4 Taxes.</strong> All fees are exclusive of applicable taxes, including UAE Value Added Tax (VAT) at 5%. You are responsible for payment of all applicable taxes.</p>

          <h2>9. Intellectual Property Rights</h2>
          <p><strong>9.1 Our IP.</strong> The Services, including all software, designs, text, graphics, logos, icons, and other materials (excluding your Content), are owned by Keyflow Technology Ltd and protected by copyright, trademark, and other intellectual property laws of the DIFC, the UAE, and international treaties.</p>
          <p><strong>9.2 Trademarks.</strong> &ldquo;Keyflow&rdquo;, &ldquo;LeaseFlow&rdquo;, &ldquo;LeadsFlow&rdquo;, &ldquo;Keyflow Connect&rdquo;, and our logos are trademarks of Keyflow Technology Ltd. You may not use our trademarks without our prior written permission.</p>
          <p><strong>9.3 Feedback.</strong> If you provide us with feedback, suggestions, or ideas about the Services, we may use that feedback without any obligation or compensation to you.</p>

          <h2>10. Third-Party Services and Integrations</h2>
          <p><strong>10.1 Third-Party Integrations.</strong> The Services may integrate with third-party services, including property portals (PropertyFinder, Bayut, Dubizzle), Meta (Facebook/Instagram lead ads, WhatsApp Business API), UAE PASS for identity verification, and government systems (RERA, Ejari, Dubai Land Department).</p>
          <p><strong>10.2 Third-Party Terms.</strong> Your use of third-party services through the Keyflow platform is subject to the respective terms of those providers. We are not responsible for the availability, accuracy, or content of third-party services.</p>

          <h2>11. Service Availability and Support</h2>
          <p><strong>11.1 Uptime.</strong> We strive to provide reliable Service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our reasonable control.</p>
          <p><strong>11.2 Modifications.</strong> We reserve the right to modify, enhance, suspend, or discontinue any part of the Services with reasonable notice. Material changes to core functionality will be communicated at least 30 days in advance.</p>
          <p><strong>11.3 Support.</strong> Technical support is provided via email at <a href="mailto:support@keyflowae.com">support@keyflowae.com</a> during business hours (Sunday through Thursday, 9:00 AM to 6:00 PM GST).</p>

          <h2>12. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Services for any illegal purpose or in violation of DIFC law, UAE federal law, RERA regulations, or data protection laws</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to the Services, other users&apos; accounts, or our infrastructure</li>
            <li>Harass, abuse, threaten, or harm other users, their Clients, or their Contacts</li>
            <li>Use the Services to send spam or unsolicited communications</li>
            <li>Violate any applicable data protection or privacy laws, including the DIFC Data Protection Law 2020</li>
            <li>Process special categories of personal data through the Services without our prior written consent and appropriate safeguards</li>
          </ul>

          <h2>13. Data Retention and Deletion</h2>
          <p><strong>13.1 Active Accounts.</strong> While your account is active, we retain your Content as necessary to provide the Services.</p>
          <p><strong>13.2 Account Termination.</strong> Upon termination, we retain your data for 30 days for account reactivation. After 30 days, Content is securely deleted or anonymized, except as required by law.</p>
          <p><strong>13.3 Legal Retention.</strong> Certain data is retained beyond termination as required by law:</p>
          <ul>
            <li>Audit logs: 7 years minimum (DIFC regulatory requirement)</li>
            <li>Consent records: 7 years minimum (DIFC accountability requirement)</li>
            <li>Communication records (Connect): 7 years (audit trail requirement)</li>
            <li>Lease and property records: 7 years (RERA, Ejari, DIFC requirements)</li>
          </ul>
          <p><strong>13.4 Data Export.</strong> You may request a data export at any time through the privacy settings in the applicable Service or by contacting <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a>. Requests are fulfilled within 30 days.</p>

          <h2>14. Privacy and Data Protection</h2>
          <p><strong>14.1 Privacy Policy.</strong> Our collection, use, and protection of personal data is governed by the <a href="/privacy-policy">Data Protection Policy</a>, which is incorporated into these Terms by reference.</p>
          <p><strong>14.2 Data Subject Rights.</strong> Individuals whose personal data is processed have rights under the DIFC Data Protection Law 2020, including access, rectification, erasure, restriction, portability, and objection.</p>
          <p><strong>14.3 Data Processing.</strong> By using the Services, you acknowledge that personal data may be processed using AI and OCR technologies, and may be transferred to processors outside the DIFC with appropriate safeguards in place, as described in the Data Protection Policy.</p>

          <h2>15. Disclaimers</h2>
          <p>THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
          <p>We do not warrant that the Services will be error-free or uninterrupted, that results obtained will be accurate or reliable, or that AI-generated analysis will replace professional judgement. You should consult appropriate professionals for legal, financial, and regulatory matters.</p>

          <h2>16. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY DIFC LAW: (a) we shall not be liable for any indirect, incidental, special, consequential, or punitive damages; (b) our total liability shall not exceed the amount you paid us in the 12 months preceding the event giving rise to liability; (c) these limitations do not apply to liability arising from gross negligence, wilful misconduct, death or personal injury, or any liability that cannot be excluded under DIFC law.</p>

          <h2>17. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Keyflow Technology Ltd from any claims, liabilities, damages, losses, costs, or expenses arising out of your use of the Services, violation of these Terms, violation of any law, your Content, infringement of third-party rights, or messages sent through Connect that violate applicable laws or Meta&apos;s policies.</p>

          <h2>18. Termination</h2>
          <p><strong>18.1 By You.</strong> You may terminate your subscription at any time through your account settings or by contacting <a href="mailto:support@keyflowae.com">support@keyflowae.com</a>.</p>
          <p><strong>18.2 By Us.</strong> We may suspend or terminate your access immediately if you materially breach these Terms, payment is overdue by more than 15 days, we are required by law, or your use poses a security risk.</p>
          <p><strong>18.3 Effect of Termination.</strong> Upon termination, your right to use the Services ceases immediately, data retention provisions (Section 13) apply, and surviving provisions (payment, disclaimers, liability, indemnification, governing law) continue in effect.</p>

          <h2>19. Dispute Resolution and Governing Law</h2>
          <p><strong>19.1 Governing Law.</strong> These Terms shall be governed by and construed in accordance with the laws of the Dubai International Financial Centre (DIFC).</p>
          <p><strong>19.2 Jurisdiction.</strong> Any disputes shall be subject to the exclusive jurisdiction of the DIFC Courts.</p>
          <p><strong>19.3 Informal Resolution.</strong> Before filing any formal dispute, you agree to contact us at <a href="mailto:legal@keyflowae.com">legal@keyflowae.com</a> to seek informal resolution. We will attempt to resolve disputes within 30 days.</p>

          <h2>20. Changes to These Terms</h2>
          <p>We may modify these Terms from time to time. Material changes will be communicated at least 30 days before taking effect. Continued use after the effective date constitutes acceptance. The current version is always available at the Terms of Service page within each product and at <a href="/terms-of-service">keyflowae.com/terms-of-service</a>.</p>

          <h2>21. General Provisions</h2>
          <p><strong>21.1 Entire Agreement.</strong> These Terms, together with the Data Protection Policy and any subscription agreement, constitute the entire agreement between you and Keyflow.</p>
          <p><strong>21.2 Severability.</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</p>
          <p><strong>21.3 Waiver.</strong> Our failure to enforce any provision does not constitute a waiver.</p>
          <p><strong>21.4 Assignment.</strong> You may not assign these Terms without our written consent. We may assign without restriction in connection with a merger, acquisition, or asset sale.</p>
          <p><strong>21.5 Force Majeure.</strong> We shall not be liable for failures due to causes beyond reasonable control, including natural disasters, war, pandemics, government actions, power failures, or Internet disruptions.</p>
          <p><strong>21.6 Notices.</strong> Notices to us should be sent to <a href="mailto:legal@keyflowae.com">legal@keyflowae.com</a>. Notices to you will be sent to your account email.</p>

          <h2>22. Contact Information</h2>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p className="text-white font-semibold">Keyflow Technology Ltd</p>
            <p>Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue &mdash; South</p>
            <p>Dubai International Financial Centre</p>
            <p>Dubai, United Arab Emirates</p>
            <p className="mt-2"><strong className="text-white">Legal:</strong> <a href="mailto:legal@keyflowae.com">legal@keyflowae.com</a></p>
            <p><strong className="text-white">Support:</strong> <a href="mailto:support@keyflowae.com">support@keyflowae.com</a></p>
            <p><strong className="text-white">Data Protection Officer:</strong> <a href="mailto:dpo@keyflowae.com">dpo@keyflowae.com</a></p>
          </div>

          <h2>Document Control</h2>
          <table>
            <thead><tr><th>Version</th><th>Date</th><th>Author</th><th>Changes</th></tr></thead>
            <tbody>
              <tr><td>1.0</td><td>22 February 2026</td><td>Abdallah Al Shaqra (CEO / Interim DPO)</td><td>Initial version covering all Keyflow products (LeaseFlow, LeadsFlow, Connect, keyflowae.com).</td></tr>
            </tbody>
          </table>
          <p><strong>Review Schedule:</strong> Annually at minimum, or when Services or regulatory requirements change materially.</p>
          <p><strong>Next review date:</strong> 22 February 2027</p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            These Terms of Service are maintained in accordance with the laws of the Dubai International Financial Centre (DIFC). They should be read in conjunction with the Keyflow Data Protection Policy.
          </p>
          <p className="text-sm text-[#666] italic">
            Document Reference: TOS-2026-001 | Keyflow Technology Ltd | DIFC License CL-12435
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

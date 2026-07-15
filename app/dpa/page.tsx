import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Addendum — KeyFlow Technology Ltd",
  description:
    "KeyFlow Technology Ltd Data Processing Addendum under Article 24 of the DIFC Data Protection Law. Incorporated into the Terms of Service; executed per agency via in-product acceptance. Version 1.0, 15 July 2026.",
};

export default function DpaPage() {
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
          Data Processing Addendum
        </h1>
        <p className="text-[#888] mb-2 text-sm">
          <strong className="text-[#FAFAFA]">Version:</strong> 1.0 &nbsp;|&nbsp;{" "}
          <strong className="text-[#FAFAFA]">Dated:</strong> 15 July 2026
        </p>

        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-5 mt-6 mb-2">
          <p className="text-[#ccc] text-sm leading-relaxed">
            This Data Processing Addendum is{" "}
            <strong className="text-white">
              incorporated into the{" "}
              <Link href="/terms-of-service" className="text-[#C9A87C] hover:underline">
                Terms of Service
              </Link>
            </strong>{" "}
            and is <strong className="text-white">executed per agency via in-product acceptance by an
            authorised representative</strong> of the agency. In respect of personal data processing,
            it prevails over the Terms of Service.
          </p>
        </div>

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
          <p><strong>between</strong></p>
          <p>
            <strong>the real-estate agency that subscribes to the Services (the &ldquo;Agency&rdquo; / &ldquo;Controller&rdquo;)</strong>, a real-estate agency licensed in Dubai, United Arab Emirates, identified by its RERA Office Registration Number (ORN) and registered address as recorded at acceptance;
          </p>
          <p><strong>and</strong></p>
          <p>
            <strong>KeyFlow Technology Ltd (&ldquo;KeyFlow&rdquo; / &ldquo;Processor&rdquo;)</strong>, a company licensed in the Dubai International Financial Centre under Commercial Licence CL-12435, of Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE.
          </p>
          <p><em>(each a &ldquo;Party&rdquo;, together the &ldquo;Parties&rdquo;)</em></p>
          <table>
            <tbody>
              <tr><td><strong>Version</strong></td><td>1.0 — 15 July 2026</td></tr>
              <tr><td><strong>Legal basis</strong></td><td>Article 24, DIFC Data Protection Law No. 5 of 2020 (&ldquo;DP Law&rdquo;)</td></tr>
              <tr><td><strong>Scope of services</strong></td><td>The KeyFlow software services used by the Agency: the first-generation LeaseFlow and LeadsFlow products, and, upon the Agency&apos;s migration, the next-generation Keyflow platform (Arc, Atlas, Connect, Ledger, Console, Keys) — together the &ldquo;Services&rdquo;</td></tr>
              <tr><td><strong>Execution</strong></td><td>Incorporated into the <a href="/terms-of-service">Terms of Service</a>; executed per agency via in-product acceptance by an authorised representative</td></tr>
            </tbody>
          </table>

          <h2>Recitals</h2>
          <p>
            (A) The Agency uses the Services to manage its real-estate business, in the course of which KeyFlow Processes Personal Data relating to the Agency&apos;s clients and contacts on the Agency&apos;s behalf.
          </p>
          <p>
            (B) Article 24 of the DP Law requires such Processing to be governed by a legally binding written agreement. This Addendum is that agreement. It supplements the terms of service governing the Agency&apos;s use of the Services and prevails over them in respect of Personal Data processing.
          </p>

          <h2>1. Definitions</h2>
          <p>
            Capitalised terms have the meanings given in the DP Law. &ldquo;<strong>Agency Personal Data</strong>&rdquo; means Personal Data Processed by KeyFlow on the Agency&apos;s behalf in providing the Services, as described in Annex A. For the avoidance of doubt, Personal Data for which KeyFlow determines its own purposes and means (platform account identity, security and audit records, as described in KeyFlow&apos;s <a href="/privacy-policy">privacy notice</a>) is processed by KeyFlow as Controller and is outside this Addendum.
          </p>

          <h2>2. Roles</h2>
          <p>
            <strong>2.1</strong> For Agency Personal Data, the <strong>Agency is the Controller</strong> and <strong>KeyFlow is the Processor</strong>.
          </p>
          <p>
            <strong>2.2</strong> The Agency warrants that it has a lawful basis for the Processing it instructs, that it has provided its clients with the information required by Articles 29–30 of the DP Law and applicable UAE law, and that its instructions comply with Applicable Law.
          </p>

          <h2>3. Subject matter, duration, nature and purpose</h2>
          <p>
            As set out in <strong>Annex A</strong> (which forms part of this Addendum). Duration: the term of the Agency&apos;s use of the Services, plus the wind-down and disposal periods in clause 9.
          </p>

          <h2>4. Processor obligations (Article 24(5))</h2>
          <p>KeyFlow shall:</p>
          <ul>
            <li><strong>(a) Documented instructions.</strong> Process Agency Personal Data only on the Agency&apos;s documented instructions. The Parties agree the Agency&apos;s instructions are: the functionality of the Services as configured and operated by the Agency&apos;s users, this Addendum, and any further written instructions the Agency gives through the Services or to <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a>. KeyFlow shall inform the Agency if, in its opinion, an instruction contravenes the DP Law.</li>
            <li><strong>(b) Confidentiality.</strong> Ensure that every person authorised to Process Agency Personal Data (currently the founder-operator; in future, employees and contractors bound by KeyFlow&apos;s Internal Data Protection Policy) is committed to confidentiality.</li>
            <li><strong>(c) Security.</strong> Implement and maintain the technical and organisational measures summarised in <strong>Annex B</strong>, and not materially degrade them during the term.</li>
            <li><strong>(d) Sub-processors.</strong> Engage the sub-processors listed in <strong>Annex C</strong> (general authorisation granted). KeyFlow shall give the Agency at least 14 days&apos; written notice of any intended addition or replacement, during which the Agency may object on reasonable data-protection grounds; shall impose data-protection obligations no less protective than this Addendum on every sub-processor by written contract; and remains fully liable to the Agency for sub-processor performance.</li>
            <li><strong>(e) Data subject rights.</strong> Taking into account the nature of the Processing, assist the Agency by appropriate technical and organisational measures in fulfilling the Agency&apos;s obligation to respond to Data Subject requests under Articles 32–40 (the Services include self-service export and documented request-handling workflows).</li>
            <li><strong>(f) Breach notification.</strong> Notify the Agency without undue delay after becoming aware of a Personal Data Breach affecting Agency Personal Data, providing the information reasonably required for the Agency&apos;s own obligations under Articles 41–42.</li>
            <li><strong>(g) Deletion or return.</strong> At the end of the provision of the Services (including the wind-down in clause 9), at the Agency&apos;s choice, delete or return all Agency Personal Data and delete existing copies, save to the extent Applicable Law requires retention (in which case KeyFlow shall isolate and protect the data and process it for no other purpose), applying Article 22 of the DP Law and KeyFlow&apos;s Retention &amp; Erasure Schedule.</li>
            <li><strong>(h) Demonstration and audit.</strong> Make available to the Agency information reasonably necessary to demonstrate compliance with Article 24, and allow for and contribute to audits (including inspections) conducted by the Agency or its mandated auditor, no more than once per 12-month period on at least 14 days&apos; notice, during business hours, at the Agency&apos;s cost, and subject to reasonable confidentiality and security requirements. KeyFlow&apos;s current compliance documentation (Record of Processing Activities, DPIA, Internal Data Protection Policy, Retention &amp; Erasure Schedule) is available on request.</li>
          </ul>

          <h2>5. International transfers</h2>
          <p>
            <strong>5.1</strong> The Services are hosted in <strong>AWS ap-southeast-1 (Singapore)</strong> — an adequate jurisdiction under Article 26(2) of the DP Law and Appendix 3 of the DIFC Data Protection Regulations.
          </p>
          <p>
            <strong>5.2</strong> The Agency authorises the transfers inherent in the Services, as documented in KeyFlow&apos;s Record of Processing Activities: onshore-UAE flows initiated by the Data Subject (UAE PASS authentication and digital signature) or conducted under the Article 28 procedure (Dubai Land Department verifications); limited transfers to the USA (Apple push-notification delivery, minimised to device tokens and notification content); and, if and when activated for the Agency, Meta/WhatsApp messaging — which KeyFlow shall not activate before compliant safeguards under Article 27 are in place.
          </p>
          <p>
            <strong>5.3</strong> Legacy first-generation file storage in AWS me-central-1 (UAE) is being consolidated to Singapore; KeyFlow shall complete that consolidation no later than the production launch of the next-generation platform.
          </p>

          <h2>6. Liability and governing law</h2>
          <p>
            <strong>6.1</strong> Each Party&apos;s liability under this Addendum is subject to the limitations and exclusions of the underlying services terms, save that nothing limits liability for a Party&apos;s breach of the DP Law that results in an administrative fine or Data Subject compensation attributable to that Party&apos;s own non-compliance (Articles 62–64).
          </p>
          <p>
            <strong>6.2</strong> This Addendum is governed by the laws of the DIFC, and the DIFC Courts have exclusive jurisdiction.
          </p>

          <h2>7. Order of precedence</h2>
          <p>
            In respect of Personal Data processing, this Addendum prevails over the services terms and any prior arrangement between the Parties.
          </p>

          <h2>8. Term</h2>
          <p>
            This Addendum is effective from the Agency&apos;s acceptance and continues while KeyFlow provides the Services to the Agency, surviving the Agency&apos;s migration from the first-generation products to the next-generation platform.
          </p>

          <h2>9. First-generation wind-down</h2>
          <p>
            The Parties record that LeaseFlow and LeadsFlow will be wound down in <strong>Q4 2026</strong> following the Agency&apos;s migration to the next-generation platform. Clause 4(g) applies to the wind-down: the Agency&apos;s data will be migrated with the Agency&apos;s confirmation, and residual first-generation copies disposed of per Article 22.
          </p>

          <hr className="my-8 border-[#333]" />

          <h2>Annex A — Processing particulars</h2>
          <table>
            <thead><tr><th>Item</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>Subject matter</td><td>Provision of the Services (real-estate agency operations software)</td></tr>
              <tr><td>Nature and purpose</td><td>Hosting, storage, structuring, retrieval, display, transmission and deletion of Agency business records: property/tenancy/lease management; lead and contact management (including inbound retrieval from Meta Lead Ads where the Agency connects its own account); client messaging (email; WhatsApp when activated); invoicing, payments and cheque tracking; document generation and (on the next-generation platform) UAE PASS e-signing; maintenance requests; notifications</td></tr>
              <tr><td>Categories of Data Subjects</td><td>The Agency&apos;s clients and prospective clients: tenants, landlords/owners, buyers, sellers, leads; the Agency&apos;s own staff (account data)</td></tr>
              <tr><td>Categories of Personal Data</td><td>Names (EN/AR); contact details; Emirates ID numbers and identity attributes; tenancy/lease and transaction terms (rents, deposits, dates); property records; lead/enquiry details and source attribution; message content and delivery metadata; invoicing, payment and post-dated cheque records; documents uploaded or generated in the Services</td></tr>
              <tr><td>Special Categories</td><td>Not intended to be processed; the Agency shall not instruct processing of Special Categories through the Services</td></tr>
              <tr><td>Duration</td><td>Term of the Services + wind-down (clause 9) + statutory retention (Retention &amp; Erasure Schedule)</td></tr>
            </tbody>
          </table>

          <h2>Annex B — Technical and organisational measures (summary)</h2>
          <p>
            Hosting in AWS ap-southeast-1 (Singapore): databases encrypted at rest in private isolated subnets with no public access; TLS 1.2+ in transit; document storage with SSE/KMS encryption, versioning and public access blocked. Application: strict per-tenant isolation (every query scoped to the Agency); capability-based authorisation with per-user denies; UAE PASS verified identity (SOP2/SOP3) on the next-generation platform — no passwords held; hashed session tokens with remote revocation; append-only audit logging of every mutation (7-year retention). Operational: secrets in AWS Secrets Manager; CI without static cloud credentials; daily encrypted backups; production access restricted to the founder-operator. Full detail: KeyFlow Internal Data Protection Policy §4 and ROPA column J.
          </p>

          <h2>Annex C — Authorised sub-processors</h2>
          <table>
            <thead><tr><th>Sub-processor</th><th>Purpose</th><th>Location/notes</th></tr></thead>
            <tbody>
              <tr><td>Amazon Web Services</td><td>Primary infrastructure (compute, database, storage, email via SES)</td><td>Singapore (ap-southeast-1); legacy first-gen file storage in me-central-1 pending consolidation (clause 5.3)</td></tr>
              <tr><td>Atlassian</td><td>Operational/support tooling</td><td>Cloud</td></tr>
              <tr><td>Microsoft 365</td><td>Corporate email</td><td>Cloud</td></tr>
              <tr><td>Apple</td><td>Push-notification delivery (device tokens, notification content)</td><td>USA — minimised payloads</td></tr>
              <tr><td>Lean Technologies</td><td>Payment initiation and account data (sandbox today; production subject to DPA per clause 4(d) notice)</td><td>UAE/ADGM</td></tr>
              <tr><td>Meta Platforms</td><td>Lead Ads inbound retrieval (where Agency-connected); WhatsApp messaging (only upon activation with Article 27 safeguards)</td><td>USA</td></tr>
            </tbody>
          </table>
          <p className="text-sm text-[#666] italic">
            UAE PASS / Digital Dubai and the Dubai Land Department are independent controllers of their own government services and are not sub-processors of KeyFlow.
          </p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            KeyFlow Technology Ltd — Data Processing Addendum v1.0 — 15 July 2026. Incorporated into the{" "}
            <Link href="/terms-of-service" className="text-[#C9A87C] hover:underline">Terms of Service</Link>; executed per agency via in-product acceptance by an authorised representative.
          </p>
          <p className="text-sm text-[#666] italic">
            KeyFlow Technology Ltd | DIFC Commercial Licence CL-12435
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

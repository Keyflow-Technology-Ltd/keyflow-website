import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — KeyFlow Technology Ltd",
  description:
    "Terms of Service for KeyFlow Technology Ltd covering the Keyflow platform (Arc, Atlas, Connect, Ledger, Console, Keys), LeaseFlow, LeadsFlow, and all KeyFlow websites. DIFC governed. Version 2.0, effective 22 July 2026.",
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
          <strong className="text-[#FAFAFA]">Effective:</strong> 22 July 2026 &nbsp;|&nbsp;{" "}
          <strong className="text-[#FAFAFA]">Version:</strong> 2.0
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
          <p><strong>KeyFlow Technology Ltd</strong></p>
          <table>
            <tbody>
              <tr><td><strong>Version</strong></td><td><strong>2.0</strong> — effective <strong>22 July 2026</strong></td></tr>
              <tr><td><strong>Supersedes</strong></td><td>Version 1.x (published under the superseded keyflow.me domain, which is no longer associated with KeyFlow)</td></tr>
              <tr><td><strong>Canonical URL</strong></td><td><a href="/terms-of-service">keyflowae.com/terms-of-service</a> — the single authoritative copy, linked from every KeyFlow product</td></tr>
              <tr><td><strong>Applies to</strong></td><td>All KeyFlow services and websites (Section 3)</td></tr>
            </tbody>
          </table>

          <h2>1. Who we are, and who these Terms bind</h2>
          <p>
            <strong>1.1</strong> These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) are an agreement between <strong>KeyFlow Technology Ltd</strong> (&ldquo;<strong>KeyFlow</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;), a company licensed in the Dubai International Financial Centre under Commercial Licence <strong>CL-12435</strong>, with its registered address at Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE, and the real-estate agency that subscribes to the Services (the &ldquo;<strong>Agency</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo;).
          </p>
          <p>
            <strong>1.2</strong> The Services are business software. <strong>The Agency is our customer.</strong> Individuals access the Services under the Agency&apos;s subscription: the Agency&apos;s staff and contractors (&ldquo;<strong>Authorised Users</strong>&rdquo;) and, through the Keys application, the Agency&apos;s own clients — owners, tenants, buyers and sellers (&ldquo;<strong>Clients</strong>&rdquo;). These Terms bind the Agency, and the Agency is responsible for the acts and omissions of its Authorised Users as if they were its own. Clients&apos; use of Keys is enabled by the Agency&apos;s subscription and governed by these Terms and the notices presented in the product.
          </p>
          <p>
            <strong>1.3</strong> Visitors browsing our websites (Section 3.4) without an account are bound by Sections 3.4, 5, 9, 12, 13 and 15 of these Terms and by our Privacy Policy at <a href="/privacy-policy">keyflowae.com/privacy-policy</a>.
          </p>

          <h2>2. Acceptance</h2>
          <p>
            <strong>2.1</strong> The Agency accepts these Terms when a person acting for it clicks to accept them in the product or signs an order or agreement referencing them. <strong>The person accepting warrants that they are authorised to bind the Agency.</strong>
          </p>
          <p>
            <strong>2.2</strong> The products present a versioned consent gate. Where we update these Terms (Section 14), the Agency&apos;s continued use after notice constitutes acceptance of non-material updates; material updates must be re-accepted through the consent gate before continued use.
          </p>

          <h2>3. The Services</h2>
          <p>
            <strong>3.1</strong> &ldquo;<strong>Services</strong>&rdquo; means the KeyFlow software services made available to the Agency, in three tiers:
          </p>
          <ul>
            <li><strong>(a) The next-generation Keyflow platform</strong> — six surfaces (<strong>Arc</strong> for opportunities, <strong>Atlas</strong> for property and listing operations, <strong>Connect</strong> for client messaging, <strong>Ledger</strong> for cheques and payments, <strong>Console</strong> for organisation administration, and <strong>Keys</strong> for the Agency&apos;s Clients), with companion iOS applications. The platform is <strong>pre-launch</strong>: it currently operates in a staging environment and becomes generally available at production launch (target <strong>September 2026</strong>). Pre-launch access is beta access and Section 11 applies.</li>
            <li><strong>(b) The first-generation products LeaseFlow and LeadsFlow</strong> — operational and in use today, and <strong>being wound down in Q4 2026</strong> following the Agency&apos;s migration to the next-generation platform. We will support the migration and dispose of residual first-generation data in accordance with the Data Processing Addendum (Section 8).</li>
            <li><strong>(c) DealsFlow</strong> — discontinued on 15 July 2026 and no longer offered.</li>
          </ul>
          <p>
            <strong>3.2</strong> Certain capabilities are described in the products or our materials as planned or pending activation — including WhatsApp messaging, AI-assisted drafting, production payment collection through our open-banking provider, and Dubai Land Department data integrations. <strong>These form part of the Services only if and when we activate them</strong>, and activation of any capability involving new data flows is subject to the safeguards described in the Data Processing Addendum and our Privacy Policy.
          </p>
          <p>
            <strong>3.3</strong> We may improve, extend or modify the Services. We will not materially degrade the core functionality the Agency has subscribed to without the notice described in Section 14.
          </p>
          <p>
            <strong>3.4</strong> &ldquo;<strong>Websites</strong>&rdquo; means our public websites, including keyflowae.com. The Websites are provided for information; product descriptions on them do not form part of any contract unless confirmed in an order.
          </p>

          <h2>4. Accounts and UAE PASS identity</h2>
          <p>
            <strong>4.1 Next-generation platform.</strong> Sign-in is through <strong>UAE PASS</strong>, the UAE&apos;s national digital identity. Identity is verified at the source: <strong>KeyFlow does not set, hold or manage passwords</strong> for the platform. Each account is bound to a verified individual identity, and actions taken in the platform are attributed to that identity in the audit record.
          </p>
          <p>
            <strong>4.2</strong> UAE PASS is operated by Digital Dubai as an independent government service under its own terms and privacy policy. Authentication and digital signing occur at the individual&apos;s initiation; KeyFlow is not responsible for the availability of UAE PASS or for its handling of personal data.
          </p>
          <p>
            <strong>4.3 First-generation products</strong> use email-and-password credentials until wind-down. The Agency must ensure its Authorised Users keep credentials confidential and must notify us promptly at <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a> of any suspected unauthorised access to any account.
          </p>
          <p>
            <strong>4.4</strong> The Agency controls access for its organisation through Console — inviting and removing Authorised Users and granting or revoking capabilities. The Agency is responsible for keeping those grants current, including removing leavers without delay.
          </p>

          <h2>5. Acceptable use</h2>
          <p>The Agency must not, and must ensure its Authorised Users and Clients do not:</p>
          <ul>
            <li>(a) use the Services in breach of any applicable law, including UAE and DIFC law and RERA rules;</li>
            <li>(b) upload or transmit unlawful, infringing or malicious content, or instruct the processing of Special Categories of Personal Data through the Services;</li>
            <li>(c) attempt to access another agency&apos;s data, probe, scan or test the vulnerability of the Services, or circumvent authentication, tenant isolation or capability controls;</li>
            <li>(d) reverse-engineer, copy or resell the Services, or access them to build a competing product;</li>
            <li>(e) use the Services to send spam or unsolicited communications in breach of applicable law;</li>
            <li>(f) impose an unreasonable load on the Services through automated means, or use scraping tools against the Services or Websites; or</li>
            <li>(g) misrepresent an identity, or sign or submit documents without authority to do so.</li>
          </ul>

          <h2>6. Agency responsibilities</h2>
          <p>
            <strong>6.1 Lawful basis.</strong> The Agency determines the purposes of processing its Clients&apos; personal data in the Services. The Agency warrants that it has a lawful basis for the processing it instructs, that it has given its clients the information required by applicable data protection law, and that its instructions to KeyFlow are lawful (this mirrors clause 2.2 of the Data Processing Addendum).
          </p>
          <p>
            <strong>6.2 Accuracy.</strong> The Agency is responsible for the accuracy and completeness of the data it and its Authorised Users enter into the Services, and for correcting it when it learns of inaccuracy.
          </p>
          <p>
            <strong>6.3 Regulatory compliance.</strong> The Agency remains solely responsible for its own regulatory obligations as a real-estate business — including RERA licensing and advertising rules, Ejari registration obligations, and anti-money-laundering obligations. The Services support these workflows; they do not discharge the Agency&apos;s obligations.
          </p>
          <p>
            <strong>6.4 Its people.</strong> The Agency is responsible for its Authorised Users&apos; compliance with these Terms and for the consequences of the capabilities it grants them.
          </p>

          <h2>7. Fees</h2>
          <p>
            <strong>7.1 [TO CONFIRM — commercial terms.]</strong> The Agency&apos;s current use of the Services is under an <strong>unpaid pilot / beta arrangement</strong>: no fees are payable until the parties agree a paid plan in writing. Placeholder terms to be settled before or at general availability:
          </p>
          <ul>
            <li>pricing plans and included usage <strong>[TO CONFIRM]</strong>;</li>
            <li>invoicing cycle and payment terms <strong>[TO CONFIRM]</strong>;</li>
            <li>taxes: fees exclusive of VAT and similar taxes, which the Agency bears <strong>[TO CONFIRM]</strong>;</li>
            <li>consequences of late payment (interest, suspension after notice) <strong>[TO CONFIRM]</strong>.</li>
          </ul>
          <p>
            <strong>7.2</strong> We will give the Agency reasonable advance written notice before any transition from unpaid pilot terms to paid terms, and paid terms take effect only on the Agency&apos;s acceptance of an order or updated Terms.
          </p>

          <h2>8. Data protection</h2>
          <p>
            <strong>8.1 The Data Processing Addendum published at <a href="/dpa">keyflowae.com/dpa</a> (the &ldquo;DPA&rdquo;) forms an integral part of these Terms.</strong> It is incorporated into these Terms by reference, and, in respect of the processing of personal data, <strong>the DPA prevails over these Terms</strong> to the extent of any conflict.
          </p>
          <p>
            <strong>8.2</strong> For personal data the Agency&apos;s business puts into the Services (&ldquo;Agency Personal Data&rdquo; as defined in the DPA), <strong>the Agency is the Controller and KeyFlow is the Processor</strong>, acting on the Agency&apos;s documented instructions under the DPA. For platform account identity, security and audit records, KeyFlow acts as Controller as described in our Privacy Policy at <a href="/privacy-policy">keyflowae.com/privacy-policy</a>.
          </p>
          <p>
            <strong>8.3</strong> The Services are hosted in <strong>AWS ap-southeast-1 (Singapore)</strong>, an adequate jurisdiction under the DIFC Data Protection Law. Sub-processors, international transfers and security measures are as set out in the DPA. <strong>UAE PASS / Digital Dubai and the Dubai Land Department are independent controllers of their own government services and are not sub-processors of KeyFlow.</strong>
          </p>
          <p>
            <strong>8.4</strong> On the end of the Services, clause 4(g) of the DPA governs the return or deletion of Agency Personal Data, subject to the statutory retention carve-outs in KeyFlow&apos;s Retention &amp; Erasure Schedule (including the 7-year audit log and 15-year signed-document horizons).
          </p>

          <h2>9. Confidentiality</h2>
          <p>
            <strong>9.1</strong> Each party must keep confidential the non-public information it receives from the other in connection with the Services (including, for KeyFlow, the Agency&apos;s business data; and, for the Agency, non-public product, security and pricing information), use it only for the purposes of these Terms, and protect it with at least reasonable care.
          </p>
          <p>
            <strong>9.2</strong> These obligations do not apply to information that is public through no fault of the recipient, already lawfully held, independently developed, or required to be disclosed by law or a competent authority — in which case the recipient gives prompt notice where lawful. They survive termination for five years, and indefinitely for personal data.
          </p>

          <h2>10. Intellectual property</h2>
          <p>
            <strong>10.1</strong> KeyFlow and its licensors own the Services, the Websites, and all software, designs and documentation, including improvements. The Agency receives a <strong>non-exclusive, non-transferable licence</strong> to use the Services for its internal business during the term, for its Authorised Users and Clients.
          </p>
          <p>
            <strong>10.2 The Agency owns its data.</strong> The Agency grants KeyFlow a licence to host, process, transmit and display Agency data solely to provide and secure the Services, as instructed under the DPA.
          </p>
          <p>
            <strong>10.3</strong> If the Agency gives us feedback or suggestions, we may use them without restriction or obligation, provided doing so never identifies the Agency or discloses its confidential information.
          </p>
          <p>
            <strong>10.4</strong> &ldquo;KeyFlow&rdquo;, the product names (Arc, Atlas, Connect, Ledger, Console, Keys, LeaseFlow, LeadsFlow) and associated logos are trademarks of KeyFlow. No rights in them are granted beyond what these Terms state.
          </p>

          <h2>11. Service levels and beta status</h2>
          <p>
            <strong>11.1 Pre-launch surfaces are beta.</strong> Until general availability, the next-generation platform is provided <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>: features may change or be withdrawn, data models may evolve, and availability is not guaranteed. We will take reasonable care, but beta access is provided without warranties or service-level commitments.
          </p>
          <p>
            <strong>11.2</strong> The first-generation products are mature but in wind-down; they are maintained on a reasonable-efforts basis until migration completes in Q4 2026.
          </p>
          <p>
            <strong>11.3</strong> A production service-level commitment for the next-generation platform will be published at or before general availability <strong>[TO CONFIRM — target uptime, support channels and response times]</strong>.
          </p>
          <p>
            <strong>11.4</strong> We may perform maintenance, with advance notice where it is planned and material. Nothing in this Section limits our obligations under the DPA.
          </p>

          <h2>12. Suspension and termination</h2>
          <p>
            <strong>12.1 Suspension.</strong> We may suspend some or all access — giving prior notice where practicable, and otherwise notice as soon as practicable — where: (a) the Agency materially breaches these Terms (including Section 5) and, where curable, fails to cure within 14 days of notice; (b) suspension is necessary to protect the security or integrity of the Services or other customers&apos; data; (c) we are required to do so by law or a competent authority; or (d) undisputed fees (once payable) remain unpaid after notice <strong>[TO CONFIRM]</strong>. We will limit suspension in scope and duration to what is necessary.
          </p>
          <p>
            <strong>12.2 Termination.</strong> Either party may terminate: (a) for convenience on <strong>30 days&apos; written notice</strong> (during the unpaid pilot, either party may terminate on 14 days&apos; notice); or (b) immediately for a material breach that is not cured within 14 days of notice, or that is incapable of cure.
          </p>
          <p>
            <strong>12.3 Effect.</strong> On termination or expiry: access ends; each party returns or destroys the other&apos;s confidential information on request; and <strong>Agency Personal Data is returned or deleted at the Agency&apos;s choice in accordance with clause 4(g) of the DPA</strong> and the Retention &amp; Erasure Schedule, save where statute requires retention (in which case the data is isolated and processed for no other purpose). Sections 8 (in respect of surviving processing), 9, 10, 12.3, 13, 15 and 16 survive.
          </p>

          <h2>13. Liability</h2>
          <p>
            <strong>13.1 Nothing in these Terms excludes or limits</strong> liability for fraud or wilful misconduct, or any liability that cannot be excluded or limited under applicable law. Consistent with clause 6.1 of the DPA, nothing limits a party&apos;s liability for its own breach of the DIFC Data Protection Law that results in an administrative fine or Data Subject compensation attributable to that party&apos;s non-compliance.
          </p>
          <p>
            <strong>13.2</strong> Subject to Section 13.1, neither party is liable for indirect or consequential loss, loss of profits, revenue, goodwill or anticipated savings, or loss or corruption of data to the extent caused by the other party&apos;s failure to follow documented backup or export guidance.
          </p>
          <p>
            <strong>13.3</strong> Subject to Sections 13.1 and 13.2, each party&apos;s aggregate liability arising out of or in connection with these Terms in any 12-month period is capped at <strong>the greater of (a) the fees paid or payable by the Agency for the Services in the 12 months preceding the first event giving rise to liability, and (b) AED [TO CONFIRM — floor amount appropriate to the unpaid pilot, e.g. AED 10,000]</strong>.
          </p>
          <p>
            <strong>13.4</strong> The Services depend on third-party services outside our control — including UAE PASS, government registries, app stores, and telecommunications networks. We are not liable for their unavailability or acts, without prejudice to our obligations for our sub-processors under the DPA.
          </p>

          <h2>14. Changes to these Terms</h2>
          <p>
            <strong>14.1</strong> We may update these Terms. We will give the Agency at least <strong>14 days&apos; notice</strong> of changes by email to the Agency&apos;s registered administrative contact and in-product notice, identifying the new version and its effective date.
          </p>
          <p>
            <strong>14.2 Material changes</strong> — changes that reduce the Agency&apos;s rights, expand its obligations, introduce or increase fees, or alter the data-protection position — take effect for the Agency only on <strong>re-acceptance through the in-product consent gate</strong>. If the Agency does not accept, it may continue on the prior version until the end of its then-current term or 60 days, whichever is longer, and may terminate under Section 12.2(a) without penalty.
          </p>
          <p>
            <strong>14.3</strong> Non-material changes take effect on the stated date; continued use after notice constitutes acceptance. The version and effective date are always displayed at <a href="/terms-of-service">keyflowae.com/terms-of-service</a>.
          </p>

          <h2>15. Governing law and jurisdiction</h2>
          <p>
            These Terms, the DPA and any dispute or claim arising out of or in connection with them (including non-contractual disputes) are governed by the <strong>laws of the Dubai International Financial Centre</strong>, and the parties submit to the <strong>exclusive jurisdiction of the DIFC Courts</strong>.
          </p>

          <h2>16. General</h2>
          <p>
            <strong>16.1 Entire agreement.</strong> These Terms, the DPA, the Privacy Policy (in respect of personal data as it describes) and any signed order form the entire agreement between the parties regarding the Services and supersede all prior versions, including Version 1.x published under the keyflow.me domain.
          </p>
          <p>
            <strong>16.2 Order of precedence.</strong> A signed order prevails over these Terms; the DPA prevails over both in respect of personal data processing.
          </p>
          <p>
            <strong>16.3 Assignment.</strong> Neither party may assign these Terms without the other&apos;s prior written consent, except that KeyFlow may assign them to a successor in a merger, acquisition or sale of substantially all its assets, with notice to the Agency.
          </p>
          <p>
            <strong>16.4 Notices.</strong> Notices to the Agency go to its registered administrative email and are effective when sent; notices to KeyFlow go to <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a> or by post to the registered address in Section 1.1.
          </p>
          <p>
            <strong>16.5 Force majeure.</strong> Neither party is liable for delay or failure caused by events beyond its reasonable control, provided it notifies the other and uses reasonable efforts to mitigate.
          </p>
          <p>
            <strong>16.6 No waiver; severability.</strong> A failure to enforce a right is not a waiver. If a provision is held invalid, the remainder continues in effect, and the provision is modified to the minimum extent needed to make it valid.
          </p>

          <h2>17. Contact</h2>
          <table>
            <thead><tr><th>Purpose</th><th>Contact</th></tr></thead>
            <tbody>
              <tr><td>General and legal notices</td><td><a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></td></tr>
              <tr><td>Data protection (DPO)</td><td>Abdallah Alshaqra, Data Protection Officer — <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></td></tr>
              <tr><td>Post</td><td>KeyFlow Technology Ltd, Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE</td></tr>
              <tr><td>Web</td><td><a href="/contact">keyflowae.com/contact</a></td></tr>
            </tbody>
          </table>
          <p>
            Data-subject rights and privacy questions are handled as described in the Privacy Policy at <a href="/privacy-policy">keyflowae.com/privacy-policy</a>, which also explains how to contact the DIFC Commissioner of Data Protection.
          </p>

          <h2>Document Control</h2>
          <table>
            <thead><tr><th>Version</th><th>Date</th><th>Author</th><th>Changes</th></tr></thead>
            <tbody>
              <tr><td>1.0</td><td>22 February 2026</td><td>Abdallah Al Shaqra (CEO / Interim DPO)</td><td>Initial version covering all Keyflow products (LeaseFlow, LeadsFlow, Connect, keyflowae.com).</td></tr>
              <tr><td>2.0</td><td>22 July 2026</td><td>Abdallah Alshaqra (Founder &amp; CEO / Interim DPO)</td><td>Full rewrite: unified versioning with the Privacy Policy (single v2.0 tracked by the consent gate); agency-as-customer model; UAE PASS identity; next-generation platform (Arc, Atlas, Connect, Ledger, Console, Keys); first-generation wind-down and DealsFlow discontinuation; Data Processing Addendum incorporated by reference at keyflowae.com/dpa; supersedes all v1.x terms published under the keyflow.me domain.</td></tr>
            </tbody>
          </table>
          <p><strong>Review Schedule:</strong> Annually at minimum, or when Services or regulatory requirements change materially.</p>
          <p><strong>Next review date:</strong> 22 July 2027</p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            KeyFlow Technology Ltd — Terms of Service v2.0 — effective 22 July 2026. Supersedes all v1.x terms. The Data Processing Addendum at keyflowae.com/dpa forms an integral part of these Terms.
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

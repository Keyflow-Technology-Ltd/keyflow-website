import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — KeyFlow Technology Ltd",
  description:
    "KeyFlow Technology Ltd Privacy Policy covering the Keyflow platform (Arc, Atlas, Connect, Ledger, Console, Keys), LeaseFlow, LeadsFlow and keyflowae.com. DIFC Data Protection Law compliant. Version 2.0, effective 22 July 2026.",
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
          KeyFlow Privacy Policy
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
          [&_strong]:text-white
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#C9A87C] [&_blockquote]:pl-4 [&_blockquote]:text-[#ccc]"
        >
          <p>
            <strong>KeyFlow Technology Ltd</strong> (trading as &ldquo;KeyFlow&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)<br />
            DIFC Commercial Licence <strong>CL-12435</strong> &middot; Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE
          </p>
          <table>
            <tbody>
              <tr><td><strong>Version</strong></td><td>2.0</td></tr>
              <tr><td><strong>Effective date</strong></td><td>22 July 2026</td></tr>
              <tr><td><strong>Supersedes</strong></td><td>Version 1.x (published under a superseded domain; no longer in effect)</td></tr>
              <tr><td><strong>Canonical location</strong></td><td><a href="/privacy-policy">https://keyflowae.com/privacy-policy</a> (linked from all KeyFlow products)</td></tr>
              <tr><td><strong>Data Protection Officer</strong></td><td>Abdallah Alshaqra (interim) — <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></td></tr>
            </tbody>
          </table>
          <p>
            KeyFlow Technology Ltd is a company incorporated in the Dubai International Financial Centre (&ldquo;DIFC&rdquo;). We are committed to processing Personal Data in accordance with the <strong>DIFC Data Protection Law, DIFC Law No. 5 of 2020 (as amended)</strong> (&ldquo;the DP Law&rdquo;) and the DIFC Data Protection Regulations. This Policy explains what Personal Data we collect, why we collect it, how we process, store, transfer and protect it, and the rights you have. Capitalised terms not defined here have the meanings given in the DP Law.
          </p>
          <p>This Policy applies from its effective date to all of the following (&ldquo;<strong>the Services</strong>&rdquo;):</p>
          <ul>
            <li>the <strong>KeyFlow marketing website</strong> at keyflowae.com;</li>
            <li>the <strong>next-generation Keyflow platform</strong> — the Arc, Atlas, Connect, Ledger, Console and Keys applications (web and iOS) used by real-estate agencies and their clients;</li>
            <li>the <strong>first-generation products LeaseFlow</strong> (leaseflow.me) and <strong>LeadsFlow</strong> (leadsflow.me), which remain in operation for existing agency customers while they migrate to the next-generation platform.</li>
          </ul>
          <p>The first-generation product DealsFlow was discontinued on 15 July 2026 and held no Personal Data at discontinuation.</p>

          <h2>1. Scope and Application</h2>

          <h3>1.1 Who this Policy is for</h3>
          <p>
            This Policy applies to everyone whose Personal Data we process through the Services, wherever in the world you are located: visitors to our website; staff of the real-estate agencies that use our platform (brokers, administrators, finance staff); the agencies&apos; clients — <strong>tenants, landlords and property owners, buyers, sellers and prospective clients</strong> — including users of the <strong>Keys</strong> app; signatories to documents executed through the platform; and our business and supplier contacts.
          </p>

          <h3>1.2 The two roles KeyFlow plays — and why it matters to you</h3>
          <p>KeyFlow processes Personal Data in two distinct capacities, and your rights are exercised through a different door depending on which applies:</p>
          <ul>
            <li><strong>KeyFlow as Controller.</strong> We decide the purposes and means of processing for: your platform account and verified identity, security and audit logging, session management, push-notification delivery, the handling of data-protection rights requests, our website, and our own corporate and supplier records. For this data, <strong>this Policy is your notice and KeyFlow is your point of contact.</strong></li>
            <li><strong>KeyFlow as Processor.</strong> The real-estate agency you deal with is the Controller of its own client records — its CRM entries, tenancy and sale records, messages, documents and financial records held in the platform. We process that data <strong>only on the agency&apos;s documented instructions</strong> under a written data processing agreement that complies with Article 24 of the DP Law. For this data, <strong>the agency is responsible for the lawfulness of the processing and for answering your rights requests, and we assist it in doing so.</strong> If you contact us about agency-held data, we will route your request to the agency without undue delay and support its response (see Section 6.5).</li>
          </ul>

          <h3>1.3 If you use the Keys app (tenants, owners, buyers) — in plain language</h3>
          <p>Keys is the client app of the Keyflow platform. If your agency invites you to use it:</p>
          <ul>
            <li>You sign in with <strong>UAE PASS</strong>, the UAE&apos;s national digital identity. You authenticate directly with UAE PASS, at your own initiation; we never see or hold a password for you. UAE PASS shares verified identity attributes with us (see Section 2.1).</li>
            <li>You can view your documents, receive offer letters, and <strong>sign contracts electronically through UAE PASS</strong> — again at your own request, for each individual document.</li>
            <li>If you set up <strong>rent auto-debit</strong>, the mandate is operated with our regulated payment partner. <strong>Your bank credentials never touch KeyFlow&apos;s systems</strong>; we hold only the mandate details (limits, validity window, authorisation and revocation records).</li>
            <li>Your tenancy, purchase and payment records in Keys belong to your agency&apos;s relationship with you: the <strong>agency is the Controller</strong> of those records and KeyFlow processes them on the agency&apos;s behalf. Your KeyFlow account itself (your verified identity, sessions, notification settings) is controlled by KeyFlow.</li>
            <li>Linking your Keys account to an agency&apos;s records happens under two-party control: you initiate the link with your UAE PASS-verified identity, and the agency explicitly approves it. No agency can see another agency&apos;s data about you.</li>
          </ul>

          <h3>1.4 Children</h3>
          <p>
            The Services are directed at adults engaged in real-estate business and transactions. We do not knowingly collect Personal Data from children, and no part of the Services is designed for or targeted at them.
          </p>

          <h2>2. Collection of Information</h2>

          <h3>2.1 Information you give us, or that is verified at the source</h3>
          <p>Wherever possible we obtain identity data from <strong>official sources rather than asking you to type it in or upload scans</strong>:</p>
          <ul>
            <li><strong>UAE PASS identity attributes</strong> (when you authenticate or sign): full name (English and Arabic), Emirates ID number, email address, mobile number, nationality, gender, identity-assurance level and UAE PASS identifier.</li>
            <li><strong>Account and profile information</strong> you or your organisation provide: role, agency membership, RERA agent identifiers for brokers, notification preferences.</li>
            <li><strong>Enquiries and correspondence</strong>: information you provide when you contact us, submit a form on our website, or communicate through the platform.</li>
            <li><strong>Transaction information</strong> entered in the course of using the Services: tenancy and sale terms, invoices, payment and post-dated cheque records, auto-debit mandate details, maintenance requests, and documents generated or uploaded in the Services.</li>
          </ul>

          <h3>2.2 Information collected about you by your agency</h3>
          <p>
            Where you are a client or prospective client of a real-estate agency using our platform, the agency may record information about you in the Services (contact details, enquiry details, tenancy or transaction records). The agency is the Controller of that data (Section 1.2) and is responsible for informing you under Articles 29–30 of the DP Law; where required, notice is also given at our first communication with you through the platform.
          </p>

          <h3>2.3 Information we collect about you and your device</h3>
          <ul>
            <li><strong>Device information</strong>: for the iOS apps, a push-notification device token and basic device characteristics needed to deliver notifications.</li>
            <li><strong>Log and session information</strong>: IP address, browser user agent, session identifiers (stored hashed), sign-in and sign-out events, and timestamps.</li>
            <li><strong>Audit records</strong>: the platform keeps an append-only audit log of every data change — who did what, when, and from where — as a security and accountability measure.</li>
            <li><strong>Website data</strong>: the marketing website is a static site; analytics data is collected <strong>only if you opt in</strong> (see Section 8).</li>
          </ul>
          <p>We do not collect GPS or continuous location data through any of the Services.</p>

          <h3>2.4 Special Categories of Personal Data</h3>
          <p>
            We do not intentionally process Special Categories of Personal Data (such as data revealing racial or ethnic origin, beliefs, health or biometric identification data). UAE PASS performs any biometric verification inside its own service; we receive identity attributes only, not biometric data.
          </p>

          <h2>3. Use of Personal Data</h2>
          <p>We use Personal Data, in each case with a documented lawful basis under Article 10 of the DP Law, to:</p>
          <ul>
            <li><strong>provide, maintain and improve the Services</strong> — operating accounts, agency workspaces, property and tenancy management, messaging, documents, e-signing, invoicing and payments (contract; consent for actions you initiate such as UAE PASS authentication, signing and auto-debit mandates);</li>
            <li><strong>verify identity at the source</strong> — anchoring accounts on UAE PASS attributes and matching brokers against Dubai Land Department agent records (consent and contract);</li>
            <li><strong>deliver operational notifications</strong> — service messages, signing requests, payment and tenancy notices (contract). Operational messages are not marketing and continue while you use the Services;</li>
            <li><strong>send marketing communications only with your prior opt-in consent</strong>, which is never pre-ticked and is as easy to withdraw as to give (consent — see Section 6.1);</li>
            <li><strong>maintain security, prevent fraud and keep evidence</strong> — access control, session management, tenant isolation, audit logging of every data change, incident investigation (legitimate interests, which the DP Law recognises for network and information security, and legal obligation);</li>
            <li><strong>comply with legal and regulatory obligations</strong> — statutory record-keeping, tax and audit retention, responding to valid requests from public authorities (legal obligation — see Section 5.4);</li>
            <li><strong>administer data-protection rights requests</strong> and keep the records the DP Law requires of us (legal obligation);</li>
            <li><strong>notify you of changes</strong> to the Services, this Policy or our terms.</li>
          </ul>
          <p>Where KeyFlow acts as Processor, we use agency-controlled data only as instructed by the agency and never for our own purposes.</p>

          <h2>4. Processing, Storage and Transfer of Personal Data</h2>

          <h3>4.1 Fair and lawful processing</h3>
          <p>
            All processing is conducted fairly, lawfully and transparently in accordance with the DP Law. Each processing activity, its purpose and its lawful basis are documented in our Record of Processing Activities, which is maintained under Article 15 of the DP Law and available to the Commissioner of Data Protection.
          </p>

          <h3>4.2 Automated decision-making</h3>
          <p>
            <strong>We do not make any decision based solely on automated processing that produces legal effects concerning you or otherwise significantly affects you.</strong> The platform&apos;s automations — such as lead-assignment and reminder rules — are deterministic, human-defined rules, and no such automation produces legal or similarly significant effects without human involvement. AI-assisted features are not currently active on the platform; <strong>if and when they are activated, they will be introduced only with the controls required by Regulation 10 of the DIFC Data Protection Regulations</strong> (including impact assessment, user notices at first use and human review), and this Policy will be updated before their introduction.
          </p>

          <h3>4.3 Where your data is processed and stored</h3>
          <ul>
            <li><strong>Primary hosting: AWS Singapore (ap-southeast-1).</strong> Singapore is recognised as an <strong>adequate jurisdiction</strong> under Article 26 of the DP Law and Appendix 3 of the DIFC Data Protection Regulations, so this storage requires no additional transfer safeguard. Databases are encrypted at rest in private, isolated networks; documents are stored encrypted with public access blocked.</li>
            <li><strong>Onshore UAE (outside the DIFC)</strong>: certain flows go to UAE government services <strong>at your own initiation</strong> — UAE PASS authentication and digital signing (with your explicit consent and as necessary for the transaction you request, under Article 27(3) of the DP Law), and Dubai Land Department verifications (conducted under the government data-sharing procedure in Section 5.4). Documents transmitted for signing are limited to the signing transaction.</li>
            <li><strong>Limited transfers to the USA</strong>: delivery of push notifications through Apple&apos;s notification service, minimised to the device token and the notification content. Meta/WhatsApp messaging is <strong>not currently active</strong>; if activated, it will operate only once safeguards compliant with Article 27 of the DP Law are in place.</li>
            <li><strong>Legacy first-generation file storage</strong> for LeaseFlow and LeadsFlow partially remains in AWS UAE (me-central-1) under KeyFlow&apos;s sole control; that storage is being consolidated to Singapore, to be completed before the next-generation platform&apos;s production launch.</li>
          </ul>
          <p>
            Every transfer jurisdiction is declared in our notification to the Commissioner of Data Protection. Any other transfer to a non-adequate jurisdiction would take place only under DIFC-approved safeguards (such as the DIFC Standard Contractual Clauses) or a specific derogation permitted by Article 27.
          </p>

          <h3>4.4 How long we keep Personal Data</h3>
          <p>We keep Personal Data in identifiable form no longer than necessary, under a documented Retention &amp; Erasure Schedule. The key periods:</p>
          <table>
            <thead><tr><th>Data</th><th>Retention</th></tr></thead>
            <tbody>
              <tr><td>Account and identity records</td><td>Life of the account; erased (by anonymisation) on account closure or an executed erasure request</td></tr>
              <tr><td>Sessions and session metadata (IP, user agent)</td><td>Hard-deleted 30 days after session expiry</td></tr>
              <tr><td>Audit log</td><td>7 years (deleted automatically thereafter)</td></tr>
              <tr><td>Signed contracts and signing events</td><td>15 years from execution (regulated-document horizon)</td></tr>
              <tr><td>Financial records (invoices, payments, cheques)</td><td>Minimum 5 years (UAE VAT), within a 15-year envelope for property-transaction documents</td></tr>
              <tr><td>Leads and unconverted contacts (agency-controlled)</td><td>Default: 2 years after last activity, subject to the agency&apos;s instructions</td></tr>
              <tr><td>Messages (agency-controlled)</td><td>Life of the agency–client relationship + 2 years, subject to the agency&apos;s instructions</td></tr>
              <tr><td>Rights-request records</td><td>7 years, as compliance evidence</td></tr>
            </tbody>
          </table>
          <p>
            When a retention period ends, or the lawful basis for processing lapses, data is securely deleted, anonymised or — where neither is possible (for example, backup snapshots pending expiry) — archived beyond use in accordance with Article 22 of the DP Law. Our standard erasure method is irreversible anonymisation, which removes your identity while preserving the integrity of financial and legal records that the law requires us to keep.
          </p>

          <h3>4.5 Accuracy</h3>
          <p>
            Identity attributes anchored on UAE PASS and Dubai Land Department records are verified at the source. You may ask us — or, for agency-held records, your agency — to correct inaccurate or incomplete data at any time (Section 6.3), and corrections are passed on to recipients of the data where required.
          </p>

          <h2>5. Sharing of Personal Data</h2>

          <h3>5.1 Through the Services</h3>
          <p>
            Data you or your agency enter into the platform is visible to authorised users within that agency&apos;s workspace under its own access rules. <strong>Strict tenant isolation applies: no agency can see another agency&apos;s data.</strong> The only cross-boundary mechanism is client account linking in Keys, which requires both your UAE PASS-verified initiation and the agency&apos;s explicit approval.
          </p>

          <h3>5.2 Service providers (processors)</h3>
          <p>We disclose Personal Data to service providers who process it on our documented instructions under written agreements meeting Article 24 of the DP Law:</p>
          <table>
            <thead><tr><th>Provider</th><th>Purpose</th><th>Location</th></tr></thead>
            <tbody>
              <tr><td>Amazon Web Services</td><td>Infrastructure — compute, database, document storage, email delivery</td><td>Singapore (ap-southeast-1); legacy first-generation file storage in AWS UAE pending consolidation</td></tr>
              <tr><td>Atlassian</td><td>Operational and support tooling</td><td>Cloud</td></tr>
              <tr><td>Microsoft 365</td><td>Corporate email</td><td>Cloud</td></tr>
              <tr><td>Apple</td><td>Push-notification delivery</td><td>USA (device tokens and notification content only)</td></tr>
              <tr><td>Lean Technologies</td><td>Payment initiation and account information services (currently sandbox/testing only)</td><td>UAE/ADGM</td></tr>
              <tr><td>Meta Platforms</td><td>Lead Ads retrieval (where an agency connects its own account); WhatsApp messaging <strong>only when activated</strong>, with Article 27 safeguards in place first</td><td>USA</td></tr>
            </tbody>
          </table>

          <h3>5.3 Independent government services</h3>
          <p>
            <strong>UAE PASS / Digital Dubai and the Dubai Land Department are not our service providers.</strong> They are independent controllers of their own government services. You interact with UAE PASS directly when you authenticate or sign, under UAE PASS&apos;s own terms and privacy notice; we interface with the Dubai Land Department as a public authority under the procedure below.
          </p>

          <h3>5.4 Government data sharing and lawful disclosures</h3>
          <p>
            Where a public authority requests disclosure of Personal Data, we follow a mandatory procedure aligned with Article 28 of the DP Law: every request is verified for identity and legal basis, assessed for proportionality, narrowed to the minimum data necessary, disclosed only with written confidentiality assurances where practicable, recorded, and — where the data is agency-controlled — notified to the agency unless the law prohibits it. Where the validity of a request is in doubt, we may consult the Commissioner of Data Protection before responding.
          </p>

          <h3>5.5 Other disclosures</h3>
          <p>
            We may disclose Personal Data where required by Applicable Law (including fraud prevention), or in connection with a corporate transaction such as a merger or acquisition — in which case confidentiality protections apply and you will be notified where the law requires. We do not sell Personal Data, and we have no corporate group with which data is shared.
          </p>

          <h2>6. Your Rights and Choices</h2>

          <h3>6.1 Marketing and preferences</h3>
          <p>
            Marketing communications are sent <strong>only with your prior opt-in consent</strong>, which is never pre-ticked. You may withdraw consent at any time — via the unsubscribe link in any marketing message, your account settings, or by contacting us — and withdrawal is as easy as giving consent was. Transactional and service messages (for example, signing requests and payment notices) are not marketing and continue while you use the Services.
          </p>

          <h3>6.2 Your rights under the DP Law</h3>
          <p>Under Articles 32–40 of the DP Law you have the right, at any time and for any reason, to:</p>
          <ul>
            <li><strong>withdraw consent</strong> to processing based on consent (Article 32);</li>
            <li><strong>access</strong> your Personal Data and receive a copy of it (Article 33);</li>
            <li><strong>rectify</strong> inaccurate or incomplete data (Article 33);</li>
            <li><strong>erasure</strong> of your data, where the legal grounds apply (Article 33);</li>
            <li><strong>object</strong> to processing — including an <strong>absolute right to object to direct marketing</strong> (Article 34);</li>
            <li><strong>restrict</strong> processing in the circumstances the DP Law defines (Article 35);</li>
            <li><strong>data portability</strong> — receive the data you provided in a structured, commonly used, machine-readable format (Article 37);</li>
            <li>object to <strong>solely automated decisions</strong> producing legal or similarly significant effects, and require human review (Article 38 — noting that we make no such decisions, per Section 4.2); and</li>
            <li><strong>lodge a complaint with the Commissioner of Data Protection</strong> at any time (contact details at the end of this Policy).</li>
          </ul>

          <h3>6.3 How requests are handled</h3>
          <ul>
            <li>Requests are actioned <strong>free of charge</strong> and answered <strong>within one month</strong> of receipt. For complex or numerous requests the DP Law permits a two-month extension; if we need one, we will tell you within the first month, with reasons. A reasonable fee may be charged only for manifestly unfounded or excessive requests, or for extraordinary administrative costs, with written reasons.</li>
            <li>We verify your identity before disclosing data; where we have genuine doubt, the response clock pauses until identity is established. Other people&apos;s Personal Data is redacted from what we provide.</li>
            <li><strong>You will never be discriminated against for exercising your rights</strong> (Article 39): we will not deny you the Services, or vary their price or quality, because you exercised a right.</li>
          </ul>

          <h3>6.4 Limits on erasure — stated prominently</h3>
          <p>Some records cannot be erased on request, and the DP Law requires us to tell you this clearly:</p>
          <ul>
            <li><strong>Signed contracts</strong> are legally immutable documents: altering an executed, digitally signed contract would destroy its validity. Signed documents are retained for 15 years from execution.</li>
            <li><strong>Audit-log entries</strong> are an append-only, tamper-evident security record and are retained for 7 years, after which they are deleted automatically.</li>
            <li><strong>Financial records</strong> (invoices, payments, cheque records) are retained for their statutory periods and are never deleted on request during those periods.</li>
          </ul>
          <p>
            In each case, when your erasure request is executed you disappear from all live, operational systems by irreversible anonymisation; what remains is a sealed historical record kept solely as legal evidence, protected by the same security as live data, used for no decision about you, and deleted when its statutory period ends. Any partial refusal of an erasure request is given to you in writing with its legal ground.
          </p>

          <h3>6.5 Data held for your agency</h3>
          <p>
            Where your request concerns records controlled by a real-estate agency (Section 1.2), the agency is responsible for the decision and we assist it: we will route your request to the agency without undue delay, and the platform provides the agency with the tools to respond within the statutory deadline. You may also approach the agency directly.
          </p>

          <h3>6.6 How to make a request</h3>
          <p>
            Use any of the contact methods in the <strong>Contact Us</strong> section below, or the self-service request workflow in the Keys app. Requests made through any channel are honoured.
          </p>

          <h2>7. Security Precautions</h2>
          <p>We protect Personal Data from the point of collection to the point of destruction with technical and organisational measures that include:</p>
          <ul>
            <li><strong>encryption</strong> at rest and in transit (TLS 1.2+), with databases in private, isolated networks and document storage encrypted, versioned and blocked from public access;</li>
            <li><strong>verified identity instead of passwords</strong> — platform users authenticate through UAE PASS, so we hold no passwords; session tokens are stored hashed and can be revoked remotely;</li>
            <li><strong>least-privilege access</strong> — strict per-tenant isolation, capability-based authorisation with per-user restrictions, and production access limited to named personnel;</li>
            <li><strong>accountability tooling</strong> — an append-only audit log of every data change; secrets held in a managed vault; deployment pipelines authenticated without static credentials; encrypted daily backups;</li>
            <li><strong>processor flow-down</strong> — every service provider is bound by written contract to equivalent confidentiality and security obligations;</li>
            <li><strong>incident management</strong> — a documented breach-response procedure providing for notification of the Commissioner of Data Protection and, where required by Article 42 of the DP Law, of affected individuals.</li>
          </ul>
          <p>
            No transmission or storage system can be guaranteed 100% secure. While we apply the safeguards above and review them continuously, we cannot guarantee absolute security; you can help by keeping your UAE PASS credentials and devices secure and by telling us immediately at <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a> if you suspect any misuse of your data or account.
          </p>

          <h2>8. Cookies</h2>
          <p>Cookies are small files placed on your device by a website. Consistent with the DP Law&apos;s data-minimisation requirements, the Services collect the bare minimum necessary:</p>
          <ul>
            <li><strong>Essential cookies (always on)</strong> — strictly necessary for the Services to function: authentication, session management, security. These cannot be switched off, as the Services do not work without them.</li>
            <li><strong>Analytics cookies (opt-in only)</strong> — used to understand aggregate site usage. These are <strong>off by default</strong> and set only if you opt in through the consent banner. You can change or withdraw your choice at any time via the cookie settings on the site; your choice is stored on your own device (in browser local storage under the key <code>keyflow_cookie_consent</code>).</li>
            <li><strong>Advertising cookies</strong> — <strong>we do not use them.</strong></li>
          </ul>
          <p>
            You can also control cookies through your browser settings, including deleting existing cookies and blocking new ones; blocking essential cookies will prevent parts of the Services from working. General guidance on cookies is available at{" "}
            <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.
          </p>

          <h2>9. External Links</h2>
          <p>
            The Services may contain links to third-party websites and services (for example, UAE PASS, government portals or an agency&apos;s own website). This Policy does not apply to those third parties, and we are not responsible for their content or privacy practices. Review the privacy notice of any third-party service before providing Personal Data to it.
          </p>

          <h2>10. Changes to this Policy</h2>
          <p>
            We may update this Policy from time to time. The current version, with its effective date, is always published at <a href="/privacy-policy"><strong>https://keyflowae.com/privacy-policy</strong></a>, and every KeyFlow product links to it. If we make significant changes — including any change to the purposes of processing, the jurisdictions data is transferred to, or the introduction of AI-assisted features under Section 4.2 — we will give notice through the Services (website notice, in-app notice or email) before the change takes effect. This version 2.0, effective 22 July 2026, replaces all previous versions, including those published under a superseded domain.
          </p>

          <h2>Contact Us</h2>
          <p>
            You can contact us about this Policy, our processing of your Personal Data, or to exercise any of your rights, through <strong>any</strong> of the following methods (the DP Law requires us to offer at least two — we offer three):
          </p>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p><strong className="text-white">1. Email:</strong> <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></p>
            <p><strong className="text-white">2. Post:</strong> Data Protection Officer, KeyFlow Technology Ltd, Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE</p>
            <p><strong className="text-white">3. In-app:</strong> the self-service data-request workflow in the Keys app</p>
          </div>
          <p>
            <strong>Data Protection Officer (appointed under Article 16 of the DP Law):</strong> Abdallah Alshaqra (interim DPO) — <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a>.
          </p>
          <p>
            If you are not satisfied with our response, or wish to raise a concern directly, you have the right to lodge a complaint at any time with the <strong>Commissioner of Data Protection</strong>:
          </p>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p className="text-white font-semibold">Commissioner of Data Protection</p>
            <p>Dubai International Financial Centre Authority</p>
            <p>Level 14, The Gate Building, DIFC, Dubai, UAE</p>
            <p>Telephone: +971 4 362 2222</p>
            <p>Email: <a href="mailto:commissioner@dp.difc.ae">commissioner@dp.difc.ae</a></p>
          </div>

          <h2>Document Control</h2>
          <table>
            <thead><tr><th>Version</th><th>Date</th><th>Author</th><th>Changes</th></tr></thead>
            <tbody>
              <tr><td>1.0</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Initial version covering all 4 products</td></tr>
              <tr><td>1.1</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Reclassification: Rekognition usage updated from biometric identity verification to profile photo extraction. Removed special category data classification. Added B2B2C data processing model section. Updated lawful bases.</td></tr>
              <tr><td>1.2</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Updated &ldquo;Terms of Use&rdquo; references to &ldquo;Terms of Service&rdquo; (TOS-2026-001) to align with the unified Terms of Service document covering all Keyflow products.</td></tr>
              <tr><td>2.0</td><td>22 July 2026</td><td>Abdallah Alshaqra (Interim DPO)</td><td>Full rewrite aligned with the next-generation Keyflow platform: unified versioning with the Terms of Service (single v2.0 tracked by the consent gate); Controller/Processor role split; UAE PASS source-verified identity (no document OCR/AI extraction); Singapore (ap-southeast-1) primary hosting as an adequate jurisdiction; updated retention schedule, transfer map and sub-processor list; Regulation 10 commitment for any future AI features; DealsFlow discontinuation recorded. Supersedes all v1.x versions published under a superseded domain.</td></tr>
            </tbody>
          </table>
          <p><strong>Review Schedule:</strong> Annually at minimum, or when processing activities change materially.</p>
          <p><strong>Next review date:</strong> 22 July 2027</p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            KeyFlow Technology Ltd — Privacy Policy version 2.0, effective 22 July 2026.
          </p>
          <p className="text-sm text-[#666] italic">
            KeyFlow Technology Ltd, DIFC Commercial Licence CL-12435, Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue South Zone, DIFC, Dubai, UAE
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

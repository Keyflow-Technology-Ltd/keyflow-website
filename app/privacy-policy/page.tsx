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
          <strong className="text-[#FAFAFA]">Version:</strong> 1.2
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
            It is the policy of Keyflow to respect the privacy of its users across all products and services. In accordance with the DP Law and, as applicable, our Terms of Service (TOS-2026-001), Keyflow collects information about you when you use or access our products and services, including:
          </p>
          <ul>
            <li><strong>LeaseFlow</strong> (leaseflow.me) &mdash; property and lease management platform</li>
            <li><strong>LeadsFlow</strong> (leadsflow.me) &mdash; real estate lead management and CRM</li>
            <li><strong>Connect</strong> (connect.keyflowae.com) &mdash; unified communications hub (WhatsApp Business and email)</li>
            <li><strong>Keyflow Website</strong> (keyflowae.com) &mdash; our corporate website</li>
          </ul>
          <p>(collectively, the &ldquo;Services&rdquo;), as well as through other interactions and communications you have with us.</p>
          <p>
            This data protection policy (the &ldquo;Policy&rdquo;) sets out the basis on which any information, including any personal data, we collect from you, or you provide to us, will be processed by Keyflow. Each time you access or use the Services or provide us with information, by doing so you acknowledge the practices described in this Policy. For use of specific services, you may be asked to provide your affirmative opt-in consent to our use of the information you submit. Your rights described herein apply in these instances as well.
          </p>

          <h2>1. Scope and Application</h2>
          <p>This Policy applies to persons anywhere in the world who access or use any of Keyflow&apos;s Services (&ldquo;Users&rdquo;), including but not limited to:</p>
          <ul>
            <li>Real estate agency administrators, managers, and agents who use the Services</li>
            <li>Property owners who access owner portals</li>
            <li>Tenants and clients whose personal data is managed through the Services</li>
            <li>Leads and prospective clients whose inquiry data is processed through the Services</li>
            <li>Contacts who communicate via WhatsApp Business or email through Connect</li>
            <li>Visitors to the Keyflow website</li>
          </ul>

          <h2>2. Collection of Information</h2>

          <h3>2.1 Information You Give Us</h3>
          <p>This is personal data you give us by providing information or filling in forms on our Services, or by corresponding with us (for example, by telephone, email, WhatsApp, or any other digital or electronic form). It includes information you provide when you register for an account, create or manage lease contracts, submit lead inquiries, communicate through Connect, or report a problem with any of our Services.</p>
          <p>The personal data you give us may include the following categories:</p>
          <p><strong>Identity and Contact Data:</strong></p>
          <ul>
            <li>Full name, email address, phone number, postal address</li>
            <li>Emirates ID number and Emirates ID document images</li>
            <li>Nationality, date of birth</li>
            <li>Passport number and passport document images (where provided)</li>
            <li>Photographs and profile pictures</li>
          </ul>
          <p><strong>Property and Lease Data:</strong></p>
          <ul>
            <li>Property details, unit information, lease terms and conditions</li>
            <li>Rental amounts, payment schedules, deposit information</li>
            <li>Ejari contract details, RERA compliance data, DLD permit numbers</li>
            <li>Lease documents, contracts, and associated correspondence</li>
          </ul>
          <p><strong>Financial Data:</strong></p>
          <ul>
            <li>Bank account details (property owners &mdash; for rental disbursements)</li>
            <li>Commission records, management fee calculations</li>
            <li>Cheque details and payment records</li>
          </ul>
          <p><strong>Lead and Inquiry Data:</strong></p>
          <ul>
            <li>Name, email, phone number</li>
            <li>Property interests, budget, timeline preferences</li>
            <li>Source of inquiry (property portal, social media, website, referral)</li>
            <li>Notes and follow-up records</li>
          </ul>
          <p><strong>Communication Data (Connect):</strong></p>
          <ul>
            <li>WhatsApp messages (sent and received), message delivery status</li>
            <li>Email content, subject lines, attachments</li>
            <li>Contact information, conversation history</li>
          </ul>
          <p><strong>Photographs and Profile Pictures:</strong></p>
          <ul>
            <li>Emirates ID photographs are processed through AWS Rekognition (DetectFaces API) to extract the facial region for use as client profile pictures within LeaseFlow</li>
            <li>This is face detection for photo cropping only &mdash; it is NOT biometric identification, face comparison, or identity verification</li>
            <li>No biometric vectors, embeddings, or comparison data are generated or stored</li>
          </ul>
          <p><strong>Staff and Agent Data:</strong></p>
          <ul>
            <li>Employee names, email addresses, phone numbers</li>
            <li>Roles and permissions, login credentials (passwords stored in hashed form only)</li>
            <li>Performance metrics, activity logs</li>
          </ul>

          <h3>2.2 Information We Collect About You and Your Device</h3>
          <p>Each time you use our Services we may automatically collect the following information:</p>
          <ul>
            <li><strong>Technical Information:</strong> the type of device you use, a unique device identifier, your operating system, browser type and version, time zone setting, language preferences (&ldquo;Device Information&rdquo;)</li>
            <li><strong>Log Information:</strong> details of your use of our Services including, but not limited to, traffic data, access logs, API call records, and the resources that you access (&ldquo;Log Information&rdquo;)</li>
            <li><strong>Location Information:</strong> IP address and general geographic location derived from IP address</li>
          </ul>

          <h3>2.3 Information We Receive from Third Parties</h3>
          <p>We receive personal data from third-party services that integrate with our platform:</p>
          <ul>
            <li><strong>Property portals</strong> (Bayut, PropertyFinder, Dubizzle): lead inquiry data including name, phone, email, and property interest</li>
            <li><strong>Meta Lead Ads</strong> (Facebook/Instagram): lead inquiry data from social media advertising campaigns</li>
            <li><strong>Webhook integrations</strong> (Zapier, custom webhooks): lead data from external systems configured by your agency</li>
          </ul>

          <h2>3. Special Categories of Personal Data</h2>
          <p>Keyflow does <strong>not</strong> process special categories of personal data as defined in Article 9 of the DP Law.</p>
          <p><strong>Clarification on Face Detection:</strong> We use AWS Rekognition (DetectFaces API) within LeaseFlow to detect and crop the facial region from Emirates ID photographs for use as client profile pictures. This is standard image processing for photo extraction &mdash; it does NOT constitute biometric data processing under Article 9 because:</p>
          <ul>
            <li>It is not used for the purpose of uniquely identifying a natural person</li>
            <li>No face comparison (CompareFaces) or identity verification is performed</li>
            <li>No biometric vectors, embeddings, or face collections are created or stored</li>
            <li>Only the detected face bounding box coordinates are used to crop a profile photo</li>
          </ul>
          <p>We do not process data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, data concerning health, or data concerning a person&apos;s sex life or sexual orientation.</p>
          <p><strong>Children&apos;s Data:</strong> Our Services are not targeted at, intended for, or expected to be of use to children under the age of 18. We do not knowingly collect personal data from children.</p>

          <h3>3A. B2B2C Data Processing Model</h3>
          <p>Keyflow operates a business-to-business-to-consumer (B2B2C) model:</p>
          <ul>
            <li><strong>Our direct customers</strong> are real estate agencies who subscribe to our Services.</li>
            <li><strong>Indirect data subjects</strong> include tenants, property owners, and leads whose personal data is input into the platform by the subscribing agency.</li>
            <li><strong>Lawful basis for agency-entered data:</strong> When an agency inputs tenant or property owner data, the lawful basis is primarily contract performance (Article 10(1)(b)) &mdash; the processing is necessary for the tenancy or property management agreement between the agency and the individual. Agencies may also rely on legitimate interest (Article 10(1)(f)) for lead management and operational purposes.</li>
            <li><strong>Agency responsibility:</strong> Each subscribing agency is responsible for ensuring it has the appropriate lawful basis for collecting personal data from its clients (e.g., under the tenancy agreement or management contract). Keyflow provides the platform infrastructure and processing capabilities.</li>
          </ul>

          <h2>4. Use of Personal Data</h2>
          <p>We use personal data which you provide to us or we collect from you for the following purposes:</p>
          <h3>4.1 Service Delivery and Contract Performance (Article 10(1)(b) of the DP Law)</h3>
          <ul>
            <li>Provide, maintain, and improve our Services, including facilitating property management, lease administration, lead management, and communications</li>
            <li>Process and manage lease contracts, rental payments, Ejari registrations, and PropertyFinder listings</li>
            <li>Distribute leads to agents, manage lead lifecycle, and track conversions</li>
            <li>Facilitate WhatsApp Business and email communications through Connect</li>
            <li>Authenticate users, manage accounts and permissions, and provide customer support</li>
            <li>Send transactional communications (e.g., lease reminders, payment confirmations, service notifications)</li>
          </ul>
          <h3>4.2 Legal Obligations (Article 10(1)(c) of the DP Law)</h3>
          <ul>
            <li>Comply with RERA regulations, Ejari registration requirements, and Dubai Land Department requirements</li>
            <li>Maintain audit logs for a minimum of 7 years as required by DIFC regulations</li>
            <li>Respond to lawful requests from regulatory authorities</li>
            <li>Maintain records of processing activities as required by Article 15 of the DP Law</li>
          </ul>
          <h3>4.3 Legitimate Interests (Article 10(1)(f) of the DP Law)</h3>
          <ul>
            <li>Perform internal administrative and operational functions</li>
            <li>Prevent fraud, abuse, and unauthorized access to our Services</li>
            <li>Conduct data analysis, testing, and research to improve our Services</li>
            <li>Troubleshoot software issues and operational problems</li>
            <li>Monitor usage and activity trends for service improvement</li>
            <li>Ensure network and information security</li>
          </ul>
          <h3>4.4 Consent (Article 10(1)(a) of the DP Law)</h3>
          <p>The following processing activities are conducted only with your explicit consent, which you may withdraw at any time:</p>
          <ul>
            <li>Marketing and promotional email communications</li>
            <li>Marketing SMS communications</li>
            <li>Marketing phone communications</li>
            <li>Analytics cookies and tracking technologies</li>
            <li>Sharing data with third parties for marketing purposes</li>
            <li>Automated profiling and lead scoring</li>
          </ul>
          <h3>4.5 AI-Powered Processing</h3>
          <p>Keyflow uses artificial intelligence services provided by AWS to enhance the Services:</p>
          <ul>
            <li><strong>AWS Bedrock (Claude Haiku):</strong> Intelligent document analysis for lease contracts and property documents. Documents are sent to the AI service for analysis and the results are returned to the application. AWS does not retain your data for model training.</li>
            <li><strong>AWS Textract:</strong> Optical character recognition (OCR) for extracting information from Emirates ID cards, lease contracts, and other documents.</li>
            <li><strong>AWS Rekognition:</strong> Face detection (DetectFaces API only) for extracting profile photos from Emirates ID images. No face comparison, identity verification, or biometric identification is performed.</li>
          </ul>
          <p>None of these AI services make automated decisions with legal effects on data subjects. AI assists real estate agents in their work &mdash; all significant decisions are made by human operators.</p>

          <h2>5. Processing, Storage, and Transfer of Personal Data</h2>
          <h3>5.1 Data Storage Location</h3>
          <p>Your personal data is primarily stored in the AWS Middle East (UAE) region (me-central-1), which is the local AWS region in the UAE. This includes our databases (AWS RDS PostgreSQL), file storage (AWS S3), and application hosting (AWS ECS Fargate).</p>
          <h3>5.2 International Transfers</h3>
          <p>In order to conduct our operations, we transfer personal data to processors outside the DIFC:</p>
          <table>
            <thead><tr><th>Processor</th><th>Location</th><th>Purpose</th><th>Safeguards</th></tr></thead>
            <tbody>
              <tr><td>Amazon Web Services (AWS)</td><td>UAE (me-central-1) primary; certain services may route through US/global endpoints</td><td>Infrastructure, database, storage, email, AI processing, OCR, face detection</td><td>AWS Data Processing Addendum with Standard Contractual Clauses</td></tr>
              <tr><td>Meta Platforms (WhatsApp Business API)</td><td>US/EU</td><td>WhatsApp messaging (Connect only)</td><td>Meta Data Processing Terms with Standard Contractual Clauses</td></tr>
            </tbody>
          </table>
          <p>Neither the United States nor the UAE (outside DIFC) currently holds a DIFC adequacy designation. Accordingly, we rely on Standard Contractual Clauses (SCCs) incorporated into our Data Processing Agreements with each processor, as permitted under Article 27(1) of the DP Law.</p>
          <p>We take appropriate security measures to protect your personal data in connection with all international transfers, in accordance with the DP Law and this Policy.</p>
          <h3>5.3 Automated Decision-Making</h3>
          <p>Keyflow does not rely solely on automated decision-making when processing your personal data. While we use AI tools to assist with document analysis, OCR, and profile photo extraction, all consequential decisions are made or reviewed by human operators.</p>

          <h2>6. Sharing of Personal Data</h2>
          <h3>6.1 Within the Keyflow Platform</h3>
          <p>Your personal data may be shared across Keyflow products (LeaseFlow, LeadsFlow, Connect) to provide integrated services. For example, a contact&apos;s information may be linked across LeadsFlow and Connect to enable unified communications. This sharing is governed by your agency&apos;s configuration and is necessary for the performance of the services you have requested.</p>
          <h3>6.2 With Data Processors</h3>
          <p>We share personal data with the following categories of processors who assist us in delivering the Services:</p>
          <ul>
            <li><strong>Cloud infrastructure providers</strong> (AWS) for hosting, storage, email delivery, AI processing, OCR, and profile photo extraction</li>
            <li><strong>Communication platform providers</strong> (Meta/WhatsApp) for messaging services through Connect</li>
          </ul>
          <p>All processors are bound by Data Processing Agreements that require them to process data only on our instructions, maintain appropriate security measures, and comply with applicable data protection laws.</p>
          <h3>6.3 With Third Parties as Directed by Your Agency</h3>
          <p>Real estate agencies using our Services may configure integrations that share data with:</p>
          <ul>
            <li>Property portals (PropertyFinder) for listing syndication &mdash; note: this involves property metadata and listing information only, NOT tenant personal data</li>
            <li>Workflow automation tools (Zapier) as configured by the agency</li>
          </ul>
          <h3>6.4 Legal and Regulatory Disclosure</h3>
          <p>We may share personal data:</p>
          <ul>
            <li>In response to a request for information by a competent authority or government entity if we determine that such disclosure is required by applicable law, regulation, or legal process</li>
            <li>With law enforcement officials, government entities, or authorities as required by applicable law</li>
            <li>To comply with RERA, Ejari, DLD, or other Dubai/UAE real estate regulatory requirements</li>
            <li>In connection with any merger, sale of company assets, consolidation, or restructuring</li>
            <li>In an aggregated and/or anonymized form that cannot reasonably be used to identify you</li>
          </ul>
          <h3>6.5 Government Data Sharing</h3>
          <p>In some circumstances we may be legally obliged to share information with public authorities or law enforcement. In any such scenario, we will satisfy ourselves that we have a lawful basis on which to share the information and document our decision-making process.</p>

          <h2>7. Data Retention</h2>
          <p>We retain personal data for the following periods:</p>
          <table>
            <thead><tr><th>Data Category</th><th>Retention Period</th><th>Basis</th></tr></thead>
            <tbody>
              <tr><td>Audit logs</td><td>7 years minimum from creation</td><td>DIFC regulatory requirement</td></tr>
              <tr><td>Consent records</td><td>7 years from consent date</td><td>DIFC accountability requirement (Article 14)</td></tr>
              <tr><td>Lease and property data</td><td>Duration of agency subscription + 7 years</td><td>Legal obligation (RERA, Ejari) and audit retention</td></tr>
              <tr><td>Lead data</td><td>Duration of agency subscription + 30 days</td><td>Contractual necessity</td></tr>
              <tr><td>Communication data (messages)</td><td>Duration of agency subscription + 7 years</td><td>Audit trail requirement</td></tr>
              <tr><td>User accounts</td><td>Duration of subscription + 30 days grace period</td><td>Contractual necessity</td></tr>
              <tr><td>Profile photos (extracted from Emirates ID)</td><td>Duration of agency subscription + 7 years</td><td>Retained with client record</td></tr>
              <tr><td>Identity document images</td><td>Duration of agency subscription + 7 years</td><td>Legal obligation (tenant verification records)</td></tr>
            </tbody>
          </table>
          <p>After the applicable retention period, personal data is either securely deleted or anonymized so that no individual can be identified from the remaining data.</p>
          <p>We are not responsible for the accuracy of the information you provide, and will modify or update your personal data in our databases when you provide updated information or upon your request, as further outlined below.</p>

          <h2>8. Your Rights and Choices</h2>
          <h3>8.1 Your Data Protection Rights</h3>
          <p>Under the DP Law, you have the following rights in respect of your personal data:</p>
          <table>
            <thead><tr><th>Right</th><th>Description</th><th>DP Law Reference</th></tr></thead>
            <tbody>
              <tr><td><strong>Right of Access</strong></td><td>The right to obtain confirmation of whether we process your personal data and to receive a copy of that data</td><td>Article 32</td></tr>
              <tr><td><strong>Right to Rectification</strong></td><td>The right to have inaccurate personal data corrected or incomplete data completed</td><td>Article 33</td></tr>
              <tr><td><strong>Right to Erasure</strong></td><td>The right to have your personal data deleted in certain circumstances</td><td>Article 34</td></tr>
              <tr><td><strong>Right to Restriction</strong></td><td>The right to restrict processing of your personal data in certain circumstances</td><td>Article 35</td></tr>
              <tr><td><strong>Right to Data Portability</strong></td><td>The right to receive your personal data in a structured, commonly used, machine-readable format</td><td>Article 36</td></tr>
              <tr><td><strong>Right to Object</strong></td><td>The right to object to processing based on legitimate interests or for direct marketing</td><td>Article 37</td></tr>
              <tr><td><strong>Right to Withdraw Consent</strong></td><td>Where processing is based on consent, the right to withdraw that consent at any time</td><td>Article 10</td></tr>
            </tbody>
          </table>
          <h3>8.2 How to Exercise Your Rights</h3>
          <p><strong>Method 1 &mdash; Self-Service (where available):</strong></p>
          <ul>
            <li>Navigate to your account settings page (e.g., <code>/dashboard/settings/privacy</code> in LeaseFlow or LeadsFlow)</li>
            <li>Use the data export request or account deletion request functions</li>
            <li>Adjust your marketing and communication preferences</li>
          </ul>
          <p><strong>Method 2 &mdash; Contact Us Directly:</strong></p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></li>
            <li><strong>Post:</strong> Data Protection Officer, Keyflow Technology Ltd, Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue - South, DIFC, Dubai, UAE</li>
            <li><strong>Phone:</strong> +971 56 754 0655</li>
          </ul>
          <p>Any access request is generally free of charge. We will respond within 30 days of receiving your request, unless the DP Law provides otherwise. We may, where permissible, impose a reasonable fee to meet any extraordinary administrative costs.</p>
          <h3>8.3 Marketing and Preferences</h3>
          <p>You have the right to opt out of receiving marketing communications from us at any time. You may:</p>
          <ul>
            <li>Change your marketing preferences in your account settings</li>
            <li>Use the unsubscribe link provided in marketing emails</li>
            <li>Contact us at <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a> to opt out</li>
          </ul>
          <p>Please note that we may continue to send you transactional and service-related communications (e.g., lease reminders, payment confirmations, account notifications) even if you opt out of marketing communications, as these are necessary for the performance of the services you have requested.</p>
          <h3>8.4 Non-Discrimination</h3>
          <p>As set out in Article 39 of the DP Law, we will not discriminate against you for exercising your rights by denying services or changing prices or quality of service.</p>

          <h2>9. Security Precautions</h2>
          <p>Keyflow implements appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
          <p><strong>Technical Measures:</strong></p>
          <ul>
            <li>Encryption at rest for all databases (AWS RDS with KMS encryption) and file storage (AWS S3 server-side encryption)</li>
            <li>Encryption in transit via TLS/HTTPS for all data transmission</li>
            <li>AWS Web Application Firewall (WAF) for protection against web-based attacks</li>
            <li>Multi-tenant architecture with strict data isolation &mdash; each agency&apos;s data is segregated at the database query level</li>
            <li>Role-based access controls limiting data access to authorized personnel only</li>
            <li>Password hashing using bcrypt (passwords are never stored in plain text)</li>
            <li>Automated security scanning (CodeQL) in our development pipeline</li>
          </ul>
          <p><strong>Organizational Measures:</strong></p>
          <ul>
            <li>Access to personal data is restricted to those who need it to perform their duties</li>
            <li>Background checks on employees</li>
            <li>Data protection training for all team members</li>
            <li>Regular review and assessment of security policies and procedures</li>
            <li>Audit logging of all access to and modification of personal data, with 7-year retention</li>
            <li>Incident response procedures for handling data breaches</li>
          </ul>
          <p><strong>Sub-Processor Security:</strong></p>
          <ul>
            <li>AWS maintains SOC 1/2/3, ISO 27001, ISO 27017, ISO 27018, and PCI DSS certifications</li>
            <li>Meta maintains ISO 27001 certification and SOC 2 reports</li>
          </ul>
          <p>If you have any questions about our security practices, please contact us at <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a>. To the extent permitted by applicable law, Keyflow expressly disclaims any liability that may arise should any third party obtain personal data through fraud or other means that are no fault of Keyflow.</p>

          <h2>10. Cookies and Tracking Technologies</h2>
          <p>A cookie is a small text file stored on your device by your web browser, used to retain user preferences and enhance your browsing experience.</p>
          <h3>10.1 Cookies We Use</h3>
          <p><strong>Essential Cookies:</strong></p>
          <ul>
            <li>Session cookies for authentication and maintaining your logged-in state</li>
            <li>CSRF (Cross-Site Request Forgery) protection tokens</li>
            <li>Load balancing and routing cookies</li>
          </ul>
          <p><strong>Analytics Cookies (with consent):</strong></p>
          <ul>
            <li>Usage analytics to understand how our Services are used and to improve them</li>
          </ul>
          <p><strong>Communication Cookies:</strong></p>
          <ul>
            <li>WhatsApp Business session management (Connect only)</li>
          </ul>
          <h3>10.2 Cookie Preferences</h3>
          <p>In accordance with the DP Law, our default privacy settings collect only the minimum necessary cookies to operate the Services. Non-essential cookies require your opt-in consent.</p>
          <p>You can manage your cookie preferences through your browser settings. Please refer to your browser&apos;s help documentation for instructions on how to modify cookie settings. You may also visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> for general information about cookies and how to manage them.</p>
          <p>Altering cookie settings may limit your ability to use certain features of the Services.</p>

          <h2>11. External Links</h2>
          <p>The Services may contain links to other websites on the Internet that are owned and operated by third parties (the &ldquo;External Sites&rdquo;). These links are provided solely as a convenience to you and not as an endorsement by Keyflow of the contents or reliability of such External Sites.</p>
          <p>If you decide to access linked third-party websites, you do so at your own risk. Keyflow does not accept liability, and shall not be liable to you for any loss or damage arising from or as a result of your acting upon the content of another website to which you may link from the Services.</p>

          <h2>12. Changes to This Policy</h2>
          <p>Keyflow may change this Policy from time to time. If we make significant changes in the way we treat your personal data, or to this Policy, we will provide you notice through the Services or by other means, such as email.</p>
          <p>Material changes to the purposes for which we process your data may require us to request your re-consent.</p>
          <p>Your continued use of the Services after such notice constitutes your acknowledgment of the changes. We encourage you to periodically review this Policy for the latest information on our privacy practices.</p>
          <p>This Policy is accessible through:</p>
          <ul>
            <li>Each of our products (LeaseFlow, LeadsFlow, Connect)</li>
            <li>The Keyflow website (keyflowae.com)</li>
            <li>Our Terms of Service (keyflow.me/terms-of-service)</li>
            <li>Contracts and agreements as necessary or appropriate</li>
          </ul>

          <h2>13. Contact Us</h2>
          <p>If you have any questions, comments, or requests related to this Policy, or if you have any complaints related to how Keyflow processes your personal data, please contact us using any of the following methods:</p>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p className="text-white font-semibold">Data Protection Officer</p>
            <p>Abdallah Al Shaqra (Interim DPO)</p>
            <p className="mt-2"><strong className="text-white">Method 1 &mdash; Email:</strong> <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></p>
            <p><strong className="text-white">Method 2 &mdash; Post:</strong> Data Protection Officer, Keyflow Technology Ltd, Level 14, The Gate, Dubai International Financial Centre, P.O. Box 74777, Dubai, United Arab Emirates</p>
            <p><strong className="text-white">Method 3 &mdash; Phone:</strong> +971 56 754 0655</p>
            <p><strong className="text-white">Method 4 &mdash; DPO Direct:</strong> <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a></p>
          </div>

          <h2>14. Complaints to the Commissioner</h2>
          <p>If you are not satisfied with our response to your complaint or believe that our processing of your personal data does not comply with the DP Law, you have the right to lodge a complaint with the DIFC Commissioner of Data Protection:</p>
          <div className="bg-[#1A1A1A] p-5 rounded-lg my-4">
            <p className="text-white font-semibold">DIFC Commissioner of Data Protection</p>
            <p>Dubai International Financial Centre Authority</p>
            <p>Level 14, The Gate Building, Dubai, UAE</p>
            <p>Phone: +971 4 362 2222</p>
            <p>Email: <a href="mailto:commissioner@dp.difc.ae">commissioner@dp.difc.ae</a></p>
            <p>Website: <a href="https://www.difc.ae/business/operating/data-protection/" target="_blank" rel="noopener noreferrer">difc.ae/business/operating/data-protection</a></p>
          </div>

          <h2>15. Data Protection Officer</h2>
          <p>Keyflow has appointed a Data Protection Officer in accordance with Article 16 of the DP Law, as Keyflow conducts High Risk Processing involving AI-powered document analysis, OCR of identity documents, and systematic processing of considerable amounts of personal data.</p>
          <p>The DPO may be contacted using the details provided in Section 13 above, or directly via email at <a href="mailto:privacy@keyflowae.com">privacy@keyflowae.com</a>.</p>
          <p>The DPO is responsible for:</p>
          <ul>
            <li>Monitoring compliance with the DP Law and this Policy</li>
            <li>Advising on Data Protection Impact Assessments</li>
            <li>Cooperating with and acting as the point of contact for the Commissioner of Data Protection</li>
            <li>Handling data subject requests and complaints</li>
          </ul>

          <h2>Appendix A: Lawful Bases for Processing by Product</h2>

          <h3>LeaseFlow</h3>
          <table>
            <thead><tr><th>Processing Activity</th><th>Lawful Basis</th><th>DP Law Reference</th></tr></thead>
            <tbody>
              <tr><td>Lease contract management</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Tenant data management</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Ejari registration</td><td>Legal obligation</td><td>Article 10(1)(c)</td></tr>
              <tr><td>RERA rental index compliance</td><td>Legal obligation</td><td>Article 10(1)(c)</td></tr>
              <tr><td>AI lease document analysis (Bedrock)</td><td>Legitimate interest</td><td>Article 10(1)(f)</td></tr>
              <tr><td>OCR of identity documents (Textract)</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Profile photo extraction (Rekognition DetectFaces)</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Audit logging</td><td>Legal obligation</td><td>Article 10(1)(c)</td></tr>
              <tr><td>Transactional emails</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Marketing communications</td><td>Consent</td><td>Article 10(1)(a)</td></tr>
            </tbody>
          </table>

          <h3>LeadsFlow</h3>
          <table>
            <thead><tr><th>Processing Activity</th><th>Lawful Basis</th><th>DP Law Reference</th></tr></thead>
            <tbody>
              <tr><td>Lead data management</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Lead distribution to agents</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Lead analytics and conversion tracking</td><td>Legitimate interest</td><td>Article 10(1)(f)</td></tr>
              <tr><td>Portal lead ingestion (Bayut, PF, Dubizzle)</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Meta Lead Ads ingestion</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Transactional emails</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Marketing communications</td><td>Consent</td><td>Article 10(1)(a)</td></tr>
              <tr><td>Audit logging</td><td>Legal obligation</td><td>Article 10(1)(c)</td></tr>
            </tbody>
          </table>

          <h3>Connect</h3>
          <table>
            <thead><tr><th>Processing Activity</th><th>Lawful Basis</th><th>DP Law Reference</th></tr></thead>
            <tbody>
              <tr><td>WhatsApp messaging</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Email communications</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Contact management</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Cross-product contact linking</td><td>Legitimate interest</td><td>Article 10(1)(f)</td></tr>
              <tr><td>Message delivery tracking</td><td>Contract performance</td><td>Article 10(1)(b)</td></tr>
              <tr><td>Audit logging</td><td>Legal obligation</td><td>Article 10(1)(c)</td></tr>
            </tbody>
          </table>

          <h3>Keyflow Website</h3>
          <table>
            <thead><tr><th>Processing Activity</th><th>Lawful Basis</th><th>DP Law Reference</th></tr></thead>
            <tbody>
              <tr><td>Contact form submissions</td><td>Consent</td><td>Article 10(1)(a)</td></tr>
              <tr><td>Essential cookies</td><td>Legitimate interest</td><td>Article 10(1)(f)</td></tr>
              <tr><td>Analytics cookies</td><td>Consent</td><td>Article 10(1)(a)</td></tr>
            </tbody>
          </table>

          <h2>Appendix B: Sub-Processors</h2>
          <p>Keyflow uses the following sub-processors as part of its engagement with primary processors:</p>

          <h3>AWS Sub-Services (covered by single AWS DPA)</h3>
          <table>
            <thead><tr><th>Sub-Service</th><th>Purpose</th><th>Data Processed</th><th>Region</th></tr></thead>
            <tbody>
              <tr><td>RDS (PostgreSQL)</td><td>Database hosting</td><td>All database records</td><td>me-central-1 (UAE)</td></tr>
              <tr><td>S3</td><td>File storage</td><td>Documents, images, uploads</td><td>me-central-1 (UAE)</td></tr>
              <tr><td>SES</td><td>Email delivery</td><td>Recipient emails, email content</td><td>me-central-1 (UAE)</td></tr>
              <tr><td>SNS</td><td>Notifications</td><td>Bounce/complaint notifications</td><td>me-central-1 (UAE)</td></tr>
              <tr><td>Bedrock (Claude Haiku)</td><td>AI document analysis</td><td>Lease documents, property data</td><td>us-east-1 (Virginia)</td></tr>
              <tr><td>Textract</td><td>OCR processing</td><td>Emirates IDs, contracts</td><td>ap-south-1 (Mumbai)</td></tr>
              <tr><td>Rekognition</td><td>Face detection (DetectFaces only)</td><td>Emirates ID images for profile photo extraction</td><td>ap-south-1 (Mumbai)</td></tr>
              <tr><td>ECS (Fargate)</td><td>Application hosting</td><td>All data in-memory during processing</td><td>me-central-1 (UAE)</td></tr>
              <tr><td>CloudFront</td><td>CDN</td><td>Request/response data in transit</td><td>Global edge locations</td></tr>
              <tr><td>WAF</td><td>Security</td><td>Request metadata</td><td>Global</td></tr>
            </tbody>
          </table>

          <h3>Meta Sub-Services (covered by Meta DPA)</h3>
          <table>
            <thead><tr><th>Sub-Service</th><th>Purpose</th><th>Data Processed</th><th>Region</th></tr></thead>
            <tbody>
              <tr><td>WhatsApp Business API</td><td>Messaging</td><td>Phone numbers, message content, contact names, delivery status</td><td>US/EU</td></tr>
            </tbody>
          </table>

          <h2>Document Control</h2>
          <table>
            <thead><tr><th>Version</th><th>Date</th><th>Author</th><th>Changes</th></tr></thead>
            <tbody>
              <tr><td>1.0</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Initial version covering all 4 products</td></tr>
              <tr><td>1.1</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Reclassification: Rekognition usage updated from biometric identity verification to profile photo extraction. Removed special category data classification. Added B2B2C data processing model section. Updated lawful bases.</td></tr>
              <tr><td>1.2</td><td>22 February 2026</td><td>Abdallah Al Shaqra (Interim DPO)</td><td>Updated &ldquo;Terms of Use&rdquo; references to &ldquo;Terms of Service&rdquo; (TOS-2026-001) to align with the unified Terms of Service document covering all Keyflow products.</td></tr>
            </tbody>
          </table>
          <p><strong>Review Schedule:</strong> Annually at minimum, or when processing activities change materially.</p>
          <p><strong>Next review date:</strong> 22 February 2027</p>

          <hr className="my-8 border-[#333]" />
          <p className="text-sm text-[#666] italic">
            This Policy was last updated on 22 February 2026.
          </p>
          <p className="text-sm text-[#666] italic">
            Keyflow Technology Ltd, DIFC License CL-12435, Unit GA-00-SZ-01-FX-07, Level 1, Gate Avenue - South, DIFC, Dubai, UAE
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

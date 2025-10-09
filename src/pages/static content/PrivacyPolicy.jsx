import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { getStaticFarmerContent } from "../../reduxtoolkit/slices/static content/staticContent";
import "../../assets/css/PrivacyPolicyCSS.css";

function PrivacyPolicy() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const res = await dispatch(getStaticFarmerContent({ title: "Privacy Policy" }));
        const { status, data } = res?.payload || {};
        if (status === 200) {
          setContent(data?.data[0] || {});
        } else {
          toast(data?.message || "Failed to load Content");
        }
      } catch (error) {
        toast("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  return (
    <main className="PrivacyPolicy  container">
      <article className="card" aria-labelledby="policy-title">
        <header>
          <h1 id="policy-title">Privacy Policy</h1>
          <div className="updated">
            Last updated:{" "}
            {content.updatedAt
              ? new Date(content.updatedAt).toLocaleDateString()
              : "October 6, 2025"}
          </div>
          <p>
            Welcome to <strong>Haritpane Agro</strong>. This Privacy Policy explains how we collect,
            use, disclose, and protect your information when you use our website and services. By
            using our services you agree to the collection and use of information in accordance with
            this policy.
          </p>
        </header>

        {!loading &&
          (content.description ? (
            content.description
          ) : (
            <>
              <nav className="toc" aria-label="Table of contents">
                <strong>On this page</strong>
                <ul>
                  <li>
                    <a href="#info-collected">Information We Collect</a>
                  </li>
                  <li>
                    <a href="#how-we-use">How We Use Information</a>
                  </li>
                  <li>
                    <a href="#sharing">Sharing &amp; Disclosure</a>
                  </li>
                  <li>
                    <a href="#cookies">Cookies &amp; Tracking</a>
                  </li>
                  <li>
                    <a href="#data-security">Data Security</a>
                  </li>
                  <li>
                    <a href="#data-retention">Data Retention</a>
                  </li>
                  <li>
                    <a href="#your-rights">Your Rights</a>
                  </li>
                  <li>
                    <a href="#children">Children's Privacy</a>
                  </li>
                  <li>
                    <a href="#contact">Contact Us</a>
                  </li>
                </ul>
              </nav>
              <section id="info-collected">
                <h2>Information We Collect</h2>
                <p>
                  We collect information to provide better services and improve your experience. The
                  types of information we collect include:
                </p>
                <ul>
                  <li>
                    <strong>Personal information:</strong> name, email address, phone number,
                    billing information (when you make a purchase).
                  </li>
                  <li>
                    <strong>Account data:</strong> username, hashed password, profile information
                    and preferences.
                  </li>
                  <li>
                    <strong>Usage data:</strong> pages visited, features used, timestamps, and
                    interaction data.
                  </li>
                  <li>
                    <strong>Device &amp; technical data:</strong> IP address, browser type,
                    operating system, device identifiers, and crash logs.
                  </li>
                </ul>
              </section>
              <section id="how-we-use">
                <h2>How We Use Information</h2>
                <p>We use the information we collect for purposes such as:</p>
                <ul>
                  <li>Providing, maintaining, and improving our services.</li>
                  <li>
                    Processing transactions and sending related information (e.g., confirmations,
                    invoices).
                  </li>
                  <li>Personalizing content and recommendations.</li>
                  <li>
                    Communicating with you about products, services, updates, and offers (you may
                    opt out).
                  </li>
                  <li>Detecting, preventing, and responding to security incidents and abuse.</li>
                </ul>
              </section>
              <section id="sharing">
                <h2>Sharing &amp; Disclosure</h2>
                <p>
                  We do not sell your personal information. We may share information in the
                  following limited circumstances:
                </p>
                <ul>
                  <li>
                    <strong>Service providers:</strong> third-party vendors who perform services on
                    our behalf (payment processors, analytics providers, hosting).
                  </li>
                  <li>
                    <strong>Legal reasons:</strong> when required by law, to respond to legal
                    process, or to protect rights and safety.
                  </li>
                  <li>
                    <strong>Business transfers:</strong> in connection with a merger, acquisition,
                    or sale of assets—users will be notified if personal data is transferred.
                  </li>
                </ul>
              </section>
              <section id="cookies">
                <h2>Cookies &amp; Tracking</h2>
                <p>
                  We and our partners use cookies and similar technologies to provide, analyze, and
                  improve our services. Cookies help with:
                </p>
                <ul>
                  <li>Remembering your login and preferences.</li>
                  <li>Analyzing site usage and performance.</li>
                  <li>Delivering targeted advertising (where applicable).</li>
                </ul>
                <p>
                  You can control cookie settings through your browser or device settings. Disabling
                  cookies may limit some features.
                </p>
              </section>
              <section id="data-security">
                <h2>Data Security</h2>
                <p>
                  We take reasonable administrative, technical, and physical measures to protect
                  personal information. These measures include encryption in transit (HTTPS), access
                  controls, and regular security assessments. However, no method of transmission or
                  storage is 100% secure; we cannot guarantee absolute security.
                </p>
              </section>
              <section id="data-retention">
                <h2>Data Retention</h2>
                <p>
                  We retain personal information only as long as necessary to provide services,
                  comply with legal obligations, resolve disputes, and enforce our agreements.
                  Retention periods vary depending on the type of data and legal requirements.
                </p>
              </section>
              <section id="your-rights">
                <h2>Your Rights</h2>
                <p>
                  Depending on your jurisdiction you may have rights regarding your personal data,
                  including:
                </p>
                <ul>
                  <li>The right to access or receive a copy of your data.</li>
                  <li>The right to correct inaccurate personal information.</li>
                  <li>The right to request deletion of your personal data.</li>
                  <li>The right to object to or restrict processing and to data portability.</li>
                </ul>
                <p>
                  To exercise these rights, contact us using the details below. We may need to
                  verify your identity before responding to certain requests.
                </p>
              </section>
              <section id="children">
                <h2>Children's Privacy</h2>
                <p>
                  Our services are not intended for children under 13 (or the applicable minimum age
                  in your country). We do not knowingly collect personal information from children.
                  If you believe we have collected such data, please contact us and we will take
                  steps to delete it.
                </p>
              </section>
              <section id="international">
                <h2>International Transfers</h2>
                <p>
                  If you are located outside the country where our servers operate, your information
                  may be transferred to and processed in countries with different data protection
                  laws. We will take appropriate measures to protect your information in accordance
                  with this policy.
                </p>
              </section>
              <section id="changes">
                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. When we do, we will revise
                  the "Last updated" date above and, where appropriate, notify you of material
                  changes.
                </p>
              </section>
              <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>If you have questions or requests regarding this policy, contact:</p>
                <p>
                  <strong>Your Company Name</strong>
                  <br />
                  Email:
                  <a href="mailto:privacy@Haritpaneagro.com">privacy@yourcompany.com</a>
                  <br />
                  Address: Haritpane Agro ,Noida U.P(201301), India
                </p>
              </section>
              <footer>
                <p>
                  By using our site, you agree to this Privacy Policy. If you do not agree, please
                  do not use the service.
                </p>
              </footer>
            </>
          ))}
      </article>
    </main>
  );
}

export default PrivacyPolicy;

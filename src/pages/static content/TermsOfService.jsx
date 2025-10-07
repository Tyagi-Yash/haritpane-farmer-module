import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "../../assets/css/TermsOfServiceCSS.css";
import { getStaticFarmerContent } from "../../reduxtoolkit/slices/static content/staticContent";

function TermsOfService() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const res = await dispatch(
          getStaticFarmerContent({ appType: "Farmer", title: "Terms & Conditions" })
        );
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
    <div>
      <header>
        <h1>TERMS OF USE &amp; END USER LICENSE AGREEMENT</h1>
        <p>TERMS OF USE &amp; END USER LICENSE AGREEMENT (For the Haritpane Agro® India )</p>
        <p>
          <small>
            Effective Date: 1st August 2025 | Last Updated:{" "}
            {content.updatedAt
              ? new Date(content.updatedAt).toLocaleDateString()
              : "October 6, 2025"}
          </small>
        </p>
      </header>

      {!loading &&
        (content.description ? (
          <main>{content.description}</main>
        ) : (
          <main>
            <h2>Welcome to the Hariptane Agro® India Mobile Application (“App”)</h2>
            <p>
              This Terms of Use and End User License Agreement (“Agreement”) is a legally binding
              contract between you (“you”, “your”, “User” or “End User”) and
              <strong> Allied Food and Confectionary Services Limited </strong> , a company duly
              incorporated under the laws of India, with its registered address at Plot 274 Ajose
              Adeogun Street, Victoria Island, Lagos State (“Company”, “we”, “us” or “our”).
            </p>
            <p>
              Allied Food and Confectionary Services Limited is the sole franchisee and authorized
              operator of <strong> Hariptane Agro® </strong>, a India.-based multinational fast-food
              restaurant brand, in India.
            </p>
            <p>
              This Agreement governs your access to and use of the Hariptane Agro® India mobile
              application (“App”), which is owned and operated by the Company.
            </p>
            <p>
              <strong> For the avoidance of doubt </strong>, references in this Agreement to
              “Company,” “we,” “us,” or “our” refer primarily to Allied Food and Confectionary
              Services Limited. However, in contexts relating to limitations of liability,
              indemnification, disclaimers, or the protection of intellectual property (among other
              relevant provisions), such references shall also include Hariptane Agro®, and its
              respective affiliates, licensors, and franchise partners, to the extent applicable.
            </p>
            <p>
              By accessing, downloading, installing, or using the App, you agree to be bound by the
              terms of this Agreement. If you do not agree to these Terms, you must not access or
              use the App.
            </p>
            <h2>1. Acceptance &amp; Eligibility</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  By downloading, installing, accessing, or using the App, you represent and warrant
                  that you are at least eighteen (18) years of age, being the age of majority and
                  legal capacity under the applicable laws of the Federal Republic of India, and
                  that you have the full legal right, power, and authority to enter into and be
                  bound by this Agreement.
                </p>
                <p>
                  You further represent and warrant that all information provided by you in
                  connection with your access to or use of the App is and shall remain true,
                  accurate, current, and complete. You undertake to update such information promptly
                  in the event of any change.
                </p>
                <p>
                  Your access to or use of the App shall be deemed to constitute your full and
                  unqualified acceptance of, and agreement to be bound by, the terms and conditions
                  of this Agreement and any other policies, notices, or guidelines incorporated by
                  reference.
                </p>
              </li>
            </ul>
            <h2>2. License Grant &amp; Restrictions</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  Subject to your continued compliance with the terms and conditions set forth in
                  this Agreement, the Company hereby grants you a limited, revocable, non-exclusive,
                  non-transferable, and non-sublicensable license to download, install, access, and
                  use the App solely for your personal, non-commercial use within the Federal
                  Republic of India.
                </p>
                <p>You shall not, whether directly or indirectly:</p>
                <ul>
                  <li>
                    <p>
                      Modify, reproduce, adapt, distribute, display, publish, license, create
                      derivative works from, or exploit in any manner the App or any portion
                      thereof;
                    </p>
                  </li>
                  <li>
                    <p>
                      Reverse engineer, decompile, disassemble, or otherwise attempt to discover the
                      source code, architecture, or algorithms of the App;
                    </p>
                  </li>
                  <li>
                    <p>
                      Sell, lease, rent, sublicense, distribute, or otherwise transfer the App or
                      any portion of its contents to any third party;
                    </p>
                  </li>
                  <li>
                    <p>
                      Use the App in any manner that could disable, damage, impair, or otherwise
                      interfere with the proper functioning of the App, the servers on which it is
                      hosted, or any other user’s experience;
                    </p>
                  </li>
                  <li>
                    <p>
                      Use the App in violation of any applicable laws, regulations, or third-party
                      rights (including, without limitation, data protection, intellectual property,
                      and privacy rights);
                    </p>
                  </li>
                  <li>
                    <p>
                      Circumvent, disable, or otherwise interfere with any security-related features
                      or operational components of the App;
                    </p>
                  </li>
                  <li>
                    <p>
                      Utilize the App or any of its content for any commercial or revenue-generating
                      purpose outside the scope of engaging with services or transactions offered by
                      or on behalf of Hariptane Agro® India;
                    </p>
                  </li>
                  <li>
                    <p>
                      Extract, scrape, copy, or imitate the design, layout, or user interface of the
                      App without the prior written consent of the Company.
                    </p>
                  </li>
                </ul>
                <p>
                  You hereby agree to use the App strictly and solely for lawful and authorized
                  purposes, which may include:
                </p>
                <ul>
                  <li>
                    <p>Browsing and viewing menu items and promotional offers;</p>
                  </li>
                  <li>
                    <p>Placing and managing food and beverage orders;</p>
                  </li>
                  <li>
                    <p>Tracking the status of deliveries or pickup orders;</p>
                  </li>
                  <li>
                    <p>
                      Accessing and managing your personal account, including loyalty or rewards
                      programs, where applicable.
                    </p>
                  </li>
                </ul>
                <p>
                  The license granted herein does not constitute a sale or transfer of title or
                  ownership, and all rights not expressly granted are reserved by the Company and
                  its licensors.
                </p>
              </li>
            </ul>
            <h2>3. User Account &amp; Security</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <ul className="margin-minus">
                  <p>
                    <strong> 3.1 Account Creation </strong>
                  </p>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      To access certain features of the App, including but not limited to placing
                      orders, you may be required to register for an account. You agree to provide
                      true, accurate, current, and complete information during the registration
                      process and to update such information promptly to ensure its continued
                      accuracy.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <p>
                    <strong> 3.2 Account Credentials &amp; Responsibility </strong>
                  </p>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      You are solely responsible for maintaining the confidentiality of your login
                      credentials (including but not limited to your username and password) and for
                      all activities that occur under your account, whether authorized by you or
                      not. You agree to take reasonable steps to prevent unauthorized access to your
                      account.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <p>
                    <strong>3.3 Notification of Breach and Limitation of Liability</strong>
                  </p>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      You agree to immediately notify the Company of any actual or suspected
                      unauthorized access to or use of your account or any other breach of security.
                      You acknowledge and accept that the Company shall not be liable for any loss,
                      damage, cost, or expense (whether direct or indirect) arising from or related
                      to any unauthorized access or use of your account, where such access or use
                      was caused wholly or partly by your failure to maintain the confidentiality
                      and security of your login credentials.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <p>
                    <strong>
                      3.4 Account Security Measures, Suspension or Termination of Access
                    </strong>
                  </p>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      We reserve the right, at our sole discretion, to suspend, restrict, or
                      terminate your access to the App or your User Account at any time, with or
                      without notice, for any reason including, but not limited to:
                    </p>
                  </li>
                  <ol>
                    <li>
                      <p>A breach of these Terms;</p>
                    </li>
                    <li>
                      <p>
                        Conduct that we reasonably believe is harmful to other users, the Company,
                        or third parties;
                      </p>
                    </li>
                    <li>
                      <p>Fraudulent, unlawful, or unauthorized use of the App;</p>
                    </li>
                    <li>
                      <p>Technical or security issues;</p>
                    </li>
                    <li>
                      <p>
                        Discontinuation or material modification of the App or any of its services;
                      </p>
                    </li>
                    <li>
                      <p>Compliance with legal or regulatory obligations; or</p>
                    </li>
                    <li>
                      <p>Any other reason deemed necessary in our discretion.</p>
                    </li>
                  </ol>
                </ul>
              </li>
              <p>
                Upon termination, all rights granted to you under this Agreement shall cease
                immediately, and you must discontinue all use of the App. Termination shall not
                affect any rights or obligations accrued prior to termination. Clauses relating to
                intellectual property, limitation of liability, governing law, and any other
                provisions which by their nature should survive termination shall continue to apply.
              </p>
            </ul>
            <h2>4. Ordering, Pricing &amp; Payment</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.1 Ordering Functionality </strong>
                    </p>
                    <p>
                      The App enables you to place orders for food and beverage items from
                      participating Hariptane Agro® India restaurants. Orders may be fulfilled for
                      delivery or pick-up, depending on the options available at the time of
                      ordering.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.2 Payment Methods </strong>
                    </p>
                    <p>
                      You may complete payment for orders through the App using the available
                      payment options, including debit/credit cards, and third-party payment
                      gateways. The Company does not process payments directly and shall not be
                      liable for any transaction failures, delays, chargebacks, or unauthorized
                      charges arising from the use of such third-party platforms.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.3 Pricing and Taxes </strong>
                    </p>
                    <p>
                      All product prices, applicable delivery charges, and minimum or maximum order
                      values are as stated on the App at the time of purchase. Prices are displayed
                      in Indian Naira (₦) and are inclusive of Value Added Tax (VAT) and other
                      applicable taxes, unless expressly stated otherwise. Prices are subject to
                      change at our sole discretion, without prior notice, but such changes shall
                      not affect confirmed orders.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.4 Order Acceptance and Cancellation by Us </strong>
                    </p>
                    <p>
                      We reserve the right to refuse, cancel, or limit any order, in whole or in
                      part, at our sole discretion, including but not limited to cases of suspected
                      fraud, abuse, or violation of these Terms. If we cancel an order after payment
                      has been made, you will be entitled to a full refund processed using the
                      original method of payment.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.5 Order Cancellation by You </strong>
                    </p>
                    <p>
                      Once an order is confirmed, preparation commences immediately. As such,
                      cancellation by you after confirmation may not be possible, and you may not be
                      entitled to a refund unless the cancellation is due to an error or failure
                      attributable to us.
                    </p>
                    <p>
                      To request cancellation, you must promptly contact the Burger King® India
                      location handling your order using the contact information provided on the
                      App. You must provide accurate details, including but not limited to your
                      name, phone number, and order reference.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 4.6 Refunds </strong>
                    </p>
                    <p>
                      If a refund is approved, it will be processed using the same method used for
                      payment. Refunds will be made within fourteen (14) business days from the date
                      on which the Company confirms that a refund is due. The Company reserves the
                      right to verify and validate any refund request prior to processing.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>5. Promotional Offers, Vouchers &amp; Loyalty Programmes</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }} className="flexProperty">
                    <strong> 5.1 </strong>
                    <p>
                      The App may, from time to time, provide access to promotional offers, discount
                      vouchers, coupon codes, and loyalty or reward programs (collectively,
                      “Promotions”) for eligible users.
                    </p>
                  </li>
                  <li style={{ listStyle: "none" }} className="flexProperty">
                    <strong> 5.2 </strong>
                    <p>
                      All Promotions are offered at the sole discretion of the Company and are
                      subject to:
                    </p>
                  </li>
                  <ul style={{ marginLeft: 10 }}>
                    <li>Availability at participating Hariptane Agro® India locations;</li>
                    <li>
                      Specific terms and conditions applicable to the individual Promotion,
                      including but not limited to minimum order value, purchase requirements, usage
                      restrictions, and eligibility criteria;
                    </li>
                    <li>
                      Expiration dates, non-transferability, and one-time-use limitations, unless
                      expressly stated otherwise.
                    </li>
                  </ul>
                  <li style={{ listStyle: "none" }} className="flexProperty">
                    <strong> 5.3 </strong>
                    <p>
                      Promotions have no cash value and shall not be exchanged for cash or credit,
                      except where expressly required under applicable law.
                    </p>
                  </li>
                  <li style={{ listStyle: "none" }} className="flexProperty">
                    <strong> 5.4 </strong>
                    <p>
                      The Company reserves the right to suspend, revoke, amend, or terminate any
                      Promotion at any time without prior notice or liability, including where
                      misuse, fraud, or breach of these Terms is suspected.
                    </p>
                  </li>
                  <li style={{ listStyle: "none" }} className="flexProperty">
                    <strong> 5.5 </strong>
                    <p>
                      Loyalty points or rewards accrued through the App are non-transferable and may
                      only be redeemed in accordance with the applicable loyalty program rules
                      issued by the Company. The Company shall not be liable for the loss,
                      expiration, or forfeiture of any accrued loyalty points or rewards resulting
                      from, including but not limited to, account inactivity, account closure,
                      breach of these Terms, modification or discontinuation of the loyalty program,
                      system errors, unauthorized access to your account, or any force majeure
                      event.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>6. Intellectual Property Rights</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.1 Ownership of Intellectual Property </strong>
                    </p>
                    <p>
                      All trademarks, service marks, trade names, trade dress, brand elements,
                      logos, domain names, icons, emblems, slogans, product names, menu items,
                      recipes, food images, or other source identifiers, whether registered or
                      unregistered (collectively, the “Hariptane Agro® Marks”), including but not
                      limited to the “Hariptane Agro®” name, “Whopper®”, and all related brand
                      features, are proprietary to Hariptane Agro®”, and/or its affiliated entities
                      (collectively referred to as “Hariptane Agro®”).
                    </p>
                    <p>
                      Allied Food and Confectionary Services Limited (“AFCSL”) is the sole and
                      exclusive authorized franchisee of Hariptane Agro® within the Federal Republic
                      of India and is duly licensed to use the Hariptane Agro® Marks and associated
                      proprietary content solely in connection with the operation, promotion, and
                      marketing of the Hariptane Agro® brand within India.
                    </p>
                    <p>
                      You acknowledge and agree that all rights, title, and interest in and to the
                      Hariptane Agro® Marks, and all associated goodwill, remain the exclusive
                      property of Hariptane Agro® and/or its licensors. No assignment, license, or
                      right (whether express or implied) in or to the Hariptane Agro® Marks is
                      granted to you under this Agreement, except the limited rights of personal use
                      expressly stated herein.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.2 Copyright and Other Proprietary Contenty </strong>
                    </p>
                    <p>
                      All content, data, design elements, functionality, software (including source
                      code and object code), features, user interfaces, audio-visual elements,
                      images, photographs, menus, nutritional and allergen data, videos, sounds,
                      button icons, graphics, layout, compilation, and all other materials or works
                      made available on or through the App (“Content”) are:
                    </p>
                    <ul>
                      <li>
                        <p>Owned by AFCSL;</p>
                      </li>
                      <li>
                        <p>Licensed to AFCSL by Hariptane Agro®; or</p>
                      </li>
                      <li>
                        <p>
                          Licensed from third-party rightsholders with appropriate authorization.
                        </p>
                      </li>
                    </ul>
                    <p>
                      Such Content is protected by Indian copyright law, international treaties,
                      trade dress protections, and other applicable intellectual property and
                      proprietary rights laws. Any unauthorized use, reproduction, copying,
                      republication, uploading, posting, public display, distribution, modification,
                      reverse engineering, data scraping, or creation of derivative works is
                      strictly prohibited.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.3 License Restrictiony </strong>
                    </p>
                    <p>
                      Subject to your compliance with these Terms, you are granted a limited,
                      non-exclusive, non-sublicensable, non-transferable, and revocable license to
                      access and use the App and its Content solely for your personal, lawful, and
                      non-commercial use within the territory of India. This license does not
                      include any right to:
                    </p>
                    <ul>
                      <li>
                        <p>Use the Hariptane Agro® Marks or Content for any commercial purpose;</p>
                      </li>
                      <li>
                        <p>
                          Modify, distribute, or create derivative works from any part of the App or
                          Content;
                        </p>
                      </li>
                      <li>
                        <p>
                          Decompile, disassemble, or reverse-engineer any software or source code
                          embedded in the App;
                        </p>
                      </li>
                      <li>
                        <p>
                          Frame or mirror any portion of the App or content within another
                          application or website; or
                        </p>
                      </li>
                      <li>
                        <p>
                          Remove, obscure, or alter any copyright, trademark, or other proprietary
                          notices.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.4 No Affiliation or Endorsement </strong>
                    </p>
                    <p>
                      You must not use any Hariptane Agro® Marks or proprietary content in a manner
                      that is likely to cause confusion or imply sponsorship, endorsement, or
                      affiliation with Hariptane Agro®, AFCSL, or their respective licensors, unless
                      you have received express prior written authorization from AFCSL or the
                      relevant rightsholder.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.5 Reporting Infringement </strong>
                    </p>
                    <p>
                      If you believe that any content made available on the App infringes upon your
                      intellectual property rights, you may submit a notice of infringement with
                      supporting documentation to:
                    </p>
                    <p>
                      <strong>
                        Legal Department – Allied Food and Confectionary Services Limited Email:
                        corporateaffairs@alliedfcs.com
                      </strong>
                    </p>
                    <p>
                      We reserve the right to investigate, suspend, remove, or disable access to any
                      infringing content, and take such actions as may be required under Indian law
                      or otherwise deemed necessary to protect intellectual property rights.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 6.6 Reservation of Rights</strong>
                    </p>
                    <p>
                      Except as expressly stated herein, nothing in this Agreement shall be
                      construed as conferring any license or right, by implication, estoppel, or
                      otherwise, under any intellectual property or proprietary rights of AFCSL,
                      Hariptane Agro®, or any third party. All rights not expressly granted under
                      this Agreement are hereby reserved.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>7. Privacy &amp; Data Protection</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 7.1 Data Collection and Use</strong>
                    </p>
                    <p>
                      Your access to and use of the App is subject to the provisions of our [Privacy
                      Policy], which is hereby incorporated by reference and forms an integral part
                      of these Terms. The Privacy Policy outlines the manner in which we collect,
                      process, use, store, disclose, and protect your personal data, in accordance
                      with applicable data protection legislation in the Federal Republic of India,
                      including without limitation, the India Data Protection Act, 2023 (as may be
                      amended, re-enacted, or replaced from time to time), and all related
                      regulations or guidelines issued pursuant thereto.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 7.2 Consent to Processing</strong>
                    </p>
                    <p>
                      By downloading, accessing, or using the App, you acknowledge that you have
                      read, understood, and agreed to the terms of our Privacy Policy and expressly
                      consent to the collection, use, storage, and processing of your personal data
                      by us or our authorised third-party service providers, for purposes that are
                      lawful, specific, explicit, and legitimate, including but not limited to
                      account management, order fulfilment, customer support, marketing (where
                      permitted), and service improvement.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 7.3 Third-Party Services</strong>
                    </p>
                    <p>
                      Certain features or services available through the App may involve integration
                      with third-party platforms (e.g., payment processors, delivery service
                      providers, or analytics tools) who may process your personal data
                      independently. You acknowledge that such third parties operate under their own
                      data protection policies and legal obligations, and we shall not be liable for
                      any acts, omissions, or breaches of data protection obligations by such third
                      parties. We strongly encourage you to review their respective privacy
                      policies..
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 7.4 Data Protection and Security </strong>
                    </p>
                    <p>
                      We implement appropriate technical and organisational security measures to
                      safeguard your personal data against unauthorised access, disclosure,
                      alteration, or destruction. Personal data collected shall be retained only for
                      as long as necessary to fulfil the purpose for which it was collected, or as
                      required under applicable law, regulations, or contractual obligations.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 7.5 Your Rights </strong>
                    </p>
                    <p>
                      In accordance with applicable data protection laws, you have the right to:
                    </p>
                    <ul>
                      <li>
                        <p>request access to the personal data we hold about you;</p>
                      </li>
                      <li>
                        <p>request rectification or erasure of your personal data;</p>
                      </li>
                      <li>
                        <p>object to or restrict the processing of your personal data;</p>
                      </li>
                      <li>
                        <p>
                          withdraw your consent at any time, without affecting the lawfulness of
                          processing based on consent before its withdrawal;
                        </p>
                      </li>
                      <li>
                        <p>
                          lodge a complaint with the India Data Protection Commission or any other
                          authorised regulatory authority.
                        </p>
                      </li>
                    </ul>
                    <p>All requests may be submitted to us at:</p>
                    <p>
                      <strong>Data Protection Officer</strong>
                    </p>
                    <p>
                      <strong>Email: dpo@burger-king.ng</strong>
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>8. Location &amp; Notifications</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 8.1 Device Permissions </strong>
                    </p>
                    <p>
                      The App may request permission to access certain features of your device,
                      including but not limited to:
                    </p>
                    <ul>
                      <li>
                        <p>
                          Location services, to identify nearby Hariptane Agro® India restaurants
                          and facilitate relevant services based on your geographical location; and
                        </p>
                      </li>
                      <li>
                        <p>
                          Push notifications, to provide you with updates relating to your orders,
                          promotional offers, and other relevant communications.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 8.2 User Control </strong>
                    </p>
                    <p>
                      You may manage or withdraw these permissions at any time through the settings
                      on your device. However, please note that disabling location services or
                      notifications may limit the functionality of the App and the services we are
                      able to provide to you.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 8.3 Consent to Use </strong>
                    </p>
                    <p>
                      By enabling location services or push notifications on your device, you
                      expressly consent to our use of such functionalities in accordance with our
                      [Privacy Policy] and applicable data protection laws in the Federal Republic
                      of India.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>9. Third-Party Services &amp; Integrations</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 9.1 Third-Party Providers </strong>
                    </p>
                    <p>
                      The App may include integrations with, or provide access to, third-party
                      services and platforms, including but not limited to:
                    </p>
                    <ul>
                      <li>
                        <p>
                          <strong> Payment processors </strong> (e.g., payment gateways and
                          financial institutions);
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong> Mapping and geolocation services </strong> (e.g., navigation or
                          location providers);
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong> Delivery partners; </strong> and
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Analytics, advertising, or data processing services.</strong>
                          and
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 9.2 No Endorsement or Control </strong>
                    </p>
                    <p>
                      These third-party services are not operated or controlled by Allied Food and
                      Confectionary Services Limited (“AFCSL”), and are provided solely for your
                      convenience. The inclusion of such services does not imply any endorsement,
                      affiliation, or warranty by AFCSL or Hariptane Agro®.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 9.3 Independent Terms and Policies </strong>
                    </p>
                    <p>
                      Your use of third-party services may be subject to the terms of use, privacy
                      policies, and practices of the respective third parties. You are solely
                      responsible for reviewing, understanding, and complying with such terms. We do
                      not accept any liability for the acts, omissions, security measures, or data
                      processing activities of such third parties.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 9.4 Disclaimer of Liability</strong>
                    </p>
                    <p>
                      To the maximum extent permitted by applicable law, AFCSL disclaims all
                      liability arising from or in connection with your use of, or reliance upon,
                      any third-party service integrated into or accessed through the App, including
                      but not limited to service failures, data breaches, inaccurate information, or
                      transaction errors.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>10. Warranty Disclaimers</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <ul className="margin-minus">
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 10.1 Provision of Services “As Is”</strong>
                    </p>
                    <p>
                      The App, its content, features, and services are provided on an “as is” and
                      “as available” basis, without any warranties or representations of any kind,
                      whether express, implied, or statutory.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 10.2 No Warranty of Performance</strong>
                    </p>
                    <p>
                      Without limiting the generality of the foregoing, Allied Food and
                      Confectionary Services Limited (“AFCSL”) expressly disclaim all warranties,
                      whether express or implied, including but not limited to representations:
                    </p>
                    <ul>
                      <li>
                        <p>
                          That the App will operate uninterrupted, timely, secure, or error-free;
                        </p>
                      </li>
                      <li>
                        <p>
                          That the App or its content will be free from viruses, bugs, or other
                          harmful components, despite reasonable efforts to maintain cybersecurity
                          and system integrity;
                        </p>
                      </li>
                      <li>
                        <p>
                          That any information, order, or transaction processed through the App will
                          be accurate, complete, or delivered without delay or interruption;
                        </p>
                      </li>
                      <li>
                        <p>
                          That any offers, promotions, or content will always be available or meet
                          your expectations.
                        </p>
                      </li>
                      <p>
                        <strong>
                          This disclaimer applies to the fullest extent permitted by applicable law.
                        </strong>
                      </p>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 10.3 Exclusion of Implied Warranties</strong>
                    </p>
                    <p>
                      To the maximum extent permitted under applicable law, we expressly disclaim
                      all implied warranties, including but not limited to warranties of
                      merchantability, fitness for a particular purpose, title, and
                      non-infringement, in respect of the App and any services accessed through it.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 10.4 User Responsibility</strong>
                    </p>
                    <p>
                      You acknowledge and agree that your access to and use of the App and any
                      related services is at your sole risk and discretion. To the fullest extent
                      permitted by applicable law, you assume full responsibility for any loss,
                      damage, or liability (including to your device, data, or third parties)
                      arising from such use or inability to use the App.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>11. Limitation of Liability</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <ul className="margin-minus">
                  <li style={{ listStyle: "none" }}>
                    <p>
                      To the fullest extent permitted by applicable law, Allied Food and
                      Confectionary Services Limited (“AFCSL”), its affiliates, franchisors,
                      licensors, service providers, officers, directors, employees, agents, and
                      representatives shall not be liable to you or any third party for any direct,
                      indirect, incidental, special, consequential, punitive, exemplary, or enhanced
                      damages, or for any
                      <strong>losses, liabilities, costs, charges, or expenses of any kind </strong>
                      , including but not limited to:
                    </p>
                    <ul>
                      <li>
                        <p>loss of profits or revenue;</p>
                      </li>
                      <li>
                        <p>loss or corruption of data;</p>
                      </li>
                      <li>
                        <p>loss of business opportunity, contracts, customers, or goodwill;</p>
                      </li>
                      <li>
                        <p>business interruption;</p>
                      </li>
                      <li>
                        <p>reputational harm;</p>
                      </li>
                      <li>
                        <p>legal or professional fees and expenses;</p>
                      </li>
                      <li>
                        <p>any other intangible or economic losses,</p>
                      </li>
                    </ul>
                    <p>
                      whether arising in contract, tort (including negligence), strict liability,
                      equity, or otherwise, and regardless of whether such losses were foreseeable
                      or whether AFCSL was advised of the possibility of such losses, arising out of
                      or in connection with:
                    </p>
                    <ul>
                      <li>
                        <p>
                          your access to, use of, or inability to use the App or any features,
                          functionalities, or content made available through it;
                        </p>
                      </li>
                      <li>
                        <p>
                          any delay, interruption, error, defect, failure, or technical malfunction
                          related to the App;
                        </p>
                      </li>
                      <li>
                        <p>
                          the conduct, actions, inactions, or omissions of any third-party service
                          provider, delivery partner, payment processor, or merchant, even where
                          AFCSL facilitates or integrates with such third parties;
                        </p>
                      </li>
                      <li>
                        <p>
                          any unauthorised access to or alteration of your transmissions, data, or
                          account; or
                        </p>
                      </li>
                      <li>
                        <p>any other matter relating to the App or these Terms.</p>
                      </li>
                    </ul>
                    <p>
                      Without prejudice to the foregoing, and subject to applicable law, AFCSL’s
                      total aggregate liability to you for any and all claims, causes of action,
                      losses, or damages arising out of or relating to these Terms or your use of
                      the App shall not exceed the total amount (if any) actually paid by you
                      directly to AFCSL for the specific transaction that gave rise to the claim.
                    </p>
                    <p>Nothing in these Terms shall exclude or limit AFCSL’s liability for:</p>
                    <ul>
                      <li>
                        <p>death or personal injury caused by our negligence;</p>
                      </li>
                      <li>
                        <p>our fraud or fraudulent misrepresentation; or</p>
                      </li>
                      <li>
                        <p>
                          any other liability that cannot lawfully be excluded or limited under
                          applicable Indian law.
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul>
              <li style={{ listStyle: "none" }}>
                <ul className="margin-minus">
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 11.1 Indemnification</strong>
                    </p>
                    <p>
                      You agree to indemnify, defend, and hold harmless AFCSL, its franchisor,
                      parent companies, affiliates, officers, directors, employees, agents,
                      licensors, and partners from and against any and all claims, liabilities,
                      losses, damages, expenses (including reasonable legal fees), or demands
                      arising out of or in connection with:
                    </p>
                    <ul>
                      <li>
                        <p>Your violation of these Terms or applicable law or regulation;</p>
                      </li>
                      <li>
                        <p>Your misuse or unauthorised use of the App;</p>
                      </li>
                      <li>
                        <p>Any content or activity linked to your account;</p>
                      </li>
                      <li>
                        <p>
                          Your infringement or alleged infringement of the rights (including
                          intellectual property or privacy rights) of any third party;
                        </p>
                      </li>
                      <li>
                        <p>Your action, omission and/or negligence.</p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <p>
                Your action, omission and/or negligence. This indemnity obligation shall survive the
                termination or expiration of these Terms and your use of the App.
              </p>
            </ul>
            <h2>12. Governing Law &amp; Dispute Resolutiony</h2>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong> 12.1 Governing Law</strong>
                    </p>
                    <p>
                      These Terms, and any dispute, claim, or controversy arising out of or in
                      connection with your use of the App, its content, or any related services,
                      shall be governed by and construed in accordance with the laws of the Federal
                      Republic of India, without regard to any conflict of law principles.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong>12.2 Jurisdiction</strong>
                    </p>
                    <p>
                      You agree that any dispute or claim arising out of or in connection with these
                      Terms, including their validity, interpretation, or performance, shall be
                      subject to the exclusive jurisdiction of the courts of competent jurisdiction
                      in the Federal Republic of India.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="margin-minus">
              <li style={{ listStyle: "none" }}>
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <p>
                      <strong>12.3 Dispute Resolution</strong>
                    </p>
                    <p>
                      Where practicable, the parties shall use their best efforts to settle any
                      dispute amicably through good-faith negotiations within fourteen (14) days of
                      notice of such dispute. Failing such amicable resolution, either party may
                      refer the matter to a court of competent jurisdiction as stated above.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
            <h2>13. Amendments</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  We reserve the right to modify or update these Terms at any time. You will be
                  notified of any material changes via the App, website or your email. You are
                  responsible for reviewing these Terms periodically. Your continued access to or
                  use of the App following the effective date of any modifications shall constitute
                  your binding acceptance of the updated Terms. If you do not agree to the revised
                  Terms, you must cease use of the App immediately.
                </p>
              </li>
            </ul>
            <h2>14. Entire Agreement</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  These Terms, together with our Privacy Policy and any other legal notices or
                  policies expressly incorporated herein, constitute the entire agreement between
                  you and Allied Food and Confectionary Services Limited (“AFCSL”) regarding your
                  access to and use of the App and supersede all prior or contemporaneous
                  communications, understandings, agreements, representations, or warranties,
                  whether written or oral, relating to such subject matter. No oral or written
                  statement not expressly included herein shall be legally binding on AFCSL unless
                  separately agreed in writing.
                </p>
              </li>
            </ul>
            <h2>15. Severability</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  If any provision of these Terms is found to be unlawful, void, or unenforceable
                  under applicable law, such provision shall be deemed severed from these Terms to
                  the extent of such invalidity and shall not affect the validity and enforceability
                  of the remaining provisions, which shall remain in full force and effect. Where
                  possible, any invalid, illegal, or unenforceable provision shall be modified to
                  the minimum extent necessary to make it valid, legal, and enforceable.
                </p>
              </li>
            </ul>
            <h2>16. Contact Information</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  For any questions, complaints, or concerns regarding these Terms or the App, you
                  may contact us using the details below:
                </p>
                <p style={{ margin: 0, padding: 0 }}>
                  <strong>Allied Food and Confectionary Services Limited</strong>
                </p>
                <p style={{ margin: 0, padding: 0 }}>(Franchisee of Hariptane Agro® India)</p>
                <p style={{ margin: 0, padding: 0 }}>Email: info@alliedfcs.com</p>
                <p style={{ margin: 0, padding: 0 }}>Phone: +234 700 033 4477</p>
                <p style={{ margin: 0, padding: 0 }}>
                  <a href="https://www.alliedfcs.com" style={{ textDecoration: "underline" }}>
                    Website: https://www.alliedfcs.com
                  </a>
                </p>
              </li>
            </ul>
            <h2>User Acknowledgment</h2>
            <ul>
              <li style={{ listStyle: "none" }}>
                <p>
                  By tapping <strong> “Accept” </strong>, you acknowledge that you have carefully
                  read, understood, and agreed to be legally bound by this Terms of Use &amp; End
                  User License Agreement, including all applicable policies referenced herein.
                </p>
              </li>
            </ul>
          </main>
        ))}
    </div>
  );
}

export default TermsOfService;

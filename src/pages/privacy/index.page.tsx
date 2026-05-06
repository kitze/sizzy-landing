import React from "react";
import Head from "next/head";

const Privacy = () => {
  return (
    <>
      <Head>
        <style jsx>
          {`
            .privacy {
              overflow-x: hidden;
              min-height: 100vh;
              font-family: "PT Sans", sans-serif;
              background: linear-gradient(to bottom, #192740, #35465d);
              color: white;
              padding: 15px;

              * {
                box-sizing: border-box;
              }

              a {
                color: mediumpurple;
              }
            }

            .text {
              font-weight: 400;
            }
          `}
        </style>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link
          href="https://fonts.googleapis.com/css?family=PT+Sans"
          rel="stylesheet"
        />
        <title>Sizzy Privacy Policy</title>
      </Head>

      <body>
        <div className="privacy">
          <div style={{ maxWidth: 900, margin: "auto" }}>
            <h2>Privacy Policy</h2>
            <div style={{ fontSize: 14, opacity: 0.5 }}>
              Last updated on 01 September 2021
            </div>
            <p>
              <span className={"text"}>
                The following document (&ldquo;Privacy Policy&rdquo;) contains
                information about all use of personal data on the sizzy.co
                website and in the Sizzy app. Both sizzy.co
                (&ldquo;Website&rdquo;) and the Sizzy app (&ldquo;Sizzy&rdquo;)
                are services (&ldquo;Services&rdquo;) of Kristijan Ristovski
                &ldquo;Kitze&rdquo;, registered in the Polish Central Register
                and Information on Economic Activity, tax id no. PL5842776821,
                who is{" "}
              </span>
              <strong>
                the controller responsible for the processing of personal data
                through the Services
              </strong>
              <span className={"text"}>
                {" "}
                (&ldquo;we&rdquo;). By using any of the Services, you agree to
                this Privacy Policy.&nbsp;
              </span>
            </p>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 5,
                padding: "5px 15px",
              }}
            >
              <p>
                <strong>Summary:</strong>
              </p>
              <ul>
                <li className={"text"}>
                  <span className={"text"}>
                    By purchasing a License Key via the Website, subscribing to
                    our newsletter, submitting a complaint, withdrawing from the
                    contract or simply contacting us, you provide us with your
                    personal data and we guarantee that your data will remain
                    confidential, secure and will not become available to any
                    third party without your permission.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    All personal data that we obtain is either provided to us
                    voluntarily or collected automatically, in order to properly
                    fulfill our rights and obligations under the Terms and
                    Conditions.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    We use cookies for the proper functioning of the Website, as
                    well as Google Analytics for statistical information.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    We do our best to protect your privacy and all personal data
                    that we obtain and only keep the data for as long as it is
                    absolutely necessary.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    You have some rights concerning the processing of your
                    personal data, arising from the applicable law.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    We may update this Privacy Policy from time to time and will
                    notify everyone when this happens.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    You can contact us anytime at: contact@mg.sizzy.co
                  </span>
                </li>
              </ul>
            </div>
            <h3>How personal data is obtained</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    Personal data means any information relating to an
                    identified or identifiable natural person. We collect and
                    receive personal data through the Website and through
                    Sizzy.&nbsp;
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>We collect personal data:</span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      that you choose to voluntarily provide to us for your use
                      of the Services;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      by using cookies, including similar technologies such as
                      local storage when you visit the Website;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      by automatically receiving data from your Sizzy, after you
                      activate your license (only the IP address, computer ID,
                      computer name, OS name, and version of Sizzy - after you
                      activate your License Key, each time you run Sizzy on your
                      device);
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    Sizzy has a built-in web browser. Browsing history is
                    limited to the last URL entered and is stored only locally
                    on your device. This data is not sent or synced anywhere.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    We automatically send crash reports and anonymous usage data through{" "}
                    <a
                      href="https://posthog.com/"
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      PostHog
                    </a>
                    . This data is completely anonymous and it only tracks the
                    usage of features, plugins, settings etc. This data helps us
                    prioritize work and improve Sizzy. Usage analytics do not
                    include any personal data or sensitive information. You can
                    opt-out out of sending usage data and crash reports in
                    Settings `{"->"} About.
                  </span>
                </li>
              </ol>
            </ol>
            <h3>The types of personal data we may obtain</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may collect and receive the following personal data:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>country of your location;</span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>your name and email address;</span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      your VAT number, company name and company address;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      your payment details (such as bank account information,
                      cardholder name, card number, card expiration date and
                      security code / CVV);
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      personal data included in comments posted by you on our
                      Trello board;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      IP address, computer ID, computer name, OS name, and
                      version of Sizzy (after you activate your License Key,
                      each time you run Sizzy on your device).
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may collect other types of personal data if required
                    under applicable law or if necessary for the purposes listed
                    below. We will then inform you and ensure that there is a
                    valid legal basis for doing so.
                  </span>
                </li>
              </ol>
            </ol>
            <h3>How we may use personal data</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may use the personal data we collect and receive for the
                    following purposes:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      To conclude and perform our purchase and license
                      agreement, under the applicable Terms and Conditions;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      To analyze how the Website is used, such as which pages
                      are visited, how long pages were visited and the paths
                      taken by visitors to the Website as they move from page to
                      page;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      To verify compliance with applicable legal requirements
                      and our Terms and Conditions;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      To contact you, such as by sending personalized emails,
                      about our products and services, or to send you our
                      newsletter.
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We process personal data because it is necessary for the
                    performance of the contract between you and us, for our
                    compliance with our legal obligations and for the purpose of
                    our legitimate interests. In particular, our legitimate
                    interests are our commercial company interest (e.g. to
                    improve our products and services), our interest to make use
                    of direct marketing, our interest to prevent fraud and our
                    interest to report possible criminal acts or threats to
                    competent authorities.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    Please note that some of the personal data that we process
                    is required for us to meet our legal obligations. Providing
                    us with the following personal data may be necessary to
                    enter into a binding contract (to purchase a subscription)
                    and to receive an invoice:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      as a consumer - your name, email address, payment details;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      as a company or another legal entity - your name, email
                      address, company name, VAT number, payment details.
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    Cookies are bits of text that are placed on your
                    computer&rsquo;s hard drive or mobile device when you visit
                    certain websites. Cookies hold information that may be
                    accessible by the party that places a cookie, which is
                    either the website itself (first party cookie) or a third
                    party (third party cookies). You do have control over
                    cookies, and can refuse the use of cookies by selecting the
                    appropriate settings on your browser. Most browsers will
                    tell you how to stop accepting new cookies, how to be
                    notified when you receive a new cookie, and how to disable
                    or delete existing cookies. Please note, however, that by
                    not accepting or deleting the use of cookies, you may not be
                    able to properly use the Services. On the Website, we use
                    cookies for the following purposes:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      to gather Website statistical data to analyze how our
                      users use the Website. For this purpose, we use Google
                      Analytics. Google Analytics is a web analytics service
                      provided by Google, Inc., which uses cookies to help. The
                      information generated by the cookie about your use of the
                      Website (such as your IP address, the URL visited, the
                      date and time the page was viewed) will be transmitted and
                      stored by Google on servers in the United States or any
                      other country in which Google maintains facilities. Your
                      IP address will be masked by setting the last octet of
                      your IP address to zero before it is stored by Google.
                      Google will use this information to monitor your use of
                      our website, and to compile reports on website activity
                      for us. Google is not allowed to use this information for
                      their own purposes and may only transfer this information
                      to third parties where required by law, or where such
                      third parties process the information on Google&rsquo;s
                      behalf.
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      to show the Changelog widget provided by Headway. Headway
                      stores a cookie to know how many unread Changelog posts
                      you have since you last visited the Website, so it can
                      show you a badge with a number. The widget does not
                      aggregate information about the host website, nor does it
                      send information about users to Headwayapp.co. For more
                      information on how Headway deals with personal data, visit
                      https://headwayapp.co/privacy.&nbsp;
                    </span>
                  </li>
                </ol>
              </ol>
            </ol>
            <h3>How we may share personal data</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may share the personal data we collect and receive on a
                    need to know basis with the following third parties:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      Service providers, who guarantee the use of appropriate
                      security measures and the security of personal data
                      required by law;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      Competent public authorities or other third parties, if
                      required by law or reasonably necessary to protect the
                      rights, property and safety of ourselves or others.
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may also transfer your personal data in the event that we
                    sell or transfer all or a portion of our business or assets
                    on a need to know basis. Should such a sale or transfer
                    occur, we will use reasonable efforts to direct the
                    transferee to use personal data you have provided to us in a
                    manner that is consistent with applicable law and this
                    Privacy Policy.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    We do not sell, rent or trade your personal data.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    Please note that all payments, customer service inquiries
                    and returns are handled by Paddle.com, who is our official
                    reseller and Merchant of Record for all our orders. For
                    further information on how they handle personal data, see{" "}
                  </span>
                  <a
                    target="_blank"
                    href="https://paddle.com/privacy-buyers/index.page.tsx"
                  >
                    <span className={"text"}>
                      Paddle&rsquo;s Buyer Privacy Policy
                    </span>
                  </a>
                  <span className={"text"}>.</span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    Please note that when you purchase Sizzy, Paddle will ask
                    you if you want to receive product updates. If you say yes,
                    your email address will be added to our mailing list,
                    handled by Mailgun Technologies, Inc., 535 Mission St., San
                    Francisco, CA 94105.
                  </span>
                </li>
              </ol>
            </ol>
            <h3>Data transfers outside the EEA</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    We may transfer the personal data we obtain to third parties
                    in countries outside the European Economic Area (EEA). The
                    laws in those countries may not offer an adequate level of
                    data protection. In particular, personal data may be
                    transferred to the United States.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    When we transfer your personal data outside the EEA, we will
                    protect your personal data as described in this Privacy
                    Policy and in accordance with applicable law, such as by
                    entering into the European Commission&rsquo;s Standard
                    Contractual Clauses for the transfer of personal data to a
                    processor located outside of the European Union.
                  </span>
                </li>
              </ol>
            </ol>
            <h3>How we protect personal data</h3>
            <p>
              <span className={"text"}>
                We maintain appropriate technical and organizational security
                safeguards designed to protect your personal data against
                accidental, unlawful or unauthorized destruction, loss,
                alteration, access, disclosure or use. However, due to the
                inherent open nature of the Internet, we cannot guarantee that
                communications between you and us or the personal information
                stored is absolutely secure. We will notify you of any data
                breach that is likely to have unfavorable consequences for your
                privacy in accordance with applicable law.
              </span>
            </p>
            <h3>How Long We Retain Personal Data</h3>
            <p>
              <span className={"text"}>
                We retain personal data for as long as necessary to fulfil the
                purposes for which we collect or receive the personal data,
                except if required otherwise by applicable law. Typically, we
                will retain most of the personal data for the duration of your
                use of the Services, until you have cancelled your subscription,
                unless a longer applicable statutory retention period applies.
              </span>
            </p>
            <h3>Your Rights</h3>
            <ol>
              <ol>
                <li className={"text"}>
                  <span className={"text"}>
                    You have the following rights in relation to your personal
                    data:
                  </span>
                </li>
                <ol>
                  <li className={"text"}>
                    <span className={"text"}>
                      The right to obtain, at reasonable intervals and free of
                      charge, information on whether or not your personal data
                      are being processed and to receive the personal data that
                      is being processed in an intelligible form;
                    </span>
                  </li>
                  <li className={"text"}>
                    <span className={"text"}>
                      The right to request rectification, or erasure of personal
                      data, or restriction of, or objection to processing of
                      your personal data. You may also request us to provide you
                      your data in a structured, commonly used and machine
                      readable format which can be transmitted to another
                      controller.
                    </span>
                  </li>
                </ol>
                <li className={"text"}>
                  <span className={"text"}>
                    To exercise these rights, please contact us using our
                    contact details set out below. We may request you to provide
                    a copy of your ID card or to otherwise prove your identity.
                    We will respond to your request within the applicable
                    statutory term.
                  </span>
                </li>
                <li className={"text"}>
                  <span className={"text"}>
                    Moreover, subject to this Privacy Policy, you have the right
                    to lodge a complaint with the competent supervisory
                    authority.
                  </span>
                </li>
              </ol>
            </ol>
            <h3>Updates to this Privacy Policy</h3>
            <p>
              <span className={"text"}>
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes to this Privacy Policy on
                the Website or through other appropriate communication channels.
                All changes shall be effective from the date of publication,
                unless otherwise provided in the notification.
              </span>
            </p>
            <h3>How to Contact Us</h3>
            <p>
              <span className={"text"}>
                If you have any comments or inquiries concerning this Privacy
                Policy, if you would like us to update your personal data, or to
                exercise your rights, please email us at contact@mg.sizzy.co
              </span>
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      </body>
    </>
  );
};

export default Privacy;

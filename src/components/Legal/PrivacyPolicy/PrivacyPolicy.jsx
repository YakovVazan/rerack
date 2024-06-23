import { useEffect } from "react";
import "./PrivacyPolicy.css";
import SvgWarning from "../../svg/SvgWarning/SvgWarning";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.querySelector("#main-container").scrollTo(0, 0);
    document.querySelector("#main-container").style.scrollBehavior = "auto";
  });

  return (
    <>
      <div id="privacy-policy-container">
        <h2 id="disclaimer">
          <SvgWarning />
          <strong>
            SINCE RERACK IS A PRIVATE APP, THIS IS JUST A DEMO PAGE. MADE FOR
            PRACTICE PURPOSES ONLY!
          </strong>
        </h2>
        <h1>Privacy Policy</h1>
        <p>Last updated: February 08, 2024</p>
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy has been
          created with the help of the{" "}
          <a href="https://www.privacypolicies.com/privacy-policy-generator/">
            Privacy Policy Generator
          </a>
          .
        </p>
        <h2>Interpretation and Definitions</h2>
        <h3>Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <h3>Definitions</h3>
        <p>For the purposes of this Privacy Policy:</p>
        <ul>
          <li>
            <strong>Account</strong> means a unique account created for You to
            access our Service or parts of our Service.
          </li>
          <li>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party, where
            &quot;control&quot; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </li>
          <li>
            <strong>Company</strong> (referred to as either &quot;the
            Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
            this Agreement) refers to Rerack.
          </li>
          <li>
            <strong>Cookies</strong> are small files that are placed on Your
            computer, mobile device or any other device by a website, containing
            the details of Your browsing history on that website among its many
            uses.
          </li>
          <li>
            <strong>Country</strong> refers to: Israel
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone or a digital tablet.
          </li>
          <li>
            <strong>Personal Data</strong> is any information that relates to an
            identified or identifiable individual.
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>Service Provider</strong> means any natural or legal person
            who processes the data on behalf of the Company. It refers to
            third-party companies or individuals employed by the Company to
            facilitate the Service, to provide the Service on behalf of the
            Company, to perform services related to the Service or to assist the
            Company in analyzing how the Service is used.
          </li>
          <li>
            <strong>Usage Data</strong> refers to data collected automatically,
            either generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </li>
          <li>
            <strong>Website</strong> refers to Rerack, accessible from{" "}
            <a
              href="https://rerack.netlify.com"
              rel="external nofollow noopener"
            >
              https://rerack.netlify.com
            </a>
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </li>
        </ul>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <ul>
          <li>By email: rerack.plugs@gmail.com</li>
        </ul>
      </div>
    </>
  );
};

export default PrivacyPolicy;

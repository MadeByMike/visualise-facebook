import React, { Fragment } from "react";
import { connect } from "unistore/react";

const LandingText = props => {
  if (props.zip)
    return (
      <>
        <a className="main-title" href="/">
          <h1>← Visualise Facebook Data</h1>
        </a>
        {props.children}
      </>
    );

  return (
    <Fragment>
      <h1>Visualise Facebook Data</h1>
      <p>
        Facebook has an astonishing amount of information about you. While you
        can access and download some of your Facebook data, it can be hard to
        understand once you’ve downloaded it. This visualisation tries to solve
        that problem, without requiring you to share your data with anyone.
      </p>
      <p>
        To begin,{" "}
        <a href="https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav">
          download your data from Facebook
        </a>
        . Follow the instructions under the heading: "How do I download a copy
        of my information on Facebook?".
      </p>
      <p>
        Make sure you select the 'JSON' format and the media quality resolution
        as 'low'.
      </p>

      <p style={{ textAlign: "center", maxWidth: "100%" }}>
        <img
          src="/facebook-ui.png"
          alt="Facebook interface, showing the options to select to download data "
        />
      </p>
      <p>
        If you have a lot of data you can limit the date range or select only
        relevant data. This service will currently visualise messages, reactions
        and friend requests.
      </p>

      <p>
        Your Facebook data will be downloaded as a zip file. Once downloaded,
        drag and drop it below to begin. There's no need to unzip the file.
      </p>

      {props.children}
      <br />
      <p>
        <strong>No data is uploaded when using this service</strong>. All data
        processing is done in the browser. But if you have a lot of data or your
        computer is old, the visualisation may take some time to appear.
      </p>
      <p>
        We hope that this visualisation does a few things. At a practical level,
        we hope it provides some more insight into your Facebook data and
        assists the broader goal of improving data literacy. We also hope it
        gives you a sense of how much meaning can be made from this personal
        data. It can be relatively easy to identify trends and patterns. It
        didn’t take us long to develop these basic visualisation. It is likely
        organisations with more resources and access to your personal data are
        engaging in much more detailed forms of data analysis.
      </p>
      <footer>
        <img
          class="accan"
          src="/accan-logo.png"
          width="150"
          alt="ACCAN logo: Australian Communications Consumer Action Network"
        />
        <div>
          <p>Thanks to ACCAN for supporting this project.</p>
          <p>
            <em>
              The operation of the Australian Communications Consumer Action
              Network is made possible by funding provided by the Commonwealth
              of Australia under section 593 of the Telecommunications Act 1997.
              This funding is recovered from charges on telecommunications
              carriers.
            </em>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

const WrappedLandingText = connect("zip")(LandingText);

export default WrappedLandingText;

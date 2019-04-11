import React, { Fragment } from "react";
import { connect } from "unistore/react";

const LandingText = props => {
  if (props.zip)
    return (
      <a class="main-title" href="/">
        <h1>← Visualise Your Facebook Data</h1>
      </a>
    );

  return (
    <Fragment>
      <h1>Visualise Your Facebook Data</h1>
      <p>
        Facebook has an astonishing amount of information about you. While you
        can access and download some of your Facebook data, it can be hard to
        understand once you’ve downloaded it. This visualisation tries to solve
        the problem.
      </p>
      <p>
        You can{" "}
        <a href="https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav">
          download your data from Facebook
        </a>
        . Just follow the instructions under the question "How do I download a
        copy of my information on Facebook?".
      </p>
      <p>
        Make sure you select 'JSON' as the format of your download request the
        media quality resolution as 'low'.
      </p>

      <p style={{ textAlign: "center", maxWidth: "100%" }}>
        <img src="/image.png" alt="Facebook download data UI" />
      </p>

      <p>
        Your data will be downloaded as a zip file. When it has downloaded, just
        drag and drop it below and some of your Facebook data will be
        visualised. There's no need to unzip the file.
      </p>

      {props.children}
      <br />
      <p>
        <strong>No data is uploaded when using this service</strong> because all
        data processing is done in the browser. Nothing is sent through the
        internet. However, this means that if you have a lot of data or your
        computer is old, the data visualisation may take some time to appear. We
        hope that this visualisation does a few things. At a practical level, we
        provides some more insight into your Facebook data and assists the
        broader project of improving data literacy. We also hope it gives you an
        sense of how much meaning can be made from your personal data. It can be
        relatively easy to identify trends and patterns. It didn’t take long for
        us to develop this visualisation. It is likely that organisations with
        more resources and access to personal data are engaging in more detailed
        forms of data analytics.
      </p>
    </Fragment>
  );
};

const WrappedLandingText = connect("zip")(LandingText);

export default WrappedLandingText;

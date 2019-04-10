import React from "react";
import { connect } from "unistore/react";

const LandingText = props => {
  if (props.zip) return <h1>Visualise Your Facebook Data</h1>;

  return (
    <>
      <h1>Visualise Your Facebook Data</h1>

      <p>
        If you use Facebbook with any regularity, they have an astonishing
        amount of information about you.
      </p>
      <p>
        You can{" "}
        <a href="https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav">
          download your data
        </a>{" "}
        from Facebook in a <strong>JSON</strong> format and visualise it here.
      </p>
      <p>
        Select the zip file and drop it below. No data is uploaded when using
        this service. All data processing is done in the browser not on our
        servers.{" "}
      </p>
      <p>
        As you will see the data you give to Facebook can be quite personal and
        sometimes revealing. We hope you will not upload it anywhere and be more
        aware of what Facebook can do with your data.
      </p>
    </>
  );
};

const WrappedLandingText = connect("zip")(LandingText);

export default WrappedLandingText;

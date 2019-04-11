import React from "react";
import { connect } from "unistore/react";

const NoDataFound = props => {
  if ((props.friends && props.messages && props.reactions) !== false) {
    return null;
  }

  return (
    <p>
      No data found. Either your zip file was empty or there were errors. You
      could try extracting a larger data range.
    </p>
  );
};

const WrappedNoDataFound = connect("friends,messages,reactions")(NoDataFound);

export default WrappedNoDataFound;

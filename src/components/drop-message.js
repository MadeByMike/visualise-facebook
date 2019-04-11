import React from "react";
import { connect } from "unistore/react";

const DropMessage = props => {
  if (props.zip) return null;

  return <p>DROP FACEBOOK ZIP FILE HERE</p>;
};

const WrappedDropMessage = connect("zip")(DropMessage);

export default WrappedDropMessage;

import React from "react";
import { connect } from "unistore/react";

const DropMessage = props => {
  if (props.zip) return null;
  return (
    <div className="drop-message">
      <p>DROP FACEBOOK ZIP&nbsp;FILE&nbsp;HERE</p>
      <span className="drop-message-small">OR</span>
      <p>
        <input
          className="input-files"
          type="file"
          onChange={props.onFileInput}
        />
      </p>
    </div>
  );
};

const WrappedDropMessage = connect("zip")(DropMessage);

export default WrappedDropMessage;

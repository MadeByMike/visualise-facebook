import JSZip from "jszip";
import React, { Component } from "react";
import { connect } from "unistore/react";
import { actions } from "../functions/store";
import DropMessage from "./drop-message";

class DropZone extends Component {
  constructor() {
    super();
    this.state = { active: false };
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(e) {
    e.preventDefault();
    const files = e.target.files ? e.target.files : e.dataTransfer.files;

    this.setState({
      active: false
    });
    if (files) {
      if (files.length > 1) {
        alert("Too many files");
      } else {
        const file = files[0];
        var zip = new JSZip();
        zip.loadAsync(file).then(
          zip => {
            this.props.dropData(zip);
          },
          () => {
            alert("Not a valid zip file");
          }
        );
      }
    }
  }

  render() {
    return (
      <div
        className={`drop-zone ${this.state.active ? "is-active" : ""} ${
          this.props.zip ? "inactive" : ""
        }`}
        ref={this.dropzone}
        onDragOver={e => {
          e.preventDefault();
          if (!this.state.active) {
            this.setState({ active: true });
          }
        }}
        onDragLeave={e => {
          e.preventDefault();
          this.setState({ active: false });
        }}
        onDrop={this.handleFiles}
      >
        <DropMessage onFileInput={this.handleFiles} />
        {this.props.children}
        {!this.props.zip && (
          <span class="drop-message-disclaimer">(no data is uploaded)</span>
        )}
      </div>
    );
  }
}

const WrappedDropZone = connect(
  "zip",
  actions
)(DropZone);

export default WrappedDropZone;

import JSZip from "jszip";
import React, { Component } from "react";
import { connect } from "unistore/react";
import { actions } from "../functions/store";

class DropZone extends Component {
  constructor() {
    super();
    this.state = { active: false };
    this.handleFiles = this.handleFiles.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  handleFiles(e) {
    e.preventDefault();
    const files = e.target.files ? e.target.files : e.dataTransfer.files;

    this.setState({ active: false });
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
          this.setState({ active: true });
        }}
        onDragLeave={e => {
          e.preventDefault();
          this.setState({ active: false });
        }}
        onDrop={this.handleFiles}
      >
        <div className="drop-message">
          {this.props.children}
          {this.renderInput()}
        </div>
      </div>
    );
  }

  renderInput() {
    if (this.props.zip) return null;
    return (
      <p>
        <input
          className="input-files"
          type="file"
          onChange={this.handleFiles}
        />
      </p>
    );
  }
}

const WrappedDropZone = connect(
  "zip",
  actions
)(DropZone);

export default WrappedDropZone;

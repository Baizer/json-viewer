import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

import JsonViewer from "./JsonViewer";
import Styles from "./Styles";

const ERROR_TIMEOUT = 3000;
const ERROR_MESSAGE_LENGTH = 30;

class App extends PureComponent {
  state = {
    json: false,
    error: false,
    showDropzoneText: false
  };

  timer = false;

  handleDragEnter = () => {
    this.setState({
      error: false,
      showDropzoneText: true
    });
  };

  handleDragLeave = () => {
    this.setState({
      showDropzoneText: false
    });
  };

  handleDrop = (acceptedFiles, rejected) => {
    if (!acceptedFiles.length) {
      this.setState({
        showDropzoneText: false
      });
      this.renderError("Can not read file(s)");
      return;
    }

    var reader = new FileReader();

    reader.onload = () => {
      var text = reader.result;
      this.fileText = text;

      let json;
      try {
        json = JSON.parse(text);
      } catch (error) {
        this.renderError(this.getErrorText(error.message));
      }
      this.setState({ json, showDropzoneText: false });
    };
    reader.readAsText(acceptedFiles[0]);
  };

  getErrorText(error) {
    const errorCharacterPosition = parseInt(
      error.slice(error.search(/(\d+)(?!.*\d)/))
    );

    const errorCharacter = this.fileText.charAt(errorCharacterPosition);

    let errorTextBefore, errorTextAfter;

    if (errorCharacterPosition - ERROR_MESSAGE_LENGTH < 0) {
      errorTextBefore = this.fileText.slice(0, errorCharacterPosition);
    } else {
      errorTextBefore =
        "..." +
        this.fileText.slice(
          errorCharacterPosition - ERROR_MESSAGE_LENGTH,
          errorCharacterPosition
        );
    }

    if (
      errorCharacterPosition + ERROR_MESSAGE_LENGTH >
      this.fileText.length - 1
    ) {
      errorTextAfter = this.fileText.slice(errorCharacterPosition + 1);
    } else {
      errorTextAfter =
        this.fileText.slice(
          errorCharacterPosition + 1,
          errorCharacterPosition + ERROR_MESSAGE_LENGTH
        ) + "...";
    }

    return (
      <div>
        <div>{error}</div>
        <div style={Styles.jsonErrorString}>
          <span>{errorTextBefore}</span>
          <span style={Styles.errorCharacter}>{errorCharacter}</span>
          <span>{errorTextAfter}</span>
        </div>
      </div>
    );
  }

  renderError(error) {
    this.setState({ error }, () => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(
        () =>
          this.setState({
            error: false
          }),
        ERROR_TIMEOUT
      );
    });
  }

  render() {
    const { showDropzoneText, error, json } = this.state;
    const dropzoneText = showDropzoneText
      ? "Drop file..."
      : "Ready for JSON...";

    const readyStyles = showDropzoneText ? Styles.ready : {};
    const errorStyles = error ? Styles.error : {};

    return (
      <div
        style={{
          ...Styles.wrapper,
          ...Styles.baseStyles,
          ...readyStyles,
          ...errorStyles
        }}
      >
        <Dropzone
          disableClick={true}
          style={Styles.dropzone}
          multiple={false}
          accept="application/json"
          onDrop={this.handleDrop}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
        >
          {json ? (
            <div style={Styles.app}>
              <JsonViewer data={json} />
            </div>
          ) : error ? (
            <div style={Styles.dropzoneTextError}>{error}</div>
          ) : (
            <div style={Styles.dropzoneText}>{dropzoneText}</div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default App;

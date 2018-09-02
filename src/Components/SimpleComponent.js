import React, { PureComponent } from "react";

import Styles from "../Styles";

const STRING_LIMIT = 10;

export default class extends PureComponent {
  state = {
    collapsed:
      (this.props.type === "string" || this.props.type === "function") &&
      this.props.data.length > STRING_LIMIT
  };

  showCollapsedData = e => {
    e.stopPropagation();

    this.setState({
      collapsed: false
    });
  };

  render() {
    const { data, type, label } = this.props;
    const { collapsed } = this.state;
    let value = data;

    if (collapsed) {
      value = `${value.substr(0, STRING_LIMIT)}..."`;
    }

    const collapsedStyles = collapsed ? Styles.componentsContainer : {};
    const styles = { ...Styles[type], ...collapsedStyles };

    return (
      <React.Fragment>
        {label && <span style={Styles.label}>{label}: </span>}
        <span
          style={styles}
          onClick={
            type === "string" || type === "function"
              ? this.showCollapsedData
              : null
          }
        >
          {value}
        </span>
      </React.Fragment>
    );
  }
}

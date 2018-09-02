import React, { PureComponent } from "react";
import { isArray, pick } from "lodash";

import { getComponentFromData } from "../utils";
import Styles from "../Styles";

const DIGEST_KEYS_LIMIT = 3;
const DEPTH_MAXIMUM = 3;
const COUNTER_MINIMUM = 1;

export default class extends PureComponent {
  static propTypes;
  state = {
    collapsed: !this.props.root
  };

  isArrayType = isArray(this.props.data);
  openingBracket = this.isArrayType ? "[" : "{";
  closingBracket = this.isArrayType ? "]" : "}";

  toggleCollapse = e => {
    e.stopPropagation();

    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  renderDigest(data) {
    const { depth, label } = this.props;
    const objectKeys = Object.keys(data);
    const objectLength = objectKeys.length;

    let collapsedData;

    if (this.isArrayType) {
      collapsedData = objectKeys.splice(0, DIGEST_KEYS_LIMIT);
    } else {
      collapsedData = objectKeys.sort().splice(0, DIGEST_KEYS_LIMIT);
    }

    const currentData = pick(data, collapsedData);

    if (depth >= DEPTH_MAXIMUM) {
      return (
        <span>
          {label && <span style={Styles.label}>{label}: </span>}
          <span style={Styles.bracket}>{this.openingBracket}</span>
          ...
          <span style={Styles.bracket}>{this.closingBracket}</span>
        </span>
      );
    }

    return (
      <span onClickCapture={this.toggleCollapse}>
        <div style={Styles.labelWrap}>
          {depth === 1 && <span style={Styles.expandIcon}>▶</span>}
          {label && <span style={Styles.label}>{label}: </span>}
          {depth === 1 &&
            objectLength > COUNTER_MINIMUM && (
              <span style={Styles.counter}>{objectLength} </span>
            )}
        </div>
        <span style={Styles.componentsContainer}>
          <span style={Styles.bracket}>{this.openingBracket}</span>
          {collapsedData.map((value, key) => {
            const props = {
              label: !this.isArrayType && value,
              depth: depth + 1
            };
            return (
              <span key={key}>
                <span>{getComponentFromData(currentData[value], props)}</span>
                {key < collapsedData.length - 1 && ", "}
              </span>
            );
          })}
          {objectLength > collapsedData.length && " ..."}
          <span style={Styles.bracket}>{this.closingBracket}</span>
        </span>
      </span>
    );
  }

  renderCollection(currentData) {
    const { label, root, depth } = this.props;
    const objectKeys = Object.keys(currentData);

    let currentKeys;

    if (this.isArrayType) {
      currentKeys = objectKeys;
    } else {
      currentKeys = objectKeys.sort();
    }

    return (
      <div style={Styles.nestedWrap}>
        <div style={Styles.labelWrap} onClick={this.toggleCollapse}>
          <span style={Styles.expandIcon}>▼</span>
          {label && <span style={Styles.label}>{label}: </span>}
          {objectKeys.length > 1 && (
            <span style={Styles.counter}>{objectKeys.length} </span>
          )}
          <span style={Styles.bracket}>{this.openingBracket}</span>
          ...
          <span style={Styles.bracket}>{this.closingBracket}</span>
        </div>
        {currentKeys.map((value, key) => {
          const nextDepth = !this.state.collapsed && !root ? depth : depth + 1;
          const props = { label: value, depth: nextDepth };

          return (
            <div style={Styles.itemRow} key={key}>
              {getComponentFromData(currentData[value], props)}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const currentData = { ...this.props.data };

    return this.state.collapsed
      ? this.renderDigest(currentData)
      : this.renderCollection(currentData);
  }
}

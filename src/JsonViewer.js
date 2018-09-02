import React, { PureComponent } from "react";
import { getComponentFromData } from "./utils";

import "./fonts.css";

export default class extends PureComponent {
  render() {
    return getComponentFromData(this.props.data, { root: true, depth: 0 });
  }
}

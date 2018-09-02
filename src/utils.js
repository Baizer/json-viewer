import React from "react";
import {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isNull,
  isNaN,
  isUndefined,
  isDate,
  isRegExp,
  isObject,
  isArray
} from "lodash";

import { SimpleComponent, CollectionComponent } from "./Components";

export function getComponentFromData(data, props) {
  switch (true) {
    case isNull(data):
      return <SimpleComponent data={"Null"} type="null" {...props} />;
    case isNaN(data):
      return <SimpleComponent data={"NaN"} type="nan" {...props} />;
    case isUndefined(data):
      return <SimpleComponent data={"Undefined"} type="undefined" {...props} />;
    case isString(data):
      return <SimpleComponent data={`"${data}"`} type="string" {...props} />;
    case isNumber(data):
      return <SimpleComponent data={data} type="number" {...props} />;
    case isBoolean(data):
      return (
        <SimpleComponent data={data.toString()} type="boolean" {...props} />
      );
    case isFunction(data):
      return (
        <SimpleComponent data={data.toString()} type="function" {...props} />
      );
    case isDate(data):
      return (
        <SimpleComponent
          data={data.toLocaleTimeString()}
          type="date"
          {...props}
        />
      );
    case isRegExp(data):
      return (
        <SimpleComponent data={data.toString()} type="regexp" {...props} />
      );
    case isArray(data):
      return <CollectionComponent data={data} type="array" {...props} />;
    case isObject(data):
      return <CollectionComponent data={data} type="object" {...props} />;
  }
}

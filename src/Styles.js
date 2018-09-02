export default {
  baseStyles: {
    color: "black",
    lineHeight: "18px",
    fontSize: "14px",
    fontFamily: "Roboto"
  },
  app: {
    background: "white",
    margin: "10vh 0",
    width: "50vw",
    position: "relative",
    padding: "20px",
    boxShadow: "0 0 80px 15px #bbb7b7",
    borderRadius: "10px"
  },
  ready: {
    background: "grey"
  },
  error: {
    background: "#ffcece"
  },
  itemRow: {
    paddingLeft: "20px",
    display: "flex",
    alignItems: "center",
    minHeight: "28px",
    whiteSpace: "nowrap",
    overflow: "auto"
  },
  nestedWrap: {
    width: "100%"
  },
  labelWrap: {
    cursor: "pointer",
    minHeight: "28px",
    lineHeight: "28px",
    display: "inline-block"
  },
  label: {
    paddingRight: "4px",
    fontStyle: "italic",
    color: "#8c6e9c"
  },
  componentsContainer: {
    cursor: "pointer"
  },
  bracket: {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "0 3px"
  },
  expandIcon: {
    fontSize: "10px",
    lineHeight: "10px",
    marginRight: "3px",
    color: "#808080"
  },
  string: {
    verticalAlign: "text-bottom",
    maxWidth: "400px",
    maxHeight: "200px",
    display: "inline-block",
    color: "#5c7450",
    overflow: "auto",
    whiteSpace: "normal"
  },
  boolean: {
    fontWeight: "bold",
    color: "#cc7832"
  },
  date: {
    color: "#84bfce"
  },
  function: {
    color: "#24aaf9",
    fontStyle: "italic"
  },
  nan: {
    color: "#1c74d8"
  },
  undefined: {
    color: "#cc7832"
  },
  null: {
    color: "#cc7832"
  },
  number: {
    color: "#6591b4"
  },
  regexp: {
    color: "#00a55c"
  },
  errorCharacter: {
    display: "inline-block",
    background: "red",
    color: "white",
    padding: "0 3px"
  },
  jsonErrorString: {
    color: "#9a5c26",
    justifyContent: "center",
    display: "flex"
  },
  dropzone: {
    position: "relative",
    verticalAlign: "middle",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    display: "grid",
    placeItems: "center center"
  },
  dropzoneText: {
    position: "relative",
    zIndex: "9999"
  },
  dropzoneTextError: {
    padding: "20px 40px",
    whiteSpace: "nowrap",
    textAlign: "center",
    width: "300px",
    background: "#ffcece",
    margin: "0 auto",
    color: "#e40000",
    border: "2px solid #de3c3c",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0px #de3c3c"
  },
  counter: {
    background: "#6591b4",
    color: "white",
    borderRadius: "15px",
    padding: "0px 4px",
    lineHeight: "15px",
    fontSize: "11px",
    display: "inline-block",
    verticalAlign: "text-top"
  }
};

import React from "react";
import "./Highlight.css"; 

const Highlight = ({ children }) => {
  return <span className="highlight">{children}</span>;
};

export default Highlight;

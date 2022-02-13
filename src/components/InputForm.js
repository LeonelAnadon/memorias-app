import React from "react";
import "../App.css";

const InputForm = ({ labelValue, types }) => {
  return (
    <>
      {types === "input" ? (
        <div className="group-input">
          <input type="text" required />
          <span></span>
          <label>{labelValue}</label>
        </div>
      ) : (
        <div className="group-input">
          <textarea type="text" rows="6" required />
          <span></span>
          <label>{labelValue}</label>
        </div>
      )}
    </>
  );
};

export default InputForm;

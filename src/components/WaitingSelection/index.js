import React from "react";

const WaitingSelection = ({ message, render, icon, border }) => {
  return (
    <div
      className={`waiting-selection ${!!render}`}
      style={border ? { border: "1px solid var(--dark-grey)" } : null}
    >
      <div className="container">
        {icon}
        <div>{message}</div>
      </div>
    </div>
  );
};
export default WaitingSelection;

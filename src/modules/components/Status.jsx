import React from "react";
import PropTypes from "prop-types";

export const Status = ({ value, activeText, inactiveText, activeClass, inactiveClass }) => {
  return (
    <div>
      {value === 1 ? (
        <span className={`p-1 px-3 rounded-full ${activeClass}`}>
          {activeText}
        </span>
      ) : (
        <span className={`p-1 px-3 rounded-full ${inactiveClass}`}>
          {inactiveText}
        </span>
      )}
    </div>
  );
};

Status.defaultProps = {
  value: 0,
  activeText: "Active",
  inactiveText: "Inactive",
  activeClass: "text-white bg-green-500",
  inactiveClass: "text-white bg-red-500",
};

Status.propTypes = {
  value: PropTypes.number.isRequired,
  activeText: PropTypes.string,
  inactiveText: PropTypes.string,
  activeClass: PropTypes.string,
  inactiveClass: PropTypes.string,
};
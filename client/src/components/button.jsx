import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Button({ type = "button", size = "md", variant = "primary", onClick, children, className, disabled }) {
  const buttonClass = classNames(`btn-${variant}`, `btn-${size}`, className);

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  size: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

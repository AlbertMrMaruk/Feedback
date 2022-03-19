import PropTypes from "prop-types";

function Button({ children, type, version, isDisabled, onClick }) {
  return (
    <button
      type={type}
      className={`btn btn-${version}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "submit",
  version: "primary",
  isDisabled: false,
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  version: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Button;

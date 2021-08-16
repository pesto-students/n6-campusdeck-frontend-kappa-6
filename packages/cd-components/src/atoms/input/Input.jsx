import PropTypes from "prop-types";
import cx from "classnames";

// constants
import INPUT_SIZE from "./constants/input.size";

// styles
import styles from "./input.module.css";

const Input = ({ size, placeholder }) => {
  const classNames = cx(styles.input, styles[size]);

  return <input className={classNames} placeholder={placeholder} />;
};

Input.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  size: INPUT_SIZE.MEDIUM,
  placeholder: undefined
};

export default Input;

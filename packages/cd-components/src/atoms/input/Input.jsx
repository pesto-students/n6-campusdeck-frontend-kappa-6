import PropTypes from "prop-types";
import cx from "classnames";

// constants
import INPUT_SIZE from "./constants/input.size";

// styles
import styles from "./input.module.scss";

const Input = ({ size, placeholder, onKeyUp, ...props }) => {
  // TODO: move this to a helper
  // dynamically generate class name
  const classNames = cx(styles.input, styles[size]);

  const handleSearch = e => {
    const val = e.target.value;

    if (e.keyCode === 13 && val) {
      e.target.value = "";
      onKeyUp(val);
    }
  };

  return (
    <input
      {...props}
      className={classNames}
      placeholder={placeholder}
      onKeyUp={handleSearch}
    />
  );
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

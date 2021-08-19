import PropTypes from "prop-types";
import cx from "classnames";

// constants
import BUTTON_TYPES from "./constants/button.types";
import BUTTON_SIZE from "./constants/button.size";

// styles
import styles from "./button.module.css";

const Button = ({ text, type, size, className, ...restProps }) => {
  // dynamically generating classnames based on the button type
  const classStr = cx(styles.btn, styles[size], className, {
    [styles.label]: type === BUTTON_TYPES.LABEL,
    [styles.regular]: type === BUTTON_TYPES.REGULAR,
    [styles.add]: type === BUTTON_TYPES.ADD,
    [styles.skeleton]: type === BUTTON_TYPES.SKELETON
  });

  return (
    <button {...restProps} className={classStr}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  classes: PropTypes.string
};

Button.defaultProps = {
  text: undefined,
  type: BUTTON_TYPES.REGULAR,
  size: BUTTON_SIZE.MEDIUM,
  classes: undefined
};

export default Button;

import PropTypes from "prop-types";
import cx from "classnames";

// constants
import BUTTON_TYPES from "./constants/button.types";
import BUTTON_SIZE from "./constants/button.size";

// styles
import styles from "./button.module.css";

const Button = ({ text, type, size, classes, ...props }) => {
  // dynamically generating classnames based on the button type
  const classNames = cx(styles.btn, styles[size], classes, {
    [styles.label]: type === BUTTON_TYPES.LABEL,
    [styles.regular]: type === BUTTON_TYPES.REGULAR,
    [styles.add]: type === BUTTON_TYPES.ADD,
    [styles.skeleton]: type === BUTTON_TYPES.SKELETON
  });

  return (
    <button {...props} className={classNames}>
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

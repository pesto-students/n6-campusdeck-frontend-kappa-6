import PropTypes from "prop-types";
import cx from "classnames";

// constants
import BUTTON_TYPES from "./constants/button.types";
import BUTTON_SIZE from "./constants/button.size";

// styles
import styles from "./button.module.scss";

const Button = ({
  text,
  type,
  size,
  className,
  onClick,
  children,
  ...restProps
}) => {
  // dynamically generating classnames based on the button type
  const classStr = cx(styles.btn, styles[size], className, {
    [styles.regular]: type === BUTTON_TYPES.REGULAR,
    [styles.skeleton]: type === BUTTON_TYPES.SKELETON
  });

  return (
    <button className={classStr} onClick={onClick} {...restProps}>
      {text || children}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string
};

Button.defaultProps = {
  type: BUTTON_TYPES.REGULAR,
  size: BUTTON_SIZE.MEDIUM,
  className: undefined,
  onClick: () => console.log("Button clicked"),
  children: undefined
};

export default Button;

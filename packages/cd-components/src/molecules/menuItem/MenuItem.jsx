import PropTypes from "prop-types";
import cx from "classnames";

// styles
import styles from "./menuItem.module.scss";

const MenuItem = ({ active, label, children, destination }) => {
  const className = cx(styles.container, {
    [styles.active]: active
  });

  return (
    <div className={className}>
      <div className={styles.icon}>{children}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

MenuItem.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  destination: PropTypes.string
};

MenuItem.defaultProps = {
  active: false,
  label: undefined,
  destination: undefined
};

export default MenuItem;

import PropTypes from "prop-types";
import cx from "classnames";

// styles
import styles from "./menuItem.module.scss";

const MenuItem = ({ active, label, children, destination, history }) => {
  const className = cx(styles.container, {
    [styles.active]: active
  });

  const goToDestination = () => {
    console.log(history);
    history.push(destination);
  };

  return (
    <div className={className}>
      <div className={styles.icon}>{children}</div>
      <div onClick={goToDestination} className={styles.label}>
        {label}
      </div>
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

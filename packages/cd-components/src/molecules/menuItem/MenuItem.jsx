import cx from "classnames";

// styles
import styles from "./menuItem.module.css";

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

export default MenuItem;

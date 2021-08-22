import PropTypes from "prop-types";

import { BellFilled } from "../../atoms/icon";

import styles from "./actionIcons.module.scss";

const ActionIcons = () => {
  return (
    <div className={styles.container}>
      <BellFilled className={styles.icon} />
    </div>
  );
};

ActionIcons.propTypes = {};

ActionIcons.defaultProps = {};

export default ActionIcons;

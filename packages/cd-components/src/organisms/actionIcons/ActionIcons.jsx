import PropTypes from "prop-types";

import { Mail as MailIcon, Bell as BellIcon } from "../../atoms/icon";

import styles from "./actionIcons.module.css";

const ActionIcons = () => {
  return (
    <div className={styles.container}>
      {/* <MailIcon className={styles.icon} /> */}
      <BellIcon className={styles.icon} />
    </div>
  );
};

ActionIcons.propTypes = {};

ActionIcons.defaultProps = {};

export default ActionIcons;

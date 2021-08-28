import { Tooltip } from "antd";
import { BellFilled } from "../../atoms/icon";

// styles
import styles from "./actionIcons.module.scss";

const ActionIcons = () => {
  return (
    <div className={styles.container}>
      <Tooltip placement='bottom' title='Notifications'>
        <BellFilled className={styles.icon} />
      </Tooltip>
    </div>
  );
};

ActionIcons.propTypes = {};

ActionIcons.defaultProps = {};

export default ActionIcons;

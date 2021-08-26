// icons
import {
  HomeFilled,
  GlobalOutlined,
  UserOutlined,
  CompassFilled
} from "../../atoms/icon";

// components
import MenuItem from "../menuItem/MenuItem";

// styles
import styles from "./leftSidebar.module.scss";

const LeftSidebar = () => {
  return (
    <div className={styles.container}>
      <MenuItem active label='Home' destination='/'>
        <HomeFilled />
      </MenuItem>
      <MenuItem label='Global Feed' destination='/global'>
        <GlobalOutlined />
      </MenuItem>
      <MenuItem label='My Profile' destination='/profile'>
        <UserOutlined />
      </MenuItem>
      <MenuItem label='Explore' destination='/explore'>
        <CompassFilled />
      </MenuItem>
    </div>
  );
};

LeftSidebar.propTypes = {};

LeftSidebar.defaultProps = {};

export default LeftSidebar;

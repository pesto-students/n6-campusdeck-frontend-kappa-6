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

const LeftSidebar = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <MenuItem active label='Home' destination='/' onClick={onClick}>
        <HomeFilled />
      </MenuItem>
      <MenuItem label='Global Feed' destination='/global' onClick={onClick}>
        <GlobalOutlined />
      </MenuItem>
      <MenuItem label='My Profile' destination='/profile' onClick={onClick}>
        <UserOutlined />
      </MenuItem>
      <MenuItem label='Explore' destination='/explore' onClick={onClick}>
        <CompassFilled />
      </MenuItem>
    </div>
  );
};

LeftSidebar.propTypes = {};

LeftSidebar.defaultProps = {};

export default LeftSidebar;

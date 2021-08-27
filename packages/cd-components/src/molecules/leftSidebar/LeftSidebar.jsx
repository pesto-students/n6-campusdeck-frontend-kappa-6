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

const LeftSidebar = ({ history }) => {
  return (
    <div className={styles.container}>
      <MenuItem active label='Home' destination='/' history={history}>
        <HomeFilled />
      </MenuItem>
      <MenuItem label='Global Feed' destination='/global' history={history}>
        <GlobalOutlined />
      </MenuItem>
      <MenuItem label='My Profile' destination='/profile' history={history}>
        <UserOutlined />
      </MenuItem>
      <MenuItem label='Explore' destination='/explore' history={history}>
        <CompassFilled />
      </MenuItem>
    </div>
  );
};

LeftSidebar.propTypes = {};

LeftSidebar.defaultProps = {};

export default LeftSidebar;

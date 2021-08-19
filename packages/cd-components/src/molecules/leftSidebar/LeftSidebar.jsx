// icons
import { Home, Globe, User, Compass } from "../../atoms/icon";

// components
import MenuItem from "../menuItem/MenuItem";

// styles
import styles from "./leftSidebar.module.css";

const LeftSidebar = () => {
  return (
    <div className={styles.container}>
      <MenuItem active label='Home' destination='/'>
        <Home />
      </MenuItem>
      <MenuItem label='Global Feed' destination='/global'>
        <Globe />
      </MenuItem>
      <MenuItem label='My Profile' destination='/profile'>
        <User />
      </MenuItem>
      <MenuItem label='Explore' destination='/explore'>
        <Compass />
      </MenuItem>
    </div>
  );
};

export default LeftSidebar;

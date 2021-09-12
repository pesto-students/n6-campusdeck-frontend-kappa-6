// components
import MenuItem from "../menuItem/MenuItem";

// styles
import styles from "./leftSidebar.module.scss";

const LeftSidebar = ({ onClick, links }) => {
  return (
    <div className={styles.container}>
      {links.length &&
        links.map(link => (
          <MenuItem
            key={link.destination}
            active={link.isActive}
            label={link.label}
            destination={link.destination}
            onClick={onClick}
          >
            {link.icon}
          </MenuItem>
        ))}
    </div>
  );
};

LeftSidebar.propTypes = {};

LeftSidebar.defaultProps = {};

export default LeftSidebar;

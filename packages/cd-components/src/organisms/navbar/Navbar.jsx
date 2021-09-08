import PropTypes from "prop-types";
import Logo from "../../atoms/logo/Logo";
import UserInfo from "../../atoms/userInfo/UserInfo";
import SearchBox from "../../molecules/searchBox/SearchBox";
import ActionIcons from "../actionIcons/ActionIcons";
import { Button } from "@cd/components";

// styles
import styles from "./navbar.module.scss";

const Navbar = ({ userName, userImg, logout, onKeyUp }) => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <SearchBox onKeyUp={onKeyUp} />
      <ActionIcons />
      {userName ? (
        <>
          <UserInfo userName={userName} profileImg={userImg} />
          <Button
            style={{ marginLeft: "-4rem", marginRight: "10rem" }}
            size='small'
            onClick={logout}
          >
            Logout
          </Button>
        </>
      ) : null}
    </nav>
  );
};

Navbar.propTypes = {
  userName: PropTypes.string,
  userImg: PropTypes.string
};

Navbar.defaultProps = {
  userName: ""
};

export default Navbar;

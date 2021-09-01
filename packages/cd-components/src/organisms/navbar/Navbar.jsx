import Logo from "../../atoms/logo/Logo";
import UserInfo from "../../atoms/userInfo/UserInfo";
import SearchBox from "../../molecules/searchBox/SearchBox";
import ActionIcons from "../actionIcons/ActionIcons";

// styles
import styles from "./navbar.module.scss";

const Navbar = ({ userName, userImg }) => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <SearchBox />
      <ActionIcons />
      <UserInfo userName={userName} profileImg={userImg} />
    </nav>
  );
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;

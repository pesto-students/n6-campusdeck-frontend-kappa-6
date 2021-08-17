import Logo from "../../atoms/logo/Logo";
import UserInfo from "../../atoms/userInfo/UserInfo";
import SearchBox from "../../molecules/searchBox/SearchBox";
import ActionIcons from "../actionIcons/ActionIcons";

// styles
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <SearchBox />
      <ActionIcons />
      <UserInfo userName='Pushpak Bhattacharya' />
    </nav>
  );
};

export default Navbar;

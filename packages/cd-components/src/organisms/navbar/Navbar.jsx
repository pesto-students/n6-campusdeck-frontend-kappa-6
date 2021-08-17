import Logo from "../../atoms/logo/Logo";
import UserInfo from "../../atoms/userInfo/UserInfo";
import SearchBox from "../../molecules/searchBox/SearchBox";

// styles
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Logo />
      <SearchBox />
      <UserInfo userName='Pushpak Bhattacharya' />
    </div>
  );
};

export default Navbar;

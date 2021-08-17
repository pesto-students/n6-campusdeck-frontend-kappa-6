import Logo from "../../atoms/logo/Logo";
import Input from "../../atoms/input/Input";
import UserInfo from "../../atoms/userInfo/UserInfo";

// styles
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Logo />
      <Input size='medium' placeholder='Search posts or space...' />
      <UserInfo userName='Pushpak Bhattacharya' />
    </div>
  );
};

export default Navbar;

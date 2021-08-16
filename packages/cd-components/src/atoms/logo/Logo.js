import styles from "./logo.module.css";
import FullLogo from "./assets/fullLogo.png";

const Logo = () => {
  return <img className={styles.img} src={FullLogo}></img>;
};

export default Logo;

// styles
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <a href='#' className={styles.link}>
        Help
      </a>
      <a href='#' className={styles.link}>
        About
      </a>
      <a href='#' className={styles.link}>
        Contact us
      </a>
      <a href='#' className={styles.link}>
        Careers
      </a>
      <a href='#' className={styles.link}>
        Terms
      </a>
      <a href='#' className={styles.link}>
        Privacy Policy
      </a>
      <a href='#' className={styles.link}>
        Advertise
      </a>
    </div>
  );
};

export default Footer;

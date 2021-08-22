import cx from "classnames";

import LogoImage from "./assets/logoImage.png";
import LogoText from "./assets/logoText.png";

// utility
import { isMobile } from "@cd/base";

// styles
import styles from "./logo.module.scss";

const Logo = () => {
  // hide the logo text if the user is on mobile
  const classNames = cx(styles.logo_text, {
    [styles.hidden]: isMobile === true
  });

  return (
    <div className={styles.container}>
      <img className={styles.img} src={LogoImage}></img>
      <img className={classNames} src={LogoText}></img>
    </div>
  );
};

export default Logo;

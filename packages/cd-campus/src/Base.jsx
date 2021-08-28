import { Navbar } from "@cd/components";

// styles
import styles from "./base.module.scss";

const Base = () => {
  return (
    <div className={styles.container}>
      <Navbar />
    </div>
  );
};

export default Base;

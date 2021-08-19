import { ArrowUp, ArrowDown } from "../../atoms/icon";

//styles
import styles from "./points.module.css";

const Points = ({ points }) => {
  return (
    <div className={styles.container}>
      <ArrowUp className={styles.arrow} size={28} strokeWidth={2.5} />
      <div className={styles.points}>{points}</div>
      <ArrowDown className={styles.arrow} size={28} strokeWidth={2.5} />
    </div>
  );
};

export default Points;

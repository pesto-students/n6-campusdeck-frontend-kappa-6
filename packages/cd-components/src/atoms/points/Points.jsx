import PropTypes from "prop-types";

import { ArrowUp, ArrowDown } from "../../atoms/icon";

//styles
import styles from "./points.module.scss";

const Points = ({ points }) => {
  return (
    <div className={styles.container}>
      <ArrowUp className={styles.arrow} size={28} strokeWidth={2.5} />
      <div className={styles.points}>{points}</div>
      <ArrowDown className={styles.arrow} size={28} strokeWidth={2.5} />
    </div>
  );
};

Points.propTypes = {
  // points type is string because for larger numbers we need to use shorthand eg. 4.5k
  points: PropTypes.string
};

Points.defaultProps = {
  points: undefined
};

export default Points;

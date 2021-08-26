import PropTypes from "prop-types";

import { ArrowUpOutlined, ArrowDownOutlined } from "../icon";

// styles
import styles from "./points.module.scss";

const Points = ({ points }) => {
  return (
    <div className={styles.container}>
      <ArrowUpOutlined className={styles.arrow} />
      <div className={styles.points}>{points}</div>
      <ArrowDownOutlined className={styles.arrow} />
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

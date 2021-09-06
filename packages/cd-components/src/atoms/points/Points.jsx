import PropTypes from "prop-types";

import { compactNumber } from "@cd/base";
import { ArrowUpOutlined, ArrowDownOutlined } from "../icon";

// styles
import styles from "./points.module.scss";

const Points = ({ likes, likePost }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("profile"));

  const hasUserLiked =
    likes?.findIndex(id => id === loggedInUser?.result?._id) === -1
      ? false
      : true;

  return (
    <div className={styles.container}>
      <ArrowUpOutlined
        style={{ color: hasUserLiked ? "blue" : "" }}
        className={styles.arrow}
        onClick={likePost}
      />
      <div className={styles.points}>{compactNumber(likes?.length)}</div>
      <ArrowDownOutlined className={styles.arrow} />
    </div>
  );
};

Points.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  likePost: PropTypes.func.isRequired
};

export default Points;

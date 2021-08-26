import PropTypes from "prop-types";

// styles
import styles from "./postDetails.module.scss";

import { CommentOutlined } from "../icon/Icon";

const PostDetails = ({ time, totalComments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
      <div className={styles.comment}>
        <CommentOutlined style={{ paddingRight: "0.3rem" }} />
        {totalComments}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  time: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired
};

export default PostDetails;

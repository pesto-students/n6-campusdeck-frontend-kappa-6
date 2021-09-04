import PropTypes from "prop-types";

// styles
import styles from "./postDetails.module.scss";

import { CommentOutlined } from "../icon/Icon";

const PostDetails = ({ time, totalComments, toggleBody }) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
      <div className={styles.comment} onClick={toggleBody}>
        <CommentOutlined style={{ paddingRight: "0.3rem" }} />
        {totalComments}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  time: PropTypes.string.isRequired,
  totalComments: PropTypes.string.isRequired
};

export default PostDetails;

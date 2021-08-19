import PropTypes from "prop-types";

// styles
import styles from "./postDetails.module.css";

import { MessageSquare } from "../../atoms/icon/Icon";

const PostDetails = ({ time, totalComments }) => {
  return (
    <div className={styles.container}>
      <div className={styles.time}>{time}</div>
      <div className={styles.comment}>
        <MessageSquare size={18} style={{ paddingTop: "2px" }} />
        {totalComments}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  time: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired
};

PostDetails.defaultProps = {
  time: undefined,
  totalComments: 0
};

export default PostDetails;

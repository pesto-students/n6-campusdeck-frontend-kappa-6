import PropTypes from "prop-types";
import moment from "moment";
import { Tooltip } from "antd";

// styles
import styles from "./postDetails.module.scss";

import { CommentOutlined } from "../icon/Icon";

const PostDetails = ({ time, totalComments, toggleBody }) => {
  return (
    <div className={styles.container}>
      <Tooltip title={moment(time).format("YYYY-MM-DD HH:mm:ss")}>
        <div className={styles.time}>{moment(time).fromNow()}</div>
      </Tooltip>
      <div className={styles.comment} onClick={toggleBody}>
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

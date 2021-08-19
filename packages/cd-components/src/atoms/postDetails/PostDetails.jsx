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

export default PostDetails;

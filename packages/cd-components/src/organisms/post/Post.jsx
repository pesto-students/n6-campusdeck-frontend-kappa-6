import PropTypes from "prop-types";

import { MoreVertical } from "../../atoms/icon/Icon";
import Button from "../../atoms/button/Button";
import Points from "../../atoms/points/Points";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";

//styles
import styles from "./post.module.scss";
import PostDetails from "../../atoms/postDetails/PostDetails";

const Post = ({
  id,
  title,
  content,
  label,
  type,
  points,
  time,
  totalComments,
  authorName,
  authorPic
}) => {
  const likePost = () => {};
  const dislikePost = () => {};

  return (
    <div className={styles.container}>
      <Points onLike={likePost} onDislike={dislikePost} points={points} />
      <div className={styles.post_header}>
        <div className={styles.post_title}>{title}</div>
        <Button className={styles.label} type='label'>
          {label}
        </Button>
        <MoreVertical className={styles.more} />
      </div>
      <div className={styles.post_body}>{content}</div>
      <div className={styles.separator}></div>
      <div className={styles.post_footnote}>
        <AuthorDetails authorName={authorName} authorPic={authorPic} />
        <PostDetails time={time} totalComments={totalComments} />
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  totalComments: PropTypes.number,
  authorName: PropTypes.string.isRequired,
  authorPic: PropTypes.string
};

Post.defaultProps = {
  label: undefined,
  totalComments: 0
};

export default Post;

import PropTypes from "prop-types";
import { useState } from "react";
import _truncate from "lodash/truncate";

import { MoreVertical } from "../../atoms/icon/Icon";
import Button from "../../atoms/button/Button";
import Points from "../../atoms/points/Points";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";

//styles
import styles from "./post.module.scss";
import PostDetails from "../../atoms/postDetails/PostDetails";

const Post = ({
  title,
  rawContent,
  label,
  type,
  points,
  time,
  totalComments,
  authorName,
  authorPic
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const likePost = () => {};
  const dislikePost = () => {};

  // function to toggle between post expanded and collapsed state
  const toggleBody = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded);
  };

  // if the post body is expanded then show the full content. Otherwise, truncate it to 500 characters
  const bodyContent = isExpanded
    ? rawContent
    : _truncate(rawContent, {
        length: 500
      });

  return (
    <div className={styles.container}>
      <Points
        className={styles.sidebar}
        onLike={likePost}
        onDislike={dislikePost}
        points={points}
      />
      <div className={styles.header}>
        <div className={styles.post_title}>{title}</div>
        <Button className={styles.label} type='label'>
          {label}
        </Button>
        <MoreVertical className={styles.more} />
      </div>
      <div className={styles.content}>
        <div className={styles.post_body} onClick={toggleBody}>
          {bodyContent}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.footer}>
          <AuthorDetails authorName={authorName} authorPic={authorPic} />
          <PostDetails time={time} totalComments={totalComments} />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
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

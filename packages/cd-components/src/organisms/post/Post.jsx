import PropTypes from "prop-types";
import { useState } from "react";
import _truncate from "lodash/truncate";
import cx from "classnames";
import { Tooltip } from "antd";

import { MoreOutlined } from "../../atoms/icon/Icon";
import Button from "../../atoms/button/Button";
import Points from "../../atoms/points/Points";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";
import ContextMenu from "../../molecules/contextMenu/ContextMenu";
import PostDetails from "../../atoms/postDetails/PostDetails";
import { compactNumber, countTotalComments } from "@cd/base";
import POST_LIMITS_BODY_TRUNCATE from "./constants/post.limits";
import { BUTTON_TYPE, BUTTON_SIZE, Comments } from "@cd/components";

//styles
import styles from "./post.module.scss";

const Post = ({
  title,
  rawContent,
  label,
  type,
  points,
  time,
  authorName,
  authorPic,
  size,
  space,
  campus,
  comments
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
        length:
          size === "full"
            ? POST_LIMITS_BODY_TRUNCATE.FULL
            : POST_LIMITS_BODY_TRUNCATE.COMPACT
      });

  const containerClassName = cx({
    [styles.container]: size === "full",
    [styles.compact_container]: size === "compact"
  });

  // recursively count all the comments
  const totalComments = countTotalComments(comments);

  return (
    <div className={containerClassName}>
      <div className={styles.points}>
        <Points
          onLike={likePost}
          onDislike={dislikePost}
          points={compactNumber(points)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.post_title}>{title}</div>
          <Button
            className={styles.label}
            size={BUTTON_SIZE.SMALL}
            type={BUTTON_TYPE.REGULAR}
          >
            {label}
          </Button>
          {size === "full" ? (
            <ContextMenu items={["Save", "Report", "Delete"]}>
              <MoreOutlined
                className={styles.more}
                style={{ fontSize: "1.2rem" }}
              />
            </ContextMenu>
          ) : (
            <PostDetails
              time={time}
              totalComments={compactNumber(totalComments)}
              toggleBody={toggleBody}
            />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.post_body} onClick={toggleBody}>
            {bodyContent}
          </div>
          <div className={styles.separator}></div>
          <div
            className={cx(styles.footer, {
              [styles.hidden]: size === "compact"
            })}
          >
            <AuthorDetails authorName={authorName} authorPic={authorPic} />
            <div className={styles.space_details}>
              <span className={styles.link}>{space}</span> of{" "}
              <span className={styles.link}>
                <Tooltip title={campus}>{campus}</Tooltip>
              </span>
            </div>
            <PostDetails
              toggleBody={toggleBody}
              time={time}
              totalComments={totalComments}
            />
          </div>
          {isExpanded && (
            <Comments
              comments={comments}
              totalComments={totalComments}
              authorName={authorName}
            />
          )}
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
  authorName: PropTypes.string.isRequired,
  authorPic: PropTypes.string,
  size: PropTypes.string,
  comments: PropTypes.array
};

Post.defaultProps = {
  label: undefined,
  size: "full",
  comments: []
};

export default Post;

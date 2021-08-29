import PropTypes from "prop-types";
import { useState } from "react";
import _truncate from "lodash/truncate";
import cx from "classnames";
import { Comment, Tooltip, List } from "antd";
import moment from "moment";

import { MoreOutlined } from "../../atoms/icon/Icon";
import Button from "../../atoms/button/Button";
import Points from "../../atoms/points/Points";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";
import ContextMenu from "../../molecules/contextMenu/ContextMenu";
import PostDetails from "../../atoms/postDetails/PostDetails";
import { compactNumber } from "@cd/base";
import POST_LIMITS_BODY_TRUNCATE from "./constants/post.limits";
import { BUTTON_TYPE, BUTTON_SIZE } from "@cd/components";
import { ProfilePic } from "../..";

//styles
import styles from "./post.module.scss";

const Post = ({
  title,
  rawContent,
  label,
  type,
  points,
  time,
  totalComments,
  authorName,
  authorPic,
  size,
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
            <PostDetails time={time} totalComments={totalComments} />
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
            <PostDetails time={time} totalComments={totalComments} />
          </div>
          {isExpanded && (
            <div className={styles.comments_container}>
              <div className={styles.comment_list}>
                <List
                  className='comment-list'
                  header={
                    <div className={styles.comment_header}>
                      Comments ({comments.length})
                      <Button
                        className={styles.comment_btn}
                        size={BUTTON_SIZE.SMALL}
                      >
                        Add new
                      </Button>
                    </div>
                  }
                  itemLayout='horizontal'
                  dataSource={comments}
                  renderItem={item => (
                    <li>
                      <Comment
                        actions={[
                          <span key='comment-list-reply-to-0'>Reply</span>
                        ]}
                        author={
                          <>
                            {item.author}
                            {item.author === authorName ? (
                              <Button
                                size='Small'
                                style={{
                                  marginLeft: "0.5rem",
                                  padding: "0.1rem 0.5rem",
                                  fontSize: "0.75rem",
                                  cursor: "default"
                                }}
                              >
                                Author
                              </Button>
                            ) : null}
                          </>
                        }
                        avatar={item.avatar ?? ProfilePic}
                        content={item.content}
                        datetime={
                          <>
                            <Tooltip
                              title={moment(item.datetime).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            >
                              {moment(item.datetime).fromNow()}
                            </Tooltip>
                          </>
                        }
                      />
                    </li>
                  )}
                />
              </div>
            </div>
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
  totalComments: PropTypes.number,
  authorName: PropTypes.string.isRequired,
  authorPic: PropTypes.string,
  size: PropTypes.string,
  comments: PropTypes.array
};

Post.defaultProps = {
  label: undefined,
  totalComments: 0,
  size: "full",
  comments: []
};

export default Post;

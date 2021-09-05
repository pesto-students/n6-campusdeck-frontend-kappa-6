import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _truncate from "lodash/truncate";
import cx from "classnames";
import { Tooltip } from "antd";

import {
  MoreOutlined,
  Button,
  Points,
  AuthorDetails,
  ContextMenu,
  PostDetails,
  Comments,
  BUTTON_SIZE,
  BUTTON_TYPE
} from "@cd/components";
import { compactNumber, countTotalComments } from "@cd/base";

import POST_LIMITS_BODY_TRUNCATE from "./constants/post.limits";
import { getUser } from "../../actions/auth";
import { getSpace } from "../../actions/space";
import { getCampusById } from "../../actions/campus";

// styles
import styles from "./post.module.scss";

const Post = ({
  title,
  tag,
  content,
  type,
  points,
  time,
  creator,
  size,
  spaceId,
  campusId,
  comments
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [author, setAuthor] = useState({
    authorName: "",
    authorImg: ""
  });
  const [postSpace, setPostSpace] = useState("");
  const [postCampus, setPostCampus] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { space } = useSelector(state => state.space);
  const { singleCampus } = useSelector(state => state.campus);

  const likePost = () => {};
  const dislikePost = () => {};

  // function to toggle between post expanded and collapsed state
  const toggleBody = () => {
    setIsExpanded(prevIsExpanded => !prevIsExpanded);
  };

  // if the post body is expanded then show the full content.
  // Otherwise, truncate it to 500 characters
  const bodyContent = isExpanded
    ? content
    : _truncate(content, {
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

  useEffect(() => {
    dispatch(getUser(creator));
    dispatch(getSpace(spaceId));
    dispatch(getCampusById(campusId));
  }, []);

  useEffect(() => {
    if (user) {
      setAuthor({
        authorName: user.name,
        authorImg: user.profileImg
      });
    }
  }, [user]);

  useEffect(() => {
    if (space) {
      setPostSpace(space.name);
    }
  }, [space]);

  useEffect(() => {
    if (singleCampus) {
      setPostCampus(singleCampus.name);
    }
  }, [singleCampus]);

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
            {tag}
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
          <div className={styles.separator} />
          <div
            className={cx(styles.footer, {
              [styles.hidden]: size === "compact"
            })}
          >
            <AuthorDetails
              authorName={author.authorName}
              authorPic={author.authorPic}
            />
            <div className={styles.space_details}>
              <span className={styles.link}>{postSpace}</span> of{" "}
              <span className={styles.link}>
                <Tooltip title={postCampus}>{postCampus}</Tooltip>
              </span>
            </div>
            <PostDetails
              toggleBody={toggleBody}
              time={time}
              totalComments={comments.length}
            />
          </div>
          {isExpanded && (
            <Comments
              commentIds={comments}
              totalComments={comments.length}
              authorName={creator}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  tag: PropTypes.string,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  spaceId: PropTypes.string.isRequired,
  campusId: PropTypes.string.isRequired,
  size: PropTypes.string,
  comments: PropTypes.array
};

Post.defaultProps = {
  tag: undefined,
  size: "full",
  comments: []
};

export default Post;

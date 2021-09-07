import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { getCampusById } from "../../actions/campus";
import { createComment, likePost } from "../../actions/post";
import * as api from "../../api/index";

// styles
import styles from "./post.module.scss";

const Post = ({
  id,
  title,
  tag,
  content,
  type,
  likes,
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
  const [allComments, setAllComments] = useState([]);
  const { singleCampus } = useSelector(state => state.campus);
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInUser = JSON.parse(localStorage.getItem("profile"));
  const finalComments = [];

  const likeThisPost = () => {
    dispatch(likePost(id));
  };

  const dislikePost = () => {};

  // navigate to the space page
  const navigateToSpace = () => {
    history.push(`/space/${spaceId}`);
  };

  const handleCommentSave = comment => {
    const newComment = {
      ...comment,
      parent: id,
      author: loggedInUser?.result?.name,
      authorImg: loggedInUser?.result?.profileImg
    };
    dispatch(createComment(newComment));
  };

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

  const getSpaceDetails = async spaceIdDb => {
    const {
      data: { data }
    } = await api.getSpace(spaceIdDb);
    setPostSpace(data.name);
  };

  const getCreatorDetails = async creatorId => {
    const {
      data: { data }
    } = await api.getUser(creatorId);
    setAuthor({
      authorName: data.name,
      authorImg: data.profileImg
    });
  };

  useEffect(() => {
    if (campusId) {
      dispatch(getCampusById(campusId));
    }

    if (creator) {
      getCreatorDetails(creator);
    }

    if (spaceId) {
      getSpaceDetails(spaceId);
    }
  }, []);

  useEffect(() => {
    if (singleCampus) {
      setPostCampus(singleCampus.name);
    }
  }, [singleCampus]);

  const getCommentFromId = async commentId => {
    return api.getCommentById(commentId);
  };

  useEffect(() => {
    const promiseArr = [];

    if (comments) {
      comments.forEach(comment => {
        promiseArr.push(getCommentFromId(comment));
      });

      Promise.all(promiseArr)
        .then(results => {
          results.forEach(result => {
            finalComments.push(result.data.data);
          });
        })
        .then(() => {
          setAllComments(finalComments);
        });
    }
  }, []);

  return (
    <div className={containerClassName}>
      <div className={styles.points}>
        <Points likePost={likeThisPost} onDislike={dislikePost} likes={likes} />
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
              <span className={styles.link} onClick={navigateToSpace}>
                {postSpace}
              </span>{" "}
              of{" "}
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
              comments={allComments}
              totalComments={allComments.length}
              authorName={creator}
              handleCommentSave={handleCommentSave}
            />
          )}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string,
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
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

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _truncate from "lodash/truncate";
import cx from "classnames";
import { message, Tooltip } from "antd";

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
    authorId: "",
    authorName: "",
    authorImg: ""
  });
  const [postSpace, setPostSpace] = useState("");
  const [postCampus, setPostCampus] = useState("");
  const [postLikes, setPostLikes] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [ctxMenuOpts, setCtxMenuOpts] = useState([]);
  const { singleCampus } = useSelector(state => state.campus);
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedInUser = JSON.parse(localStorage.getItem("profile"));
  const finalComments = [];

  const hasUserLiked =
    postLikes?.findIndex(likeId => likeId === loggedInUser?.result?._id) > -1;

  const likeThisPost = () => {
    if (hasUserLiked) {
      const newPostLikes = postLikes.filter(
        postLikeId => postLikeId !== loggedInUser?.result?._id
      );
      setPostLikes(newPostLikes);
    } else {
      setPostLikes([...postLikes, loggedInUser?.result?._id]);
    }
    dispatch(likePost(id));
  };

  const dislikePost = () => {};

  // navigate to the space page
  const navigateToSpace = () => {
    history.push(`/space/${spaceId}`);
  };

  // navigate to the user profile page
  const navigateToUserProfile = userId => {
    history.push(`/profile/${userId}`);
  };

  const handleCommentSave = comment => {
    const newComment = {
      ...comment,
      parent: id,
      author: loggedInUser?.result?.name,
      authorImg: loggedInUser?.result?.profileImg
    };

    dispatch(createComment(newComment, postComments, setPostComments));
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
  const totalComments = countTotalComments(postComments);

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
      authorId: data._id,
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

    if (likes.length) {
      setPostLikes(likes);
    }

    if (comments.length) {
      setPostComments(comments);
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

  const handlePostOpts = async ({ key }) => {
    if (key === "Save" || key === "Unsave") {
      const { data } = await api.savePost(loggedInUser?.result?._id, id);

      if (data.status === "success" && data.type === "added") {
        const newOpts = ctxMenuOpts.filter(opt => {
          return opt === "Save" ? "Unsave" : "Save";
        });
        setCtxMenuOpts(newOpts);
        message.success("Post saved to your favorites");
      } else if (data.status === "success" && data.type === "removed") {
        const newOpts = ctxMenuOpts.filter(opt => {
          return opt === "Unsave" ? "Save" : "Unsave";
        });
        setCtxMenuOpts(newOpts);
        message.success("Post removed from your favorites");
      }
    }
  };

  const getLoggedInUserDetails = async userId => {
    const {
      data: { data }
    } = await api.getUser(userId);
    return data;
  };

  useEffect(() => {
    const promiseArr = [];

    if (postComments) {
      postComments.forEach(comment => {
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
  }, [postComments]);

  useEffect(() => {
    const menuOpts = ["Report"];

    if (loggedInUser?.result?._id === creator) {
      menuOpts.push("Delete");
    }

    getLoggedInUserDetails(loggedInUser?.result?._id).then(user => {
      if (user.savedPosts.includes(id)) {
        menuOpts.push("Unsave");
      } else {
        menuOpts.push("Save");
      }
      setCtxMenuOpts(menuOpts);
    });
  }, []);

  return (
    <div className={containerClassName}>
      <div className={styles.points}>
        <Points
          likePost={likeThisPost}
          onDislike={dislikePost}
          likes={postLikes}
          hasUserLiked={hasUserLiked}
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
            <ContextMenu items={ctxMenuOpts} handler={handlePostOpts}>
              <MoreOutlined
                className={styles.more}
                style={{ fontSize: "1.2rem" }}
              />
            </ContextMenu>
          ) : (
            <div className={styles.post_details}>
              <PostDetails
                time={time}
                totalComments={postComments.length}
                toggleBody={toggleBody}
              />
            </div>
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
              authorId={author.authorId}
              authorName={author.authorName}
              authorPic={author.authorImg}
              onClick={navigateToUserProfile}
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
              totalComments={postComments.length}
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

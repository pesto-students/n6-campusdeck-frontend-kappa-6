import { Comment, Tooltip } from "antd";
import moment from "moment";

import { ProfilePic } from "../..";
import {
  Button,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled
} from "@cd/components";

// styles
import styles from "./comments.module.scss";

const Comments = ({ comments, authorName }) => {
  // dispatch action to like a comment
  const likeComment = () => {};
  // dispatch action to dislike a comment
  const dislikeComment = () => {};
  // this function will return a boolean based on whether the current logged in user has liked a comment
  const hasUserLiked = () => {
    return false;
  };

  // TODO: actions need to dynamic for a particular comment
  // actions available for a comment
  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={likeComment}>
        {hasUserLiked() ? <LikeFilled /> : <LikeOutlined />}
        <span className='comment-action'>1</span>
      </span>
    </Tooltip>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislikeComment}>
        {hasUserLiked() ? <DislikeFilled /> : <DislikeOutlined />}
        <span className='comment-action'>0</span>
      </span>
    </Tooltip>,
    <span key='comment-basic-reply-to'>Reply</span>
  ];

  return (
    <div>
      <div className={styles.comments_container}>
        <div className={styles.comment_list}>
          {comments.length > 0 &&
            comments.map((comment, idx) => (
              <Comment
                actions={actions}
                author={
                  <>
                    {comment.author}
                    {comment.author === authorName ? (
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
                avatar={comment.avatar ?? ProfilePic}
                content={comment.content}
                datetime={
                  <>
                    <Tooltip
                      title={moment(comment.datetime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    >
                      {moment(comment.datetime).fromNow()}
                    </Tooltip>
                  </>
                }
              >
                {comment.replies &&
                  comment.replies.length > 0 &&
                  comment.replies.map((reply, idx) => (
                    <Comment
                      actions={actions}
                      author={
                        <>
                          {reply.author}
                          {reply.author === authorName ? (
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
                      avatar={reply.avatar ?? ProfilePic}
                      content={reply.content}
                      datetime={
                        <>
                          <Tooltip
                            title={moment(reply.datetime).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          >
                            {moment(reply.datetime).fromNow()}
                          </Tooltip>
                        </>
                      }
                    />
                  ))}
              </Comment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;

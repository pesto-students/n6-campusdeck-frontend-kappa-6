import { Comment, Tooltip, List } from "antd";
import moment from "moment";

import { ProfilePic } from "../..";
import { Button } from "@cd/components";

// styles
import styles from "./comments.module.scss";

const Comments = ({ comments, authorName }) => {
  console.log(comments);
  return (
    <div>
      <div className={styles.comments_container}>
        <div className={styles.comment_list}>
          {comments.length > 0 &&
            comments.map((comment, idx) => (
              <Comment
                actions={[<span key='comment-list-reply-to-0'>Reply</span>]}
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

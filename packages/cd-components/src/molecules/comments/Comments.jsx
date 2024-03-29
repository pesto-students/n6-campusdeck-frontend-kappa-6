import { useState, useEffect } from "react";
import { Comment, Tooltip, List, Modal, Button as AntButton } from "antd";
import moment from "moment";

import {
  Button,
  BUTTON_SIZE,
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentEditor
} from "@cd/components";

import { ProfilePic } from "../..";

// styles
import styles from "./comments.module.scss";

const Comments = ({
  comments,
  totalComments,
  authorName,
  handleCommentSave
}) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  // opens the comment modal
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    let commentObj = {
      content: newComment,
      createdAt: new Date()
    };
    handleCommentSave(commentObj);

    // the below line will be replaced by dispatching an action to save the comment
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // closes the comment modal
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = e => {
    const value = e.target.value;
    setNewComment(value);
  };

  // dispatch action to like a comment
  const likeComment = () => {};
  // dispatch action to dislike a comment
  const dislikeComment = () => {};
  // this function will return a boolean based on whether the current logged in user has liked a comment
  const hasUserLiked = () => {
    return false;
  };

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

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
    <span key='comment-basic-reply-to' onClick={showModal}>
      Reply
    </span>
  ];

  return (
    <div className={styles.container}>
      <List
        className='comment-list'
        header={
          <div>
            {`Comments (${totalComments})`}
            <Button
              className={styles.comment_btn}
              size={BUTTON_SIZE.SMALL}
              onClick={showModal}
            >
              New Comment
            </Button>
          </div>
        }
        itemLayout='horizontal'
        dataSource={allComments}
        renderItem={comment => (
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
            avatar={comment.authorImg ? comment.authorImg : ProfilePic}
            content={comment.content}
            datetime={
              <>
                <Tooltip
                  title={moment(comment.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  {moment(comment.createdAt).fromNow()}
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
        )}
      />
      <Modal
        title='Add new comment'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered
        footer={[
          <AntButton
            key='cancel'
            onClick={handleCancel}
            style={{
              borderRadius: "5px",
              border: "0.55px solid rgb(61, 110, 240)",
              fontWeight: "bold",
              color: "rgb(61, 110, 240)"
            }}
          >
            Cancel
          </AntButton>,
          <AntButton
            key='create'
            type='primary'
            loading={confirmLoading}
            onClick={handleOk}
            style={{
              borderRadius: "5px",
              backgroundColor: "rgb(61, 110, 240)",
              border: "none",
              fontWeight: "bold"
            }}
          >
            Save
          </AntButton>
        ]}
      >
        <CommentEditor
          onChange={handleChange}
          onSubmit={handleOk}
          submitting={confirmLoading}
          value={newComment}
        />
      </Modal>
    </div>
  );
};

export default Comments;

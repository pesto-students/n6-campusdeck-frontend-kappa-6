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

const Comments = ({ commentIds, totalComments, authorName }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // opens the comment modal
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

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

  // handles addition of new comment
  const handleSubmit = () => {
    if (!newComment) {
      return;
    }

    setConfirmLoading(true);

    setTimeout(() => {
      setConfirmLoading(false);
      setNewComment("");

      // dispatch action to save new comment
      // setComments([
      //   ...comments,
      //   {
      //     author: JSON.parse(localStorage.getItem(user)).name,
      //     avatar: JSON.parse(localStorage.getItem(user)).profile,
      //     content: <p>{newComment}</p>,
      //     datetime: moment().fromNow()
      //   }
      // ]);
    }, 1000);
  };

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
    <span key='comment-basic-reply-to' onClick={showModal}>
      Reply
    </span>
  ];

  // this logic might be moved to post component for faster loads
  useEffect(() => {
    commentIds.length > 0 &&
      commentIds.map(commentId => {
        // dispatch and action to get the comment from the id,
        // save the comment info to 'comments' state
      });
  }, []);

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
        dataSource={comments}
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
            avatar={comment.authorImg ?? ProfilePic}
            content={comment.content}
            datetime={
              <>
                <Tooltip
                  title={moment(comment.datetime).format("YYYY-MM-DD HH:mm:ss")}
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
          onSubmit={handleSubmit}
          submitting={confirmLoading}
          value={newComment}
        />
      </Modal>
    </div>
  );
};

export default Comments;

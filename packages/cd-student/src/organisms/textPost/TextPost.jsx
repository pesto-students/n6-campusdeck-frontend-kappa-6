import { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Tag } from "antd";

import { InfoCircleFilled } from "@cd/components";
import QuillEditor from "../quillEditor/QuillEditor";
import { POST_TITLE_LIMIT } from "../../constants/post";
import TitleInput from "../titleInput/TitleInput";

// styles
import styles from "./textPost.module.scss";

const { CheckableTag } = Tag;

const TextPost = ({
  postData,
  setPostData,
  space,
  removeTag,
  handleTagSelect
}) => {
  // const validatePost = (val, field) => {
  //   switch (field) {
  //     case "title":
  //       if (val.length > POST_TITLE_LIMIT) return false;
  //       break;
  //     case "body":
  //       break;
  //     case "image":
  //       break;
  //     case "video":
  //       break;
  //     default:
  //     // do nothing
  //   }
  //   return true;
  // };

  // const handleInput = e => {
  //   const val = e.target.value;
  //   const field = e.target.name;

  //   const isValid = validatePost(val, field);

  //   if (isValid) {
  //     setPostData({
  //       ...postData,
  //       [field]: val
  //     });
  //   }
  // };

  return (
    <div className={styles.container}>
      <TitleInput postData={postData} setPostData={setPostData} />
      <div className={styles.body}>
        <QuillEditor
          className={styles.body_editor}
          postData={postData}
          setPostData={setPostData}
        />
      </div>

      <div className={styles.post_labels}>
        <div className={styles.tag_title}>Select a tag:</div>
        {space &&
          space.tags &&
          space.tags.map(tag => (
            <CheckableTag
              className={styles.label}
              key={tag}
              checked={tag === postData.tag}
              onChange={checked => handleTagSelect(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
      </div>
      <div className={styles.options}>
        <label htmlFor='accessibility'>
          <input type='checkbox' id='accessibility' />
          <span style={{ marginLeft: "0.5rem" }}>Make this a public post?</span>
        </label>
        <Tooltip
          title='Selecting this option will make this post visible to anyone who accesses the space.'
          placement='right'
          key='geekblue'
        >
          <InfoCircleFilled style={{ marginLeft: "0.5rem" }} />
        </Tooltip>
      </div>
    </div>
  );
};

TextPost.propTypes = {
  postData: PropTypes.object.isRequired,
  setPostData: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
  handleTagSelect: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired
};

export default TextPost;

import PropTypes from "prop-types";
import { Tooltip, Tag } from "antd";

import { InfoCircleFilled } from "@cd/components";
import TitleInput from "../titleInput";

// styles
import styles from "./mediaPost.module.scss";

const { CheckableTag } = Tag;

const MediaPost = ({
  postData,
  setPostData,
  space,
  removeTag,
  handleTagSelect
}) => {
  return (
    <div className={styles.container}>
      <TitleInput postData={postData} setPostData={setPostData} />
      <div className={styles.body}>Body</div>

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

MediaPost.propTypes = {
  postData: PropTypes.object.isRequired,
  setPostData: PropTypes.func.isRequired,
  space: PropTypes.object.isRequired,
  handleTagSelect: PropTypes.func.isRequired,
  removeTag: PropTypes.func.isRequired
};

export default MediaPost;

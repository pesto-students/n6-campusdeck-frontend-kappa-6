import { useEffect } from "react";
import PropTypes from "prop-types";
import { Tooltip, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { InfoCircleFilled } from "@cd/components";
import QuillEditor from "../quillEditor/QuillEditor";
import TitleInput from "../titleInput/TitleInput";
import { getSpace } from "../../actions/space";

// styles
import styles from "./textPost.module.scss";

const { CheckableTag } = Tag;

const TextPost = ({ postData, setPostData, handleTagSelect }) => {
  const dispatch = useDispatch();
  const { space } = useSelector(state => state.space);

  // fetch new space details when the space changes
  useEffect(() => {
    dispatch(getSpace(postData.space));
  }, [postData.space]);

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
          space.tags?.length > 0 &&
          space.tags?.map(tag => (
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
          <input
            type='checkbox'
            id='accessibility'
            checked={postData.isPublic}
            onChange={() => {
              setPostData({ ...postData, isPublic: !postData.isPublic });
            }}
          />
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
  handleTagSelect: PropTypes.func.isRequired
};

export default TextPost;

import { useState } from "react";
import PropTypes from "prop-types";
import { POST_TITLE_LIMIT } from "../../constants/post";

// style
import styles from "./titleInput.module.scss";

const TitleInput = ({ postData, setPostData }) => {
  const [remainingChars, setRemainingChars] = useState(POST_TITLE_LIMIT);

  const handleInput = e => {
    const val = e.target.value;
    const valueLen = val.length;

    setRemainingChars(POST_TITLE_LIMIT - valueLen);

    setPostData({
      ...postData,
      title: val
    });
  };

  return (
    <div className={styles.title_section}>
      <input
        className={styles.title_input}
        placeholder='Title'
        autoComplete='off'
        value={postData.title}
        name='title'
        onChange={handleInput}
      />
      <div className={styles.remaining_chars}>
        {remainingChars}/{POST_TITLE_LIMIT}
      </div>
    </div>
  );
};

TitleInput.propTypes = {
  postData: PropTypes.object.isRequired,
  setPostData: PropTypes.func.isRequired
};

export default TitleInput;

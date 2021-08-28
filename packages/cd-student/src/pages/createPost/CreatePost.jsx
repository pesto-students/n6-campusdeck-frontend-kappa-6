import { useState } from "react";
import { Tooltip } from "antd";

import { Button, TabMenu, InfoCircleFilled, BUTTON_SIZE } from "@cd/components";
import { POST_TITLE_LIMIT } from "../../constants/post";
import QuillEditor from "../../organisms/QuillEditor";

// styles
import styles from "./createPost.module.scss";

const CreatePost = () => {
  const [remainingChars, setRemainingChars] = useState(POST_TITLE_LIMIT);
  const [postData, setPostData] = useState({
    title: "",
    body: "Start typing..."
  });

  const validatePost = (val, field) => {
    switch (field) {
      case "title":
        if (val.length > POST_TITLE_LIMIT) return false;
        break;
      case "body":
        break;
      case "image":
        break;
      case "video":
        break;
      default:
      // do nothing
    }
    return true;
  };

  const handleInput = e => {
    const val = e.target.value;
    const field = e.target.name;

    const isValid = validatePost(val, field);

    if (isValid) {
      setPostData({
        ...postData,
        [field]: val
      });
    }

    if (field === "title" && isValid) {
      const valueLen = val.length;
      setRemainingChars(POST_TITLE_LIMIT - valueLen);
    }
  };

  const submit = () => {};

  const TextComponent = (
    <>
      <div className={styles.title_section}>
        <input
          className={styles.title_input}
          placeholder='Title'
          autoComplete='off'
          value={postData.title}
          name='title'
          onChange={handleInput}
          onBlur={submit}
        />
        <div className={styles.remaining_chars}>
          {remainingChars}/{POST_TITLE_LIMIT}
        </div>
      </div>
      <div className={styles.body}>
        <QuillEditor
          className={styles.body_editor}
          postData={postData}
          setPostData={setPostData}
        />
      </div>

      <div className={styles.post_labels}>
        <Button
          className={styles.label}
          text='Info'
          size={BUTTON_SIZE.MEDIUM}
        />
        <Button
          className={styles.label}
          text='React'
          size={BUTTON_SIZE.MEDIUM}
        />
        <Button
          className={styles.label}
          text='Urgent'
          size={BUTTON_SIZE.MEDIUM}
        />
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
          <InfoCircleFilled style={{ marginLeft: "0.3rem" }} />
        </Tooltip>
      </div>
    </>
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select className={styles.selector}>
          <option>Choose a space</option>
          <option>Fests</option>
          <option>Random</option>
          <option>React</option>
        </select>
        <select className={styles.selector}>
          <option>Choose a campus</option>
          <option>VIT, Vellore</option>
          <option>XIME, Bangalore</option>
          <option>IIIT Hyderabad</option>
        </select>
      </div>
      <div className={styles.content}>
        <TabMenu
          tabs={[
            {
              label: "Text",
              disabled: false,
              content: TextComponent
            },
            {
              label: "Media",
              disabled: false,
              content: <div>Media</div>
            },
            {
              label: "Poll",
              disabled: true
            },
            {
              label: "Announcement",
              disabled: true
            }
          ]}
          centered={true}
        />
      </div>
    </div>
  );
};

export default CreatePost;

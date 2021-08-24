import { useState } from "react";

import { Button, TabMenu } from "@cd/components";
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
        {
          if (val.length > POST_TITLE_LIMIT) return false;
        }
        break;
      case "body":
        {
        }
        break;
      case "image":
        {
        }
        break;
      case "video":
        {
        }
        break;
      default: {
        // do nothing
      }
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

  const submit = () => {
    console.log(postData);
  };

  const TextComponent = (
    <div>
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
      <Button className={styles.create_btn} text='Create' />
    </div>
  );
  return (
    <div className={styles.container}>
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
            content: TextComponent
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
  );
};

export default CreatePost;

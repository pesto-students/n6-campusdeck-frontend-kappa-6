import { useState, useEffect } from "react";

import { TabMenu } from "@cd/components";
import TextPost from "../textPost/TextPost";

// styles
import styles from "./createPost.module.scss";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "Start typing...",
    tag: ""
  });
  const [space, setSpace] = useState({
    name: "Random",
    tags: ["Info", "Urgent", "Advice", "Question"]
  });

  const submit = () => {
    console.log(postData);
  };

  // this function will remove the tag associated to the post
  const removeTag = () => {
    console.log("tag removed");
  };

  // this function is called when a tag is selected to associate the tag to the post
  const handleTagSelect = (tag, checked) => {
    setPostData({
      ...postData,
      tag
    });
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select className={styles.selector}>
          <option>Choose a campus</option>
          <option>VIT, Vellore</option>
          <option>XIME, Bangalore</option>
          <option>IIIT Hyderabad</option>
        </select>
        <select className={styles.selector}>
          <option>Choose a space</option>
          <option>Fests</option>
          <option>Random</option>
          <option>React</option>
        </select>
      </div>
      <div className={styles.content}>
        <TabMenu
          tabs={[
            {
              label: "Text",
              disabled: false,
              content: (
                <TextPost
                  postData={postData}
                  setPostData={setPostData}
                  space={space}
                  removeTag={removeTag}
                  handleTagSelect={handleTagSelect}
                />
              )
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

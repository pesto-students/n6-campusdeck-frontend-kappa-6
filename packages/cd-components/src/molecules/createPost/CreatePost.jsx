import { useState } from "react";
import TabMenu from "../tabMenu/TabMenu";
import Input from "../../atoms/input/Input";

// styles
import styles from "./createPost.module.scss";

const CreatePost = () => {
  const [remainingChars, setRemainingChars] = useState(300);
  const [title, setTitle] = useState("");

  const TextComponent = (
    <div>
      <Input placeholder='Title' />
      <div>{remainingChars}/300</div>
    </div>
  );
  return (
    <div className={styles.container}>
      <TabMenu
        tabs={[
          {
            label: "Text",
            disabled: false,
            component: TextComponent
          },
          {
            label: "Media",
            disabled: false
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

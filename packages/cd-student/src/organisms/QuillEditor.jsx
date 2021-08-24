import { useEffect, useRef, useState } from "react";
import Quill from "quill";

// styles
import styles from "./quillEditor.module.scss";

// editor theme
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ direction: "rtl" }], // text direction

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["image", "blockquote", "code-block"],
  ["clean"] // remove formatting button
];

const QuillEditor = ({ postData, setPostData }) => {
  const [quill, setQuill] = useState(null);
  const wrapper = useRef();

  useEffect(() => {
    // creates an editor container for placing the quil editor inside including the toolbar
    const editor = document.createElement("div");
    wrapper.current.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions
      }
    });

    // editor placeholder text
    q.setText(postData.body);

    // set quill instance to the local state
    setQuill(q);

    // before unmount
    return () => {
      // remove the quill editor
      wrapper.current.innerHTML = "";
    };
  }, []);

  return <div className={styles} ref={wrapper}></div>;
};

export default QuillEditor;

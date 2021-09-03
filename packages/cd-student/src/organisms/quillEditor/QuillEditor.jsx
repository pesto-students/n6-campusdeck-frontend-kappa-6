import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Quill from "quill";

// styles
import styles from "./quillEditor.module.scss";

// editor theme
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],

  ["blockquote", "code-block"]
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
      },
      placeholder: "Start typing..."
    });

    // editor placeholder text
    q.setText(postData.body);

    // set quill instance to the local state
    setQuill(q);
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const bodyText = quill.getText();
        // remove all newline characters
        bodyText.replace(/\n/, "");
        setPostData({ ...postData, body: bodyText });
      });
    }
  }, [quill]);

  return <div className={styles.container} ref={wrapper} />;
};

QuillEditor.propTypes = {
  postData: PropTypes.object,
  setPostData: PropTypes.func
};

QuillEditor.defaultProps = {
  postData: {},
  setPostData: () => {}
};

export default QuillEditor;

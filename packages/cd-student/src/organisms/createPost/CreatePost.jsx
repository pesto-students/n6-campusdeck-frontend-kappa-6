import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { TabMenu } from "@cd/components";
import TextPost from "../textPost";
import MediaPost from "../mediaPost";
import { fetchAllCampus } from "../../actions/campus";
import { getAllSpacesByCampus } from "../../actions/space";

// styles
import styles from "./createPost.module.scss";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    body: "Start typing...",
    tag: "",
    space: ""
  });
  const [selectedCampus, setSelectedCampus] = useState("");
  // fetch list of campus from the global store
  const { campus } = useSelector(state => state.campus);
  const { spaces } = useSelector(state => state.space);
  const dispatch = useDispatch();

  const submit = () => {};

  // this function will remove the tag associated to the post
  const removeTag = () => {
    console.log("tag removed");
  };

  // this function is called when a tag is selected to associate the tag to the post
  const handleTagSelect = tag => {
    setPostData({
      ...postData,
      tag
    });
  };

  useEffect(() => {
    // fetch all the campus
    dispatch(fetchAllCampus());
  }, []);

  // once the user has selected a campus, show them the list of spaces
  useEffect(() => {
    dispatch(getAllSpacesByCampus(selectedCampus));
  }, [selectedCampus]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <select
          onChange={e => setSelectedCampus(e.target.value)}
          className={styles.selector}
        >
          <option value=''>Choose a campus</option>
          {campus.length > 0 &&
            campus.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <select
          className={styles.selector}
          disabled={!selectedCampus}
          onChange={e => setPostData({ ...postData, space: e.target.value })}
        >
          <option value=''>Choose a space</option>
          {spaces.length > 0 &&
            spaces.map(space => (
              <option key={space._id} value={space._id}>
                {space.name}
              </option>
            ))}
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
                  removeTag={removeTag}
                  handleTagSelect={handleTagSelect}
                />
              )
            },
            {
              label: "Media",
              disabled: false,
              content: (
                <MediaPost
                  postData={postData}
                  setPostData={setPostData}
                  space={postData.space}
                  removeTag={removeTag}
                  handleTagSelect={handleTagSelect}
                />
              )
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

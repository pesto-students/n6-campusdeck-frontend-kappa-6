import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextMenu } from "@cd/components";
import Post from "../../organisms/post/Post";

// styles
import styles from "./home.module.scss";
import { getHomeFeed } from "../../actions/post";

const Home = () => {
  const userId = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  const updatePosts = ({ key }) => {};

  useEffect(() => {
    dispatch(getHomeFeed());
  }, []);

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [userId]);

  return (
    <>
      <div className={styles.main_section}>
        <ContextMenu
          items={["Following", "Popularity", "New"]}
          handler={updatePosts}
        >
          <span className={styles.sort_option}>Sort by: </span>
        </ContextMenu>
        <div className={styles.post_container}>
          {posts.length > 0 &&
            posts.map(post => (
              <div key={post._id} className={styles.post}>
                <Post
                  id={post._id}
                  title={post.title}
                  tag={post.tag}
                  type={post.type}
                  points={post.points}
                  content={post.body}
                  time={post.createdAt}
                  totalComments={post.comments?.length}
                  creator={post.creator}
                  spaceId={post.space}
                  comments={post.comments}
                  campusId={post.campus}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextMenu, Post } from "@cd/components";

// styles
import styles from "./home.module.scss";
import { getHomeFeed } from "../../actions/post";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  const updatePosts = ({ key }) => {};

  useEffect(() => {
    dispatch(getHomeFeed());
  }, []);

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
              <div key={post.id} className={styles.post}>
                <Post
                  title={post.title}
                  tag={post.tag}
                  type={post.type}
                  points={post.points}
                  content={post.body}
                  time={post.cretedAt}
                  totalComments={post.comments.length}
                  creator={post.creator}
                  space={post.space}
                  comments={post.comments}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

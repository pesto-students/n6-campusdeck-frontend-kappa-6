import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";

import { ContextMenu } from "@cd/components";
import Post from "../../organisms/post/Post";
import { getHomeFeed } from "../../actions/post";

// styles
import styles from "./home.module.scss";

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

        <div style={{ width: "42rem" }}>
          <Skeleton loading={!posts.length} active />
          <Skeleton loading={!posts.length} active />
          <Skeleton loading={!posts.length} active />
          <Skeleton loading={!posts.length} active />
        </div>
        <Skeleton loading={!posts.length} active>
          <div className={styles.post_container}>
            {posts.map(post => (
              <div key={post._id} className={styles.post}>
                <Post
                  id={post._id}
                  title={post.title}
                  tag={post.tag}
                  type={post.type}
                  likes={post?.likes}
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
        </Skeleton>
      </div>
    </>
  );
};

export default Home;

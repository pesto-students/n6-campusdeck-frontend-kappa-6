import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

import { ContextMenu } from "@cd/components";
import Post from "../../organisms/post/Post";
import { getSpaceFeed } from "../../actions/post";

// styles
import styles from "./space.module.scss";

const Space = () => {
  const { posts } = useSelector(state => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpaceFeed(id));
  }, []);

  return (
    <div className={styles.container}>
      <ContextMenu items={["Following", "Popularity", "New"]}>
        <span className={styles.sort_option}>Sort by: </span>
      </ContextMenu>
      <Skeleton loading={!posts.length} active />
      <Skeleton loading={!posts.length} active />
      <Skeleton loading={!posts.length} active />
      <Skeleton loading={!posts.length} active>
        {posts.map(post => (
          <div className={styles.post_container}>
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
          </div>
        ))}
      </Skeleton>
    </div>
  );
};

export default Space;

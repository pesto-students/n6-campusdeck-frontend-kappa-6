import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../organisms/profileCard/ProfileCard";
import * as api from "../../api";

// styles
import styles from "./userProfile.module.scss";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { id } = useParams();

  const fetchPostsByUser = async userId => {
    const {
      data: { data: postsByUser }
    } = await api.getPostsByUser(userId);

    setPosts(postsByUser);
  };

  useEffect(() => {
    if (id) {
      fetchPostsByUser(id);
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <ProfileCard
        postList={posts}
        isLoggedInUser={loggedInUser?.result?._id === id}
        userId={id}
      />
    </div>
  );
};

export default UserProfile;

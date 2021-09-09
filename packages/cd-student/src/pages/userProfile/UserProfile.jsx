import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../organisms/profileCard/ProfileCard";
import * as api from "../../api";

// styles
import styles from "./userProfile.module.scss";

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const [savedItems] = useState([
    {
      title: "Lorem ipsum dolor sit amet?",
      tag: "Question",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      createdAt: "2 days ago",
      creator: "Pushpak Bhattacharya",
      size: "compact"
    }
  ]);
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
        savedList={savedItems}
        isLoggedInUser={loggedInUser?.result?._id === id}
        userId={id}
      />
    </div>
  );
};

export default UserProfile;

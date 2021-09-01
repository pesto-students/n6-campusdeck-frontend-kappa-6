import { useState } from "react";
import { ProfileCard } from "@cd/components";

// styles
import styles from "./userProfile.module.scss";

const UserProfile = () => {
  const [posts] = useState([
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact"
    }
  ]);
  const [comments] = useState([]);
  const [savedItems] = useState([
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact"
    }
  ]);
  return (
    <div className={styles.container}>
      <ProfileCard
        postList={posts}
        commentList={comments}
        savedList={savedItems}
      />
    </div>
  );
};

export default UserProfile;

// styles
import styles from "./spaceStats.module.css";

import { useState } from "react";

const SpaceStats = ({ numOfPosts, followers, numOfUsers }) => {
  return (
    <div className={styles.container}>
      <div className={styles.stat}>
        <div className={styles.num}>{numOfPosts}</div>
        <div className={styles.label}>Posts</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.num}>{followers}</div>
        <div className={styles.label}>Followers</div>
      </div>
      <div className={styles.stat}>
        <div className={styles.num}>{numOfUsers}</div>
        <div className={styles.label}>Users</div>
      </div>
    </div>
  );
};

export default SpaceStats;

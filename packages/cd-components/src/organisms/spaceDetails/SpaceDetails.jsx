import PropTypes from "prop-types";

import Button from "../../atoms/button/Button";
import SpaceStats from "../../atoms/spaceStats/SpaceStats";
import { ProfilePic } from "../..";

// styles
import styles from "./spaceDetails.module.css";

const SpaceDetails = ({
  name,
  desc,
  numOfPosts,
  followers,
  numOfUsers,
  creatorName,
  creatorPic,
  createdAt
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card_header}>
        <span className={styles.name}>{name}</span>
        <Button size='small' text='+ Follow' />
      </div>
      <div className={styles.space_desc}>{desc}</div>
      <SpaceStats
        numOfPosts={numOfPosts}
        followers={followers}
        numOfUsers={numOfUsers}
      />
      <div className={styles.card_footer}>
        <img
          className={styles.creator_img}
          src={creatorPic}
          alt={creatorName}
        />
        <div className={styles.credit}>
          Created by <span style={{ color: "blue" }}>{creatorName}</span>
        </div>
        <div className={styles.time}>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

SpaceDetails.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  numOfPosts: PropTypes.number,
  followers: PropTypes.number,
  numOfUsers: PropTypes.number,
  creatorName: PropTypes.string.isRequired,
  creatorPic: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

SpaceDetails.defaultProps = {
  desc: undefined,
  numOfPosts: 0,
  followers: 0,
  numOfUsers: 0,
  creatorPic: ProfilePic
};

export default SpaceDetails;

import PropTypes from "prop-types";

import Button from "../../atoms/button/Button";
import SpaceStats from "../../atoms/spaceStats/SpaceStats";
import AuthorDetails from "../../atoms/authorDetails/AuthorDetails";

// styles
import styles from "./spaceDetails.module.css";

const SpaceDetails = ({
  name,
  desc,
  numOfPosts,
  followers,
  numOfUsers,
  creator,
  createdAt
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card_header}>
        <span className={styles.name}>{name}</span>
        <Button type='label' text='+ Follow' />
      </div>
      <div className={styles.space_desc}>{desc}</div>
      <SpaceStats
        numOfPosts={numOfPosts}
        followers={followers}
        numOfUsers={numOfUsers}
      />
      <AuthorDetails />
    </div>
  );
};

SpaceDetails.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string,
  numOfPosts: PropTypes.number,
  followers: PropTypes.number,
  numOfUsers: PropTypes.number,
  creator: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

SpaceDetails.defaultProps = {
  desc: undefined,
  numOfPosts: 0,
  followers: 0,
  numOfUsers: 0
};

export default SpaceDetails;

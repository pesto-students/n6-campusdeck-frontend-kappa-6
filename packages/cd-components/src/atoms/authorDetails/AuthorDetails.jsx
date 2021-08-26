import PropTypes from "prop-types";
import { ProfilePic } from "../..";

// styles
import styles from "./authorDetails.module.scss";

const AuthorDetails = ({ authorName, authorPic }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={authorPic} alt={authorName} />
      <div className={styles.credit}>
        Created by <span style={{ color: "blue" }}>{authorName}</span>
      </div>
    </div>
  );
};

AuthorDetails.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorPic: PropTypes.string
};

AuthorDetails.defaultProps = {
  authorPic: ProfilePic
};

export default AuthorDetails;

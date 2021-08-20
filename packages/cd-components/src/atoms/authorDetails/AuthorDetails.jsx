import PropTypes from "prop-types";
import { ProfilePic } from "../..";

//styles
import styles from "./authorDetails.module.css";

const AuthorDetails = ({ authorName, authorPic }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={authorPic} />
      <div className={styles.credit}>
        Posted by <span style={{ color: "blue" }}>{authorName}</span>
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

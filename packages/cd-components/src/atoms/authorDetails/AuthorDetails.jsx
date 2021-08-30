import PropTypes from "prop-types";
import { Avatar, Tooltip } from "antd";
import { ProfilePic } from "../..";

// styles
import styles from "./authorDetails.module.scss";

const AuthorDetails = ({ authorName, authorPic }) => {
  return (
    <div className={styles.container}>
      <Avatar className={styles.img} src={authorPic} alt={authorName} />
      <div className={styles.credit}>
        Created by{" "}
        <span style={{ color: "blue" }}>
          <Tooltip title={authorName}>{authorName}</Tooltip>
        </span>
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

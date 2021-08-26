import PropTypes from "prop-types";

// styles
import styles from "./userinfo.module.scss";

// default profile picture
import DefaultProfilePic from "./assets/defaultProfile.jpg";

const UserInfo = ({ profileImg, userName }) => {
  return (
    <div className={styles.container}>
      <img className={styles.profile_img} src={profileImg} alt={userName} />
      <span className={styles.user_name}>{userName}</span>
    </div>
  );
};

UserInfo.propTypes = {
  profileImg: PropTypes.string,
  userName: PropTypes.string.isRequired
};

UserInfo.defaultProps = {
  profileImg: DefaultProfilePic
};

export default UserInfo;

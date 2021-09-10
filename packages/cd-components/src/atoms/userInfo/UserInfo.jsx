import PropTypes from "prop-types";
import { Avatar } from "antd";
// styles
import styles from "./userinfo.module.scss";

// default profile picture
import DefaultProfilePic from "./assets/defaultProfile.jpg";

const UserInfo = ({ profileImg, userName }) => {
  return (
    <div className={styles.container}>
      <Avatar
        size={30}
        src={profileImg === "" ? DefaultProfilePic : profileImg}
        className={styles.profile_img}
      />
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

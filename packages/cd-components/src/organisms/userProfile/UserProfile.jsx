import cx from "classnames";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  ArrowLeftOutlined,
  EditFilled,
  MapPin,
  Users as UsersIcon
} from "../../atoms/icon";
import TabMenu from "../../molecules/tabMenu/TabMenu";
import Post from "../../organisms/post/Post";

// style
import styles from "./userProfile.module.scss";
import { completion } from "yargs";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <ArrowLeftOutlined className={cx(styles.icon, styles.back_icon)} />
      <EditFilled className={cx(styles.icon, styles.edit_icon)} />

      <div className={styles.user}>
        {/* ant design avatar would be replaced later by cloudinary's component */}
        <Avatar size={128} icon={<UserOutlined />} className={styles.avatar} />
        <div className={styles.user_info}>
          <span className={styles.user_name}>Jane Doe</span>
          <span className={styles.user_campus}>
            Vellore Institute of Technology
          </span>
          <div className={styles.user_stats}>
            <span className={styles.stat}>
              <MapPin className={styles.big_icon} />
              Bangalore, India
            </span>
            <span className={styles.stat}>
              <UsersIcon className={styles.big_icon} />
              250 Followers
            </span>
          </div>
        </div>
      </div>

      <div className={styles.user_content}></div>
    </div>
  );
};

export default UserProfile;

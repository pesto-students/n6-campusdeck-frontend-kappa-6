import cx from "classnames";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

// import {
//   ArrowLeftOutlined,
//   EditFilled,
//   MapPin,
//   Users as UsersIcon
// } from "../../atoms/icon";
// import TabMenu from "../../molecules/tabMenu/TabMenu";
// import Button from "../../atoms/button/Button";
import Post from "../post/Post";
import {
  BUTTON_TYPE,
  ArrowLeftOutlined,
  EditFilled,
  MapPin,
  Users as UsersIcon,
  TabMenu,
  Button
} from "@cd/components";

// style
import styles from "./profileCard.module.scss";

const ProfileCard = ({ postList, commentList, savedList }) => {
  // this function will fetch posts/comments/saved of user based on the key
  const fetchContents = key => {
    console.log(key);
  };

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
          <div className={styles.action_btns}>
            <Button className={styles.msg_btn} type={BUTTON_TYPE.REGULAR}>
              Send message
            </Button>
            <Button className={styles.follow_btn} type={BUTTON_TYPE.SKELETON}>
              Follow
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.user_content}>
        <TabMenu
          tabs={[
            {
              label: "Posts",
              disabled: false,
              content: (
                <div style={{ marginLeft: "-1.5rem" }}>
                  {postList.length > 0 &&
                    postList.map(post => (
                      <Post
                        title={post.title}
                        label={post.label}
                        rawContent={post.rawContent}
                        points={post.points}
                        time={post.time}
                        totalComments={post.totalComments}
                        authorName={post.authorName}
                        size='compact'
                      />
                    ))}
                </div>
              )
            },
            {
              label: "Saved",
              disabled: false,
              content: (
                <div style={{ marginLeft: "-1.5rem" }}>
                  {savedList.length > 0 &&
                    savedList.map(post => (
                      <Post
                        title={post.title}
                        label={post.label}
                        rawContent={post.rawContent}
                        points={post.points}
                        time={post.time}
                        totalComments={post.totalComments}
                        authorName={post.authorName}
                        size='compact'
                      />
                    ))}
                </div>
              )
            }
          ]}
          callback={fetchContents}
          extraContent={{
            enabled: true,
            text: "Sort by: ",
            menuItems: ["Following", "Popular", "New"],
            handler: ({ key }) => console.log("Handler called", key)
          }}
        />
      </div>
    </div>
  );
};

export default ProfileCard;

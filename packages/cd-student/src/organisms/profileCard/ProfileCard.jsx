import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";
import { Avatar, message } from "antd";
import {
  BUTTON_TYPE,
  ArrowLeftOutlined,
  EditFilled,
  MapPin,
  Users as UsersIcon,
  TabMenu,
  Button,
  ProfilePic,
  PlusOutlined,
  CheckOutlined
} from "@cd/components";

import Post from "../post/Post";
import * as api from "../../api/index";

// style
import styles from "./profileCard.module.scss";

const ProfileCard = ({ postList, isLoggedInUser, userId }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    campus: "",
    location: "",
    profileImg: "",
    followers: []
  });
  const [savedPostList, setSavedPostList] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  // this function will fetch posts/saved of user based on the key
  const fetchContents = key => {
    console.log(key);
  };

  const fetchUserDetails = async id => {
    const {
      data: { data: user }
    } = await api.getUser(id);

    setUserDetails({
      name: user.name,
      campus: user.campus,
      location: user.location,
      profileImg: user.profileImg,
      followers: user.followers
    });

    if (isLoggedInUser) {
      setSavedPostIds(user.savedPosts);
    }
  };

  const fetchPostDetails = async savedPost => {
    const {
      data: { data: post }
    } = await api.getPostById(savedPost);

    setSavedPostList([...savedPostList, post]);
  };

  useEffect(() => {
    if (savedPostIds) {
      savedPostIds.forEach(savedPost => {
        fetchPostDetails(savedPost);
      });
    }
  }, [savedPostIds]);

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);

  // tabs to display
  const tabMenuOpts = [
    {
      label: "Posts",
      disabled: false,
      content: (
        <div style={{ marginLeft: "-1.5rem" }}>
          {postList.length > 0 &&
            postList.map(post => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                tag={post.tag}
                type={post.type}
                likes={post?.likes}
                content={post.body}
                time={post.createdAt}
                totalComments={post.comments?.length}
                creator={post.creator}
                spaceId={post.space}
                comments={post.comments}
                campusId={post.campus}
                size='compact'
              />
            ))}
        </div>
      )
    }
  ];

  // only show the saved posts tab if we are on the profile of logged in user
  if (isLoggedInUser) {
    tabMenuOpts.push({
      label: "Saved",
      disabled: false,
      content: (
        <div style={{ marginLeft: "-1.5rem" }}>
          {savedPostList?.length > 0 &&
            savedPostList?.map(post => (
              <Post
                key={post._id}
                id={post._id}
                title={post.title}
                tag={post.tag}
                type={post.type}
                likes={post?.likes}
                content={post.body}
                time={post.createdAt}
                totalComments={post.comments?.length}
                creator={post.creator}
                spaceId={post.space}
                comments={post.comments}
                campusId={post.campus}
                size='compact'
              />
            ))}
        </div>
      )
    });
  }

  const followUser = async () => {
    const { data } = await api.followUser(userId);

    if (data.status === "success" && data.operationType === "follow") {
      setUserDetails({
        ...userDetails,
        followers: [...userDetails.followers, loggedInUser?.result?._id]
      });
      message.success(`You are now following ${userDetails.name}!`);
    } else if (data.status === "success" && data.operationType === "unfollow") {
      message.success(`You are no longer following ${userDetails.name}!`);
      const newFollowersList = userDetails.followers.filter(
        followerId => followerId !== loggedInUser?.result?._id
      );
      setUserDetails({
        ...userDetails,
        followers: newFollowersList
      });
    }
  };

  console.log(userDetails);

  const FollowBtn = () => {
    // properties when user is not following this profile
    let btnType = BUTTON_TYPE.SKELETON;
    let btnText = "Follow";
    let icon = <PlusOutlined style={{ marginRight: "0.25rem" }} />;

    // user is follwing this person
    if (userDetails.followers.includes(loggedInUser?.result?._id)) {
      btnType = BUTTON_TYPE.REGULAR;
      btnText = "Following";
      icon = <CheckOutlined style={{ marginRight: "0.25rem" }} />;
    }

    return (
      <Button className={styles.follow_btn} type={btnType} onClick={followUser}>
        {icon}
        {btnText}
      </Button>
    );
  };

  useEffect(() => {
    FollowBtn();
  }, [userDetails.followers]);

  return (
    <div className={styles.container}>
      <ArrowLeftOutlined
        className={cx(styles.icon, styles.back_icon)}
        onClick={() => history.goBack()}
      />
      {isLoggedInUser && (
        <EditFilled className={cx(styles.icon, styles.edit_icon)} />
      )}

      <div className={styles.user}>
        {/* ant design avatar would be replaced later by cloudinary's component */}
        <Avatar size={150} src={ProfilePic} className={styles.avatar} />
        <div className={styles.user_info}>
          <span className={styles.user_name}>{userDetails.name}</span>
          <span className={styles.user_campus}>{userDetails.campus}</span>
          <div className={styles.user_stats}>
            <span className={styles.stat}>
              <MapPin className={styles.big_icon} />
              {userDetails.location}
            </span>
            <span className={styles.stat}>
              <UsersIcon className={styles.big_icon} />
              {userDetails.numFollowers} Followers
            </span>
          </div>
          {!isLoggedInUser && (
            <div className={styles.action_btns}>
              <Button className={styles.msg_btn} type={BUTTON_TYPE.REGULAR}>
                Send message
              </Button>
              {/* <Button className={styles.follow_btn} type={BUTTON_TYPE.SKELETON}>
                Follow
              </Button> */}
              <FollowBtn />
            </div>
          )}
        </div>
      </div>

      <div className={styles.user_content}>
        <TabMenu
          tabs={tabMenuOpts}
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

ProfileCard.propTypes = {
  postList: PropTypes.array.isRequired,
  isLoggedInUser: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired
};

export default ProfileCard;

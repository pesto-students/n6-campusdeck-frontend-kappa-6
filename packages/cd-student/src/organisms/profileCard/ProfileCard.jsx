import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";
import { Avatar, message, Tooltip, Upload, Button as AntdButton } from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

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
  CheckOutlined,
  SaveFilled
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [newProfileImg, setNewProfileImg] = useState();
  const [imgUploading, setImgUploading] = useState(false);
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

    setNewProfileImg(user.profileImg ? user.profileImg : ProfilePic);

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

  const UploadBtn = () => {
    let uploadBtnIcon = <UploadOutlined />;

    if (imgUploading === true) {
      uploadBtnIcon = <LoadingOutlined />;
    }

    return uploadBtnIcon;
  };

  const toggleEditMode = () => {
    setIsEditMode(prevEditMode => !prevEditMode);
  };

  const profileUploadProps = {
    action: "",
    async onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        setImgUploading(true);
      } else if (status !== "removed" && status !== "uploading") {
        const imageData = new FormData();
        imageData.append("file", info.file.originFileObj);
        imageData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        const response = await axios.post(
          process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
          imageData
        );
        if (response.status === 200) {
          setNewProfileImg(response.data.secure_url);
          message.success(`File uploaded successfully.`);
        } else {
          message.error(`File upload failed.`);
        }
        setImgUploading(false);
      }
    },
    multiple: false,
    showUploadList: false
  };

  const saveDetails = async () => {
    const { data } = await api.updateProfileImg({ image: newProfileImg });

    if (data.status === "success") {
      message.success(`Profile updated successfully.`);
      setUserDetails({
        ...userDetails,
        profileImg: data.data?.profileImg
      });
      setIsEditMode(false);
    } else {
      message.error("Something went wrong while updating your profile");
    }
  };

  return (
    <div className={styles.container}>
      <ArrowLeftOutlined
        className={cx(styles.icon, styles.back_icon)}
        onClick={() => history.goBack()}
      />
      {isLoggedInUser && (
        <>
          {isEditMode ? (
            <SaveFilled
              className={cx(styles.icon, styles.edit_icon)}
              onClick={saveDetails}
            />
          ) : (
            <EditFilled
              className={cx(styles.icon, styles.edit_icon)}
              onClick={toggleEditMode}
            />
          )}
        </>
      )}

      <div className={styles.user}>
        {/* ant design avatar would be replaced later by cloudinary's component */}
        {isEditMode ? (
          <Avatar size={150} src={newProfileImg} className={styles.avatar} />
        ) : (
          <Avatar
            size={150}
            src={userDetails.profileImg ? userDetails.profileImg : ProfilePic}
            className={styles.avatar}
          />
        )}

        {isEditMode && (
          <div className={styles.upload_img_btn}>
            <Upload {...profileUploadProps}>
              <AntdButton>
                <UploadBtn />
                Upload
              </AntdButton>
            </Upload>
          </div>
        )}

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
              {userDetails.followers.length} Followers
            </span>
          </div>
          {!isLoggedInUser && (
            <div className={styles.action_btns}>
              <Tooltip title='Coming soon' placement='bottom'>
                <Button className={styles.msg_btn} type={BUTTON_TYPE.REGULAR}>
                  Send message
                </Button>
              </Tooltip>

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

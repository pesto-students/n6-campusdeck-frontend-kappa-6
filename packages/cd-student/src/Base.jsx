import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button as AntButton } from "antd";
import decode from "jwt-decode";
import {
  Button,
  Footer,
  LeftSidebar,
  SuggestionCard,
  Navbar,
  BUTTON_SIZE,
  HomeFilled,
  GlobalOutlined,
  UserOutlined,
  CompassFilled
} from "@cd/components";
import { compactNumber } from "@cd/base";
import CreatePost from "./organisms/createPost";
import CreateSpace from "./organisms/createSpace";
import MySpaces from "./organisms/mySpaces/MySpaces";
import SpaceDetails from "./organisms/spaceDetails";
import { LOGOUT } from "./actions/constants/actionTypes";
import { createSpace } from "./actions/space";
import { createPost } from "./actions/post";
import * as api from "./api/index";

// styles
import styles from "./Base.module.scss";

const Base = ({ children, isSpacePage }) => {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [spaceModalVisible, setSpaceModalVisible] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [createSpaceLoading, setCreateSpaceLoading] = useState(false);
  const [spaceData, setSpaceData] = useState({
    name: "",
    desc: "",
    img: "",
    campus: "",
    tags: [],
    isPublic: true
  });
  const [postData, setPostData] = useState({
    title: "",
    type: "TEXT",
    body: "",
    tag: "",
    space: "",
    campus: "",
    isPublic: true
  });
  const [allTrendingSpaces, setAllTrendingSpaces] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // navigate to given page
  const onClick = destination => {
    history.push(destination);
  };

  const navigateToSpace = id => {
    history.push(`/space/${id}`);
  };

  // function that will execute when a post is created
  const handleSavePost = () => {
    setCreatePostLoading(true);

    dispatch(createPost(postData));

    setPostModalVisible(false);
    setCreatePostLoading(false);
  };

  // function that will execute when a space is created
  const handleSaveSpace = () => {
    setCreateSpaceLoading(true);

    dispatch(createSpace(spaceData));

    // make the below lines async
    setSpaceModalVisible(false);
    setCreateSpaceLoading(false);
  };

  // function to logout the user
  const logout = () => {
    dispatch({
      type: LOGOUT
    });

    // clears the current user
    setUser(() => {
      // redirect user to home page upon logging out
      history.push("/login");

      return null;
    });
  };

  // resets the user (and logs them out, if token is expired) once the location,
  // i.e. the current path in the app
  useEffect(() => {
    const token = user?.token;
    /*
     * decode() function takes the token and destructures the data.
     * decodedToken.exp will have the time of expiry of the token in ms.
     */
    if (token) {
      const decodedToken = token && decode(token);
      const expTimeInSecs = decodedToken?.exp * 1000;
      const currTimeInSecs = new Date().getTime();

      // if token has expired, log out the user
      if (expTimeInSecs < currTimeInSecs) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const getTrendingSpaces = async () => {
    const {
      data: { data }
    } = await api.fetchTrendingSpaces();
    return data;
  };

  useEffect(() => {
    getTrendingSpaces().then(spaces => {
      spaces.forEach(space => {
        const trendingObj = {
          id: space._id,
          name: space.name,
          metric: `${compactNumber(space.members?.length)} users`,
          img: space.img
        };
        setAllTrendingSpaces(old => {
          return [...old, trendingObj];
        });
      });
    });
  }, []);

  return (
    <>
      <Navbar
        userName={user?.result.name}
        userImg={user?.result.profileImg}
        logout={logout}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left_sidebar}>
            <LeftSidebar
              onClick={onClick}
              links={[
                {
                  label: "Home",
                  destination: "/",
                  isActive: location.pathname === "/",
                  icon: <HomeFilled />
                },
                {
                  label: "Global Feed",
                  destination: "/global",
                  isActive: location.pathname === "/global",
                  icon: <GlobalOutlined />
                },
                {
                  label: "My Profile",
                  destination: "/profile",
                  isActive: location.pathname === "/profile",
                  icon: <UserOutlined />
                },
                {
                  label: "Explore",
                  destination: "/explore",
                  isActive: location.pathname === "/explore",
                  icon: <CompassFilled />
                }
              ]}
            />

            {/* my spaces section */}
            <div className={styles.spaces_section}>
              <MySpaces
                userId={user?.result?._id}
                openModal={() => setSpaceModalVisible(true)}
              />
            </div>
          </div>

          {children}

          <div className={styles.right_sidebar}>
            <div className={styles.btns_container}>
              <Button
                onClick={() => setPostModalVisible(true)}
                className={styles.btn}
                size={BUTTON_SIZE.XL}
              >
                + Add a new post
              </Button>
              {!isSpacePage && (
                <Button
                  onClick={() => setSpaceModalVisible(true)}
                  className={styles.btn}
                  size={BUTTON_SIZE.XL}
                >
                  + Add a new space
                </Button>
              )}
            </div>

            {/* create post modal */}
            <Modal
              title='Create Post'
              visible={postModalVisible}
              onOk={handleSavePost}
              confirmLoading={createPostLoading}
              onCancel={() => setPostModalVisible(false)}
              width={670}
              centered
              footer={[
                <AntButton
                  key='cancel'
                  onClick={() => setPostModalVisible(false)}
                  style={{
                    borderRadius: "5px",
                    border: "0.55px solid rgb(61, 110, 240)",
                    fontWeight: "bold",
                    color: "rgb(61, 110, 240)"
                  }}
                >
                  Cancel
                </AntButton>,
                <AntButton
                  key='create'
                  type='primary'
                  loading={createPostLoading}
                  onClick={handleSavePost}
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "rgb(61, 110, 240)",
                    border: "none",
                    fontWeight: "bold"
                  }}
                >
                  Create
                </AntButton>
              ]}
            >
              <CreatePost postData={postData} setPostData={setPostData} />
            </Modal>

            {/* create space modal */}
            <Modal
              title='Create Space'
              visible={spaceModalVisible}
              onOk={handleSaveSpace}
              confirmLoading={createSpaceLoading}
              onCancel={() => setSpaceModalVisible(false)}
              width={670}
              centered
              footer={[
                <AntButton
                  key='cancel'
                  onClick={() => setSpaceModalVisible(false)}
                  style={{
                    borderRadius: "5px",
                    border: "0.55px solid rgb(61, 110, 240)",
                    fontWeight: "bold",
                    color: "rgb(61, 110, 240)"
                  }}
                >
                  Cancel
                </AntButton>,
                <AntButton
                  key='create'
                  type='primary'
                  loading={createSpaceLoading}
                  onClick={handleSaveSpace}
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "rgb(61, 110, 240)",
                    border: "none",
                    fontWeight: "bold"
                  }}
                >
                  Create
                </AntButton>
              ]}
            >
              <CreateSpace spaceData={spaceData} setSpaceData={setSpaceData} />
            </Modal>
            {!isSpacePage ? (
              <div className={styles.card_list}>
                <div className={styles.card}>
                  <SuggestionCard
                    heading='Trending Spaces'
                    list={allTrendingSpaces}
                    onClick={navigateToSpace}
                  />
                </div>

                <div className={styles.card}>
                  <SuggestionCard
                    heading='Popular Campuses'
                    list={[
                      {
                        name: "VIT, Vellore",
                        metric: "150 spaces"
                      },
                      {
                        name: "IIIT Hyderabad",
                        metric: "110 spaces"
                      }
                    ]}
                    onClick={navigateToSpace}
                  />
                </div>
              </div>
            ) : (
              <div className={styles.card_list}>
                <SpaceDetails isSpacePage />
              </div>
            )}
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired,
  isSpacePage: PropTypes.bool
};

Base.defaultProps = {
  isSpacePage: false
};
export default Base;

import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Modal } from "antd";
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

// styles
import styles from "./Base.module.scss";
import CreatePost from "./pages/createPost/CreatePost";

const Base = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // navigate to given page
  const onClick = destination => {
    history.push(destination);
  };

  // opens the create post modal
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);

    // the below line will be replaced by dispatching an action to save the post
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // closes the create post modal
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
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
          <div className={styles.spaces_section}>
            <div className={styles.my_spaces_heading}>My Spaces</div>
            <div className={styles.spaces_list}>
              <div className={styles.space_name}>
                Announcements in VIT, Vellore
              </div>
              <div className={styles.space_name}>Fests in NIT, Warangal</div>
              <div className={styles.space_name}>Random in IIIT Hyderabad</div>
            </div>
          </div>
        </div>

        {children}

        <div className={styles.right_sidebar}>
          <div className={styles.btns_container}>
            <Button
              onClick={showModal}
              className={styles.btn}
              size={BUTTON_SIZE.XL}
            >
              + Add a new post
            </Button>
            <Button className={styles.btn} size={BUTTON_SIZE.XL}>
              + Add a new space
            </Button>
          </div>
          <Modal
            title='Create Post'
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={670}
            centered
          >
            <CreatePost />
          </Modal>
          <div className={styles.card_list}>
            <div className={styles.card}>
              <SuggestionCard
                heading='Trending Spaces'
                list={[
                  {
                    name: "Announcements",
                    metric: "31k users"
                  },
                  {
                    name: "WebDev",
                    metric: "25k users"
                  },
                  {
                    name: "QnA",
                    metric: "21k users"
                  },
                  {
                    name: "Fests",
                    metric: "18k users"
                  }
                ]}
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
              />
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired
};

export default Base;

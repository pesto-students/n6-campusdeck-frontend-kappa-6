import { useState, useEffect } from "react";
import {
  Card,
  Skeleton,
  Pagination,
  Modal,
  Button as AntButton,
  message
} from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ContextMenu, Button } from "@cd/components";

import CreateSpace from "../../organisms/createSpace/CreateSpace";
import * as api from "../../api";

// assets
import styles from "./spaces.module.scss";
import DefaultSpace from "../../assets/default_space.png";

const { Meta } = Card;

const initialSpaceFormData = {
  name: "",
  desc: "",
  img: "",
  campus: "",
  tags: [],
  isPublic: true
};

const Spaces = () => {
  const [spaces, setSpaces] = useState([
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises2",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises 2",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises 2",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises 2",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // },
    // {
    //   title: "React Best Practises 2",
    //   desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
    //   img: DefaultSpace
    // }
  ]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [spacesPerPage] = useState(8);
  const [spaceModalVisible, setSpaceModalVisible] = useState(false);
  const [updateSpaceLoading, setUpdateSpaceLoading] = useState(false);
  const [isSpaceEditMode, setIsSpaceEditMode] = useState(false);
  const [currentlyEditingSpace, setCurrentlyEditingSpace] = useState("");
  const [spaceData, setSpaceData] = useState(initialSpaceFormData);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  // function that will sort the list of spaces
  const sortSpaces = ({ key }) => {};

  const fetchSpaces = async () => {
    const campusName = user?.result?.campus;

    const {
      data: { data: campusObj }
    } = await api.getCampusByName(campusName);

    const {
      data: { data: spacesInCampus }
    } = await api.getAllSpacesByCampus(campusObj[0]?._id);

    if (spacesInCampus.length) {
      setSpaces(spacesInCampus);
    }
  };

  // function that will execute when the ok button is pressed in modal
  const handleSpaceUpdate = async () => {
    setUpdateSpaceLoading(true);

    if (isSpaceEditMode) {
      const {
        data: { data: updatedSpace }
      } = await api.editSpace(currentlyEditingSpace, spaceData);

      if (updatedSpace) {
        message.success("Space updated successfully");
      }
      const newSpaceList = spaces.map(s => {
        return s._id === updatedSpace._id ? updatedSpace : s;
      });
      setSpaces(newSpaceList);
    } else {
      // dispatch to create space
      // dispatch(createSpace(spaceData));
    }

    // make the below lines async
    setSpaceModalVisible(false);
    setUpdateSpaceLoading(false);
  };

  const hideModal = () => {
    setSpaceData(initialSpaceFormData);
    setSpaceModalVisible(false);
    setIsSpaceEditMode(false);
  };

  const changePageNum = number => {
    setCurrentPageNum(number);
  };

  const handleEditSpace = space => {
    setIsSpaceEditMode(true);
    setSpaceModalVisible(true);

    setCurrentlyEditingSpace(space._id);
    setSpaceData({
      name: space.name,
      desc: space.desc,
      img: space.img,
      campus: space.campus,
      tags: space.tags,
      isPublic: space.isPublic
    });
  };

  useEffect(() => {
    if (user) {
      fetchSpaces();
    }
  }, []);

  const end = spacesPerPage * currentPageNum;
  const start = end - spacesPerPage;
  const paginatedSpaces = spaces.slice(start, end);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className={styles.create_space_btn}
          onClick={() => setSpaceModalVisible(true)}
        >
          Create Space
        </Button>
        <ContextMenu items={["Popular", "New"]} handler={sortSpaces}>
          <span className={styles.sort_option}>Sort by: </span>
        </ContextMenu>
      </div>
      <div className={styles.content}>
        {paginatedSpaces.length > 0 ? (
          paginatedSpaces.map(space => (
            <Card
              key={space.id}
              hoverable
              size='small'
              className={styles.card}
              cover={
                <img
                  className={styles.card_img}
                  alt={space.title}
                  src={space.img === "" ? DefaultSpace : space?.img}
                />
              }
              actions={[
                <EditOutlined
                  key='edit'
                  onClick={() => handleEditSpace(space)}
                />,
                <ContextMenu items={["Make Private", "Delete"]}>
                  <EllipsisOutlined key='ellipsis' />
                </ContextMenu>
              ]}
            >
              <Meta title={space.title} description={space.desc} />
            </Card>
          ))
        ) : (
          <>
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
            <Skeleton
              active
              paragraph={{ rows: 5 }}
              className={styles.skeleton}
            />
          </>
        )}
      </div>
      <div className={styles.footer}>
        <Pagination
          current={currentPageNum}
          onChange={changePageNum}
          total={spaces.length}
          hideOnSinglePage
        />
      </div>

      {/* create space modal */}
      <Modal
        title={`${isSpaceEditMode ? "Edit" : "Create"} Space`}
        visible={spaceModalVisible}
        onOk={handleSpaceUpdate}
        confirmLoading={updateSpaceLoading}
        onCancel={hideModal}
        width={670}
        centered
        footer={[
          <AntButton
            key='cancel'
            onClick={hideModal}
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
            loading={updateSpaceLoading}
            onClick={handleSpaceUpdate}
            style={{
              borderRadius: "5px",
              backgroundColor: "rgb(61, 110, 240)",
              border: "none",
              fontWeight: "bold"
            }}
          >
            {`${isSpaceEditMode ? "Update" : "Create"}`}
          </AntButton>
        ]}
      >
        <CreateSpace spaceData={spaceData} setSpaceData={setSpaceData} />
      </Modal>
    </div>
  );
};

export default Spaces;

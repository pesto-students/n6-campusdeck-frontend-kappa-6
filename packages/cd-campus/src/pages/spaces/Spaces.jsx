import { useState, useEffect } from "react";
import {
  Card,
  Skeleton,
  Pagination,
  Modal,
  Button as AntButton,
  message,
  Popconfirm
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ContextMenu, Button, DeleteOutlined } from "@cd/components";

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
  const [user] = useState(JSON.parse(localStorage.getItem("admin")));

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

  const hideModal = () => {
    setSpaceData(initialSpaceFormData);
    setSpaceModalVisible(false);
    setIsSpaceEditMode(false);
  };

  const deleteSpace = async spaceId => {
    const { data } = await api.deleteSpace(spaceId);

    if (data.status === "success") {
      message.success("Space deleted successfully");
      const newSpaceList = spaces.filter(s => s._id !== spaceId);

      setSpaces(newSpaceList);
    } else {
      message.error("There was a problem deleting the space");
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
        hideModal();
        setUpdateSpaceLoading(false);
      } else {
        message.error("There was a problem updating the space");
      }
      const newSpaceList = spaces.map(s => {
        return s._id === updatedSpace._id ? updatedSpace : s;
      });
      setSpaces(newSpaceList);
    } else {
      const { data } = await api.createSpace(spaceData);

      if (data.status === "success") {
        message.success("Space created successfully");
        hideModal();
        setUpdateSpaceLoading(false);
      } else {
        message.error("There was a problem creating the space");
      }
      setSpaces([...spaces, data.data]);
    }
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
                  alt={space.name}
                  src={space.img === "" ? DefaultSpace : space?.img}
                />
              }
              actions={[
                <EditOutlined
                  key='edit'
                  onClick={() => handleEditSpace(space)}
                />,
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to delete this space?'
                  onConfirm={() => deleteSpace(space._id)}
                  okText='Yes'
                  cancelText='No'
                >
                  <DeleteOutlined
                    key='delete'
                    style={{ color: "rgba(255,0,0,0.75)" }}
                  />
                </Popconfirm>
              ]}
            >
              <Meta title={space.name} description={space.desc} />
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

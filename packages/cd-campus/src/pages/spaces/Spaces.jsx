import { useState, useEffect } from "react";
import { Card, Skeleton, Pagination, Modal, Button as AntButton } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ContextMenu, Button } from "@cd/components";

import CreateSpace from "../../organisms/createSpace/CreateSpace";
import * as api from "../../api";

// assets
import styles from "./spaces.module.scss";
import DefaultSpace from "../../assets/default_space.png";

const { Meta } = Card;

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
  const [createSpaceLoading, setCreateSpaceLoading] = useState(false);
  const [spaceData, setSpaceData] = useState({
    name: "",
    desc: "",
    img: "",
    campus: "",
    tags: [],
    isPublic: true
  });
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

  // function that will execute when a space is created
  const handleSaveSpace = () => {
    setCreateSpaceLoading(true);

    // dispatch(createSpace(spaceData));

    // make the below lines async
    setSpaceModalVisible(false);
    setCreateSpaceLoading(false);
  };

  const changePageNum = number => {
    setCurrentPageNum(number);
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
                <EditOutlined key='edit' onClick={() => alert(space.title)} />,
                <ContextMenu items={["Delete", "Make Private"]}>
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
    </div>
  );
};

export default Spaces;

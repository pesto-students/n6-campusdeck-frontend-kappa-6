import { useState, useEffect } from "react";
import { Card, Skeleton, Pagination } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ContextMenu } from "@cd/components";

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
    </div>
  );
};

export default Spaces;

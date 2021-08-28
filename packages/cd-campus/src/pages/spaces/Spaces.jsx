import { useState } from "react";
import { Card } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ContextMenu } from "@cd/components";

// assets
import styles from "./spaces.module.scss";
import DefaultSpace from "../../assets/default_space.png";

const { Meta } = Card;

const Spaces = () => {
  const [spaces, setSpaces] = useState([
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    },
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    },
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    },
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    },
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    },
    {
      title: "React Best Practises",
      desc: "Designed for folks who want to be better at React. Designed for folks who want to be better at React",
      img: DefaultSpace
    }
  ]);

  // function that will sort the list of spaces
  const sortSpaces = ({ key }) => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ContextMenu items={["Popularity", "New"]} handler={sortSpaces}>
          <span className={styles.sort_option}>Sort by: </span>
        </ContextMenu>
      </div>
      <div className={styles.content}>
        {spaces.length &&
          spaces.map(space => (
            <Card
              hoverable
              size='small'
              className={styles.card}
              cover={
                <img
                  className={styles.card_img}
                  alt={space.title}
                  src={space.img}
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
          ))}
      </div>
      <div className={styles.footer}>Footer</div>
    </div>
  );
};

export default Spaces;

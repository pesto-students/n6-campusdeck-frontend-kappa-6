import { useState } from "react";
import PropTypes from "prop-types";
import { PlusCircleFilled, ProfilePic } from "@cd/components";

// styles
import styles from "./mySpaces.module.scss";

const MySpaces = ({ openModal }) => {
  const [spaces, setSpaces] = useState([
    {
      name: "Announcements in VIT, Vellore",
      desc: "This group is designed for folks who want to learn best practises of React and web development"
    },
    {
      name: "Fests in NIT, Warangal",
      desc: "This group is designed for folks who want to learn best practises of React and web development"
    },
    {
      name: "Random in IIIT Hyderabad",
      desc: "This group is designed for folks who want to learn best practises of React and web development"
    }
  ]);
  return (
    <div className={styles.container}>
      <div className={styles.my_spaces_heading}>
        My Spaces{" "}
        <PlusCircleFilled onClick={openModal} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.spaces_list}>
        {spaces.length > 0 &&
          spaces.map(space => (
            <div className={styles.space}>
              <div className={styles.row}>
                <img className={styles.space_img} src={ProfilePic} alt='' />
                <div className={styles.space_name}>{space.name}</div>
              </div>
              <div className={styles.space_desc}>{space.desc}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

MySpaces.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default MySpaces;

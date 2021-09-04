import PropTypes from "prop-types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, BUTTON_SIZE, SpaceStats, ProfilePic } from "@cd/components";
import { getSpace } from "../../actions/space";

// styles
import styles from "./spaceDetails.module.css";

const SpaceDetails = ({ isSpacePage, dbId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const { space } = useSelector(state => state.space);
  const space = {
    createdAt: "2021-09-03T14:05:12.167Z",
    _id: "6131924dbd25684edd494539",
    name: "Random",
    desc: "Any random discussion related to VIT, Vellore",
    tags: ["Help", "Classes", "Food"],
    img: "",
    campus: "61318de332258e3b1036ff94",
    isPublic: true
  };

  useEffect(() => {
    // if it is used in the space page, use id from params
    // otherwise use the one provided as a prop.
    const idToUse = isSpacePage ? id : dbId;
    dispatch(getSpace(idToUse));
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.card_header}>
        <span className={styles.name}>{space.name}</span>
        <Button size={BUTTON_SIZE.SMALL} text='+ Follow' />
      </div>
      <div className={styles.space_desc}>{space.desc}</div>
      <SpaceStats
        numOfPosts={space.numOfPosts}
        followers={space.followers}
        numOfUsers={space.numOfUsers}
      />
      <div className={styles.card_footer}>
        <img
          className={styles.creator_img}
          src={space.creatorPic}
          alt={space.creatorName}
        />
        <div className={styles.credit}>
          Created by <span style={{ color: "blue" }}>{space.creator}</span>
        </div>
        <div className={styles.time}>
          <span>{space.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

SpaceDetails.propTypes = {
  isSpacePage: PropTypes.bool,
  dbId: PropTypes.string
};

SpaceDetails.defaultProps = {
  isSpacePage: false,
  dbId: undefined
};

export default SpaceDetails;

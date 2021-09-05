import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Tooltip } from "antd";

import { Button, BUTTON_SIZE, SpaceStats, ProfilePic } from "@cd/components";
import { getSpace } from "../../actions/space";
import { getPostsFromSpace } from "../../actions/post";
import * as api from "../../api/index";

// styles
import styles from "./spaceDetails.module.css";

const SpaceDetails = ({ isSpacePage, dbId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { space } = useSelector(state => state.space);
  const [postCount, setPostCount] = useState(0);
  const [author, setAuthor] = useState({
    authorName: "",
    authorImg: ""
  });

  const getPostsCount = async spaceId => {
    const {
      data: { data }
    } = await api.getPostsFromSpace(spaceId);
    return data.length;
  };

  const getCreatorDetails = async creatorId => {
    const {
      data: { data }
    } = await api.getUser(creatorId);
    setAuthor({
      authorName: data.name,
      authorImg: data.profileImg
    });
  };

  useEffect(() => {
    // if it is used in the space page, use id from params
    // otherwise use the one provided as a prop.
    const idToUse = isSpacePage ? id : dbId;
    dispatch(getSpace(idToUse));

    getPostsCount(idToUse).then(len => {
      setPostCount(len);
    });

    getCreatorDetails(space.creator);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.card_header}>
        <span className={styles.name}>{space.name}</span>
        <Button size={BUTTON_SIZE.SMALL} text='+ Join' />
      </div>
      <div className={styles.space_desc}>{space.desc}</div>
      <SpaceStats
        numOfPosts={postCount}
        followers={space.followers}
        numOfUsers={space.numOfUsers}
      />
      <div className={styles.card_footer}>
        <img
          className={styles.creator_img}
          src={author.authorImg}
          alt={author.authorName}
        />
        <div className={styles.credit}>
          Created by <span style={{ color: "blue" }}>{author.authorName}</span>
        </div>
        <div className={styles.time}>
          <Tooltip
            title={moment(space.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment(space.createdAt).fromNow()}</span>
          </Tooltip>
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

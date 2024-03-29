import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Tooltip } from "antd";

import {
  Button,
  BUTTON_SIZE,
  BUTTON_TYPE,
  SpaceStats,
  ProfilePic,
  CheckOutlined,
  PlusOutlined
} from "@cd/components";
import { joinASpace } from "../../actions/space";
import * as api from "../../api/index";

// styles
import styles from "./spaceDetails.module.scss";

const SpaceDetails = ({ isSpacePage, dbId }) => {
  const [space, setSpace] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [author, setAuthor] = useState({
    authorName: "",
    authorImg: ""
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem("profile"));

  const getPostsCount = async spaceId => {
    const {
      data: { data }
    } = await api.getPostsFromSpace(spaceId);
    return data.length;
  };

  const getCreatorDetails = async creatorId => {
    if (creatorId) {
      const {
        data: { data }
      } = await api.getUser(creatorId);
      setAuthor({
        authorName: data.name,
        authorImg: data.profileImg
      });
    }
  };

  const hasUserJoinedSpace = () => {
    if (
      space?.members?.findIndex(
        memberId => memberId === loggedInUser.result._id
      ) !== -1
    ) {
      return true;
    }
    return false;
  };

  const spaceJoin = () => {
    const spaceId = isSpacePage ? id : dbId;

    if (!hasUserJoinedSpace()) {
      setSpace({
        ...space,
        members: [...space.members, loggedInUser?.result?._id]
      });
    } else {
      const newMembersList = space.members.filter(
        memberId => memberId !== loggedInUser?.result?._id
      );
      setSpace({ ...space, members: newMembersList });
    }
    dispatch(joinASpace(spaceId));
  };

  const fetchSpace = async idToUse => {
    const {
      data: { data }
    } = await api.getSpace(idToUse);

    setSpace(data);
  };

  useEffect(() => {
    // if it is used in the space page, use id from params
    // otherwise use the one provided as a prop.
    const idToUse = isSpacePage ? id : dbId;

    if (idToUse) {
      fetchSpace(idToUse);

      getPostsCount(idToUse).then(len => {
        setPostCount(len);
      });
    }

    getCreatorDetails(space?.creator);
  }, [id]);

  // subcomponent to render join button
  const JoinButton = () => {
    let btnType = BUTTON_TYPE.REGULAR;
    let btnText = "Joined";
    let icon = <CheckOutlined style={{ marginRight: "0.25rem" }} />;

    if (!hasUserJoinedSpace()) {
      btnType = BUTTON_TYPE.SKELETON;
      btnText = "Join";
      icon = <PlusOutlined style={{ marginRight: "0.25rem" }} />;
    }

    return (
      <Button size={BUTTON_SIZE.SMALL} type={btnType} onClick={spaceJoin}>
        {icon}
        {btnText}
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_header}>
        <span className={styles.name}>{space?.name}</span>
        <JoinButton />
      </div>
      <div className={styles.space_desc}>{space?.desc}</div>
      <SpaceStats
        numOfPosts={postCount}
        followers={space?.members?.length}
        numOfUsers={space?.members?.length}
      />
      <div className={styles.card_footer}>
        <img
          className={styles.creator_img}
          src={author.authorImg ? author.authorImg : ProfilePic}
          alt={author.authorName}
        />
        <div className={styles.credit}>
          Created by <span className={styles.name}>{author.authorName}</span>
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

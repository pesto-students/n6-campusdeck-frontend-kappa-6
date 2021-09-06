import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Tooltip, Skeleton } from "antd";
import { PlusCircleFilled, ProfilePic } from "@cd/components";

import { getUserSpaces } from "../../actions/auth";
import * as api from "../../api/index";

// styles
import styles from "./mySpaces.module.scss";

const MySpaces = ({ userId, openModal }) => {
  const [spaces, setSpaces] = useState([]);
  const { mySpaces } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const finalSpaces = [];

  const getSpaceDetails = async spaceId => {
    return api.getSpace(spaceId);
  };

  const navigateToSpace = id => {
    history.push(`/space/${id}`);
  };

  useEffect(() => {
    dispatch(getUserSpaces(userId));
  }, []);

  useEffect(() => {
    const promiseArr = [];

    if (mySpaces) {
      mySpaces.forEach(space => {
        promiseArr.push(getSpaceDetails(space));
      });

      Promise.all(promiseArr)
        .then(results => {
          results.forEach(result => {
            finalSpaces.push(result.data.data);
          });
        })
        .then(() => {
          setSpaces(finalSpaces);
        });
    }
  }, [mySpaces]);

  return (
    <div className={styles.container}>
      <div className={styles.my_spaces_heading}>
        My Spaces{" "}
        <PlusCircleFilled onClick={openModal} style={{ cursor: "pointer" }} />
      </div>

      <div className={styles.spaces_list}>
        {spaces.length > 0 ? (
          spaces.map(space => (
            <div className={styles.space}>
              <div className={styles.row}>
                <img
                  className={styles.space_img}
                  src={space.img ? space.img : ProfilePic}
                  alt={space.name}
                />
                <div
                  className={styles.space_name}
                  onClick={() => navigateToSpace(space._id)}
                >
                  {space.name}
                </div>
              </div>
              <Tooltip title={space.desc} placement='right'>
                <div className={styles.space_desc}>{space.desc}</div>
              </Tooltip>
            </div>
          ))
        ) : (
          <>
            <Skeleton
              loading={!spaces.length}
              size='small'
              avatar
              paragraph={{ rows: 1 }}
              active
            />
            <Skeleton
              loading={!spaces.length}
              size='small'
              avatar
              paragraph={{ rows: 1 }}
              active
            />
          </>
        )}
      </div>
    </div>
  );
};

MySpaces.propTypes = {
  userId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};

export default MySpaces;

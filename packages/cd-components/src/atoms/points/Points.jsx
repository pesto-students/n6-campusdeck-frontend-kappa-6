import PropTypes from "prop-types";
import { Tooltip } from "antd";

import { compactNumber } from "@cd/base";
import { ArrowUpOutlined, ArrowDownOutlined } from "../icon";

// styles
import styles from "./points.module.scss";

const Points = ({ likes, likePost, hasUserLiked }) => {
  return (
    <div className={styles.container}>
      <ArrowUpOutlined
        style={{ color: hasUserLiked ? "blue" : "" }}
        className={styles.arrow}
        onClick={likePost}
      />
      <div className={styles.points}>{compactNumber(likes?.length)}</div>
      <Tooltip placement='bottom' title='Coming soon'>
        <ArrowDownOutlined className={styles.arrow} />
      </Tooltip>
    </div>
  );
};

Points.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  likePost: PropTypes.func.isRequired
};

export default Points;

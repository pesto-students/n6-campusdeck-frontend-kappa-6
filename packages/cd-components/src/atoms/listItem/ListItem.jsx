import PropTypes from "prop-types";

import { ProfilePic } from "@cd/components";
// style
import styles from "./listItem.module.scss";

const ListItem = ({ image, name, metric }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={image} alt={name} />
      <div className={styles.name}>{name}</div>
      <span className={styles.metric}>{metric}</span>
    </div>
  );
};

ListItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired
};

ListItem.defaultProps = {
  image: ProfilePic
};

export default ListItem;

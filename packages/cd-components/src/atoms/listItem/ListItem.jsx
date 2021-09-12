import PropTypes from "prop-types";

import { ProfilePic } from "@cd/components";
// style
import styles from "./listItem.module.scss";

const ListItem = ({ item, onClick }) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.img}
        src={item.image ? item.image : ProfilePic}
        alt={item.name}
      />
      <div className={styles.name} onClick={() => onClick(item.id)}>
        {item.name}
      </div>
      <span className={styles.metric}>{item.metric}</span>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    metric: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default ListItem;

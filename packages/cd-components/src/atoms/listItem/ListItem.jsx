import SpaceImage from "./deleteThisLater/defaultProfile.jpg";
// style
import styles from "./listItem.module.css";

const ListItem = ({ image, name, metric }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={SpaceImage}></img>
      <div className={styles.name}>{name}</div>
      <span className={styles.metric}>{metric}</span>
    </div>
  );
};

ListItem.defaultProps = {
  image: SpaceImage
};

export default ListItem;

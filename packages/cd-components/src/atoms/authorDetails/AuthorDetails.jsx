//styles
import styles from "./authorDetails.module.css";

const AuthorDetails = ({ authorName, authorPic }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={authorPic} />
      <div className={styles.credit}>
        Created by <span style={{ color: "blue" }}>{authorName}</span>
      </div>
    </div>
  );
};

export default AuthorDetails;

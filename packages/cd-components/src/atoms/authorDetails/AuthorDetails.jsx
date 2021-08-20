//styles
import styles from "./authorDetails.module.scss";

const AuthorDetails = ({ authorName, authorPic }) => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={authorPic} />
      <div className={styles.credit}>
        Posted by <span style={{ color: "blue" }}>{authorName}</span>
      </div>
    </div>
  );
};

export default AuthorDetails;

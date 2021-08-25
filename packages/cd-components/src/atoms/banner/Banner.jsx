import { CheckOutlined } from "../icon/Icon";

// style
import styles from "./banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>CampusDeck</div>
      <div className={styles.feature_list}>
        <div className={styles.feature}>
          <div className={styles.check}>
            <CheckOutlined />
          </div>
          <div className={styles.text}>Quick and easy registration process</div>
        </div>

        <div className={styles.feature}>
          <div className={styles.check}>
            <CheckOutlined />
          </div>
          <div className={styles.text}>
            Find and interact with your friends from college
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.check}>
            <CheckOutlined />
          </div>
          <div className={styles.text}>
            Spread the word about an event to different campuses
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

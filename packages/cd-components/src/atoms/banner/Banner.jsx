import PropTypes from "prop-types";
import { CheckOutlined } from "../icon/Icon";

// style
import styles from "./banner.module.scss";

const Banner = ({
  items = [
    "Quick and easy registration process",
    "Find and interact with your friends from college",
    "Spread the word about an event to different campuses"
  ]
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>CampusDeck</div>
      <div className={styles.feature_list}>
        {items.length > 0 &&
          items.map((item, idx) => (
            <div className={styles.feature} key={idx}>
              <div className={styles.check}>
                <CheckOutlined />
              </div>
              <div className={styles.text}>{item}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

Banner.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Banner;

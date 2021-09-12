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
      <div className={styles.brand_container}>
        <div className={styles.logo}>
          <svg>
            <g
              id='SvgjsG1773'
              featurekey='HKaMnE-0'
              transform='matrix(0.9351638387855091,0,0,0.9351638387855091,-6.273111720928312,3.326626801308688)'
              fill='#ffffff'
            >
              <g xmlns='http://www.w3.org/2000/svg'>
                <path d='M97.4,62c-0.5-2.2-1.2-5-1.8-6.4c-0.1-0.3-0.2-0.6-0.4-1c-1-2.7-2.9-7.7-7.5-7.7H70.6c1.7,1.6,2.7,3.6,3.4,5.3h3.5     l0.6,12.3c0.1,1.3,1.1,2.4,2.3,2.5c1.2,0.1,2.4,0.2,3.7,0.2c1.2,0,2.4-0.1,3.7-0.2c1.3-0.1,2.3-1.3,2.3-2.6l0.2-7.9     c0.1,0.4,0.3,0.8,0.4,1.1c0.4,1,1,3.3,1.5,5.5c0.4,1.6,2.1,2.5,3.6,1.9l0.1,0C97.1,64.5,97.7,63.2,97.4,62z'></path>
                <circle cx='84.2' cy='39.1' r='6.3'></circle>
                <path d='M52.3,46.8H25c1.7,1.6,2.7,3.7,3.4,5.3h3l1.2,12.2c0,1.3,1,2.4,2.3,2.6c1.2,0.1,2.4,0.2,3.6,0.2c1.2,0,2.5-0.1,3.7-0.2     c1.3-0.1,2.3-1.3,2.3-2.6l1.1-12.2h3.2C49.5,50.5,50.6,48.4,52.3,46.8z'></path>
                <circle cx='38.6' cy='39.1' r='6.3'></circle>
                <path d='M27.3,55.6c-0.1-0.3-0.2-0.6-0.4-1c-1-2.7-2.9-7.7-7.5-7.7h-7.2c-4.7,0-6.5,5-7.5,7.7c-0.1,0.4-0.3,0.7-0.4,1     c-0.6,1.4-1.3,4.2-1.8,6.4c-0.3,1.3,0.4,2.5,1.6,3c0,0,0,0,0.1,0c1.5,0.6,3.2-0.3,3.6-1.9c0.5-2.2,1.1-4.6,1.5-5.5     c0.1-0.3,0.3-0.7,0.4-1.1l0.2,7.9c0,1.3,1,2.4,2.3,2.6c1.2,0.1,2.4,0.2,3.6,0.2c1.2,0,2.5-0.1,3.6-0.2c1.3-0.1,2.3-1.3,2.3-2.6     l0.2-7.9c0.1,0.4,0.3,0.8,0.4,1.1c0.4,1,1,3.3,1.5,5.5c0.4,1.6,2.1,2.5,3.6,1.9c0,0,0,0,0.1,0c1.2-0.5,1.9-1.8,1.6-3     C28.6,59.7,27.9,57,27.3,55.6z'></path>
                <circle cx='15.8' cy='39.1' r='6.3'></circle>
                <path d='M72.9,55.6c-0.1-0.3-0.2-0.6-0.4-1c-1-2.7-2.9-7.7-7.5-7.7h-0.2H58h-0.2c-4.7,0-6.5,5-7.5,7.7c-0.1,0.4-0.3,0.7-0.4,1     c-0.6,1.4-1.3,4.2-1.8,6.4c-0.3,1.3,0.4,2.5,1.6,3c0,0,0,0,0.1,0c1.5,0.6,3.2-0.3,3.6-1.9c0.5-2.2,1.1-4.6,1.5-5.5     c0.1-0.3,0.3-0.7,0.4-1.1l0.2,7.9c0,1.3,1,2.4,2.3,2.6c1.2,0.1,2.4,0.2,3.6,0.2c1.2,0,2.5-0.1,3.6-0.2c1.3-0.1,2.3-1.3,2.3-2.6     l0.2-7.9c0.1,0.4,0.3,0.8,0.4,1.1c0.4,1,1,3.3,1.5,5.5c0.4,1.6,2.1,2.5,3.6,1.9c0,0,0,0,0.1,0c1.2-0.5,1.9-1.8,1.6-3     C74.2,59.7,73.5,57,72.9,55.6z'></path>
                <circle cx='61.4' cy='39.1' r='6.3'></circle>
              </g>
            </g>
          </svg>
        </div>
        <div className={styles.brand_text}>CampusDeck</div>
      </div>
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

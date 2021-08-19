import PropTypes from "prop-types";

import ListItem from "../../atoms/listItem/ListItem";

// style
import styles from "./suggestionCard.module.css";

const SuggestionCard = ({ heading, list }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.stats}>
        {list &&
          list.map((item, idx) => (
            <ListItem key={idx} name={item.name} metric={item.metric} />
          ))}
      </div>
    </div>
  );
};

SuggestionCard.propTypes = {
  heading: PropTypes.string.isRequired,
  list: PropTypes.array
};

SuggestionCard.defaultProps = {
  list: PropTypes.array.isRequired
};

export default SuggestionCard;

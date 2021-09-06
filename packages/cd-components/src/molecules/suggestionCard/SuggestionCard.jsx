import PropTypes from "prop-types";

import ListItem from "../../atoms/listItem/ListItem";

// style
import styles from "./suggestionCard.module.scss";

const SuggestionCard = ({ heading, list, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.stats}>
        {list &&
          list.map(item => (
            <div key={item.id}>
              <ListItem item={item} onClick={onClick} />
            </div>
          ))}
      </div>
    </div>
  );
};

SuggestionCard.propTypes = {
  heading: PropTypes.string.isRequired,
  list: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

SuggestionCard.defaultProps = {
  list: PropTypes.array.isRequired
};

export default SuggestionCard;

import Input from "../../atoms/input/Input";
import { SearchOutlined } from "../../atoms/icon";

// styles
import styles from "./searchBox.module.scss";

const SearchBox = () => {
  return (
    <div className={styles.container}>
      <SearchOutlined className={styles.search} />
      <Input size='medium' placeholder='Search posts or space...' />
    </div>
  );
};

SearchBox.propTypes = {};

SearchBox.defaultProps = {};

export default SearchBox;

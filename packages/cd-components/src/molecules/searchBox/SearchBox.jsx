import Input from "../../atoms/input/Input";
// TODO: change this to a modular import
import { Search as SearchIcon } from "../../atoms/icon";

// styles
import styles from "./searchBox.module.css";

const SearchBox = () => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.search} />
      <Input size='medium' placeholder='Search posts or space...' />
    </div>
  );
};

export default SearchBox;

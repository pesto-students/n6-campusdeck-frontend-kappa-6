import Input from "../../atoms/input/Input";
// TODO: change this to a modular import
import { Search } from "@cd/components/src/atoms/icon";

// styles
import styles from "./searchBox.module.css";

const SearchBox = () => {
  return (
    <>
      <Search className={styles.search} />
      <Input size='medium' placeholder='Search posts or space...' />{" "}
    </>
  );
};

export default SearchBox;

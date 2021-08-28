import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Navbar, LeftSidebar } from "@cd/components";

// styles
import styles from "./base.module.scss";

const Base = ({ children }) => {
  const history = useHistory();

  // navigate to given page
  const onClick = destination => {
    history.push(destination);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left_sidebar}>
          <LeftSidebar onClick={onClick} />
        </div>

        {children}
      </div>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired
};

export default Base;

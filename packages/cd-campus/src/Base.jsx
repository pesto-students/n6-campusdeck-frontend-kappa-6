import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import {
  Navbar,
  LeftSidebar,
  BarChart2,
  Users,
  GlobalOutlined
} from "@cd/components";

// styles
import styles from "./base.module.scss";

const Base = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  // navigate to given page
  const onClick = destination => {
    history.push(destination);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left_sidebar}>
          <LeftSidebar
            onClick={onClick}
            links={[
              {
                label: "Insights",
                destination: "/insights",
                isActive: location.pathname === "/insights",
                icon: <BarChart2 size={20} />
              },
              {
                label: "Spaces",
                destination: "/spaces",
                isActive: location.pathname === "/spaces",
                icon: <GlobalOutlined />
              },
              {
                label: "Students",
                destination: "/students",
                isActive: location.pathname === "/students",
                icon: <Users size={20} />
              }
            ]}
          />
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

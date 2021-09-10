import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Navbar,
  LeftSidebar,
  BarChart2,
  Users,
  GlobalOutlined
} from "@cd/components";

import { LOGOUT } from "./actions/constants/actionTypes";

// styles
import styles from "./base.module.scss";

const Base = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // navigate to given page
  const onClick = destination => {
    history.push(destination);
  };

  // function to logout the user
  const logout = () => {
    dispatch({
      type: LOGOUT
    });

    // clears the current user
    setUser(() => {
      // redirect user to home page upon logging out
      history.push("/login");

      return null;
    });
  };
  return (
    <>
      <Navbar
        userName={user?.result.name}
        userImg={user?.result.profileImg}
        logout={logout}
      />
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

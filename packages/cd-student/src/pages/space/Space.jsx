import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Navbar,
  LeftSidebar,
  HomeFilled,
  GlobalOutlined,
  UserOutlined,
  CompassFilled
} from "@cd/components";

// styles
import styles from "./space.module.scss";

const Space = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { id } = useParams();
  const history = useHistory();

  // navigate to given page
  const navigateToDest = destination => {
    history.push(destination);
  };

  return <div>Space page - {id}</div>;
};

export default Space;

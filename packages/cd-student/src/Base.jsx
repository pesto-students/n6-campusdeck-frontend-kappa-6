import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  ContextMenu,
  Footer,
  LeftSidebar,
  Post,
  SuggestionCard,
  Navbar
} from "@cd/components";

// styles
import styles from "./Base.module.scss";

const Base = ({ children }) => {
  const history = useHistory();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.left_sidebar}>
          <LeftSidebar history={history} />
          <div className={styles.spaces_section}>
            <div className={styles.my_spaces_heading}>My Spaces</div>
            <div className={styles.spaces_list}>
              <div className={styles.space_name}>
                Announcements in VIT, Vellore
              </div>
              <div className={styles.space_name}>Fests in NIT, Warangal</div>
              <div className={styles.space_name}>Random in IIIT Hyderabad</div>
            </div>
          </div>
        </div>

        {children}

        <div className={styles.right_sidebar}>
          <div className={styles.btns_container}>
            <Button className={styles.btn} type='add' size='long'>
              Add a new post
            </Button>
            <Button className={styles.btn} type='add' size='long'>
              Add a new space
            </Button>
          </div>
          <div className={styles.card_list}>
            <div className={styles.card}>
              <SuggestionCard
                heading='Trending Spaces'
                list={[
                  {
                    name: "Announcements",
                    metric: "31k users"
                  },
                  {
                    name: "WebDev",
                    metric: "25k users"
                  },
                  {
                    name: "QnA",
                    metric: "21k users"
                  },
                  {
                    name: "Fests",
                    metric: "18k users"
                  }
                ]}
              />
            </div>

            <div className={styles.card}>
              <SuggestionCard
                heading='Popular Campuses'
                list={[
                  {
                    name: "VIT, Vellore",
                    metric: "150 spaces"
                  },
                  {
                    name: "IIIT Hyderabad",
                    metric: "110 spaces"
                  }
                ]}
              />
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

Base.propTypes = {
  children: PropTypes.node.isRequired
};

export default Base;

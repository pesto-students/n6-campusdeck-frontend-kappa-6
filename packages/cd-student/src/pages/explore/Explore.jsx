import { useState, useEffect } from "react";
import { Divider, Skeleton } from "antd";
import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin
} from "@brainhubeu/react-carousel";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ContextMenu,
  Button,
  FilterOutlined,
  XCircle
} from "@cd/components";

import SpaceDetails from "../../organisms/spaceDetails";
import Post from "../../organisms/post/Post";
import * as api from "../../api/index";

// style
import styles from "./explore.module.scss";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);

  // get user id from the token
  const { result } = JSON.parse(localStorage.getItem("profile"));

  const addFilter = filter => {
    setSelectedFilters([...selectedFilters, filter]);
  };

  const removeFilter = filterToRemove => {
    const newFilters = selectedFilters.filter(
      filter => filter !== filterToRemove
    );
    setSelectedFilters(newFilters);
  };

  const applyFilterOption = ({ key }) => {
    const keyVsFilterMap = {
      1: "Spaces",
      2: "Posts"
    };

    const filterKey = keyVsFilterMap[key];

    if (selectedFilters.findIndex(filter => filter === filterKey) === -1) {
      addFilter(filterKey);
    } else {
      removeFilter(filterKey);
    }
  };

  const fetchPosts = async () => {
    // get the campus details from the name of the campus
    const {
      data: { data: campus }
    } = await api.getCampusByName(result.campus);

    // get the posts from the campus
    const {
      data: { data: postsFromCampus }
    } = await api.getPostsFromCampus(campus[0]._id);

    setPosts(postsFromCampus);
  };

  useEffect(() => {
    const includesPosts = selectedFilters.includes("Posts");
    const includesSpaces = selectedFilters.includes("Spaces");

    if (
      (includesPosts && includesSpaces) ||
      (!includesPosts && !includesSpaces)
    ) {
      setShowPosts(true);
      setShowSpaces(true);
    } else if (includesSpaces) {
      setShowPosts(false);
      setShowSpaces(true);
    } else if (includesPosts) {
      setShowPosts(true);
      setShowSpaces(false);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (showPosts) {
      fetchPosts();
    }
  }, [showPosts]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Explore</div>
      <div className={styles.filter_section}>
        <div>
          <ContextMenu items={["Spaces", "Posts"]} handler={applyFilterOption}>
            <Button type='skeleton' className={styles.filter_opt}>
              <FilterOutlined />
              <span className={styles.filter_label}>Filters</span>
            </Button>
          </ContextMenu>
        </div>

        <div className={styles.selected_filters}>
          {selectedFilters.length > 0 &&
            selectedFilters.map(filter => (
              <Button className={styles.filter_btn}>
                {filter}{" "}
                <XCircle
                  size={17}
                  className={styles.cross_icon}
                  onClick={() => removeFilter(filter)}
                />
              </Button>
            ))}
        </div>
      </div>
      {showSpaces && (
        <div className={styles.preferences_section}>
          <div className={styles.title}>Spaces based on your preferences</div>
          <Divider style={{ margin: "1rem 0" }} />
          <div className={styles.space_list}>
            <Carousel
              plugins={[
                "centered",
                "infinite",
                "fastSwipe",
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 2
                  }
                },
                {
                  resolve: arrowsPlugin,
                  options: {
                    arrowLeft: (
                      <ArrowLeftOutlined style={{ cursor: "pointer" }} />
                    ),
                    arrowLeftDisabled: (
                      <ArrowLeftOutlined style={{ cursor: "pointer" }} />
                    ),
                    arrowRight: (
                      <ArrowRightOutlined style={{ cursor: "pointer" }} />
                    ),
                    arrowRightDisabled: (
                      <ArrowRightOutlined style={{ cursor: "pointer" }} />
                    ),
                    addArrowClickHandler: true
                  }
                }
              ]}
            >
              <div className={styles.space_card}>
                <SpaceDetails />
              </div>
              <div className={styles.space_card}>
                <SpaceDetails />
              </div>
              <div className={styles.space_card}>
                <SpaceDetails />
              </div>
            </Carousel>
          </div>
        </div>
      )}

      {showPosts && (
        <div className={styles.campus_post_section}>
          <div className={styles.title}>Posts from your campus</div>
          <Divider style={{ margin: "1rem 0" }} />
          <Skeleton loading={!posts.length} active />
          <Skeleton loading={!posts.length} active>
            <div className={styles.post_container}>
              {posts.length > 0 &&
                posts.map(post => (
                  <div key={post._id} className={styles.post}>
                    <Post
                      id={post._id}
                      title={post.title}
                      tag={post.tag}
                      type={post.type}
                      likes={post?.likes}
                      content={post.body}
                      time={post.createdAt}
                      totalComments={post.comments?.length}
                      creator={post.creator}
                      spaceId={post.space}
                      comments={post.comments}
                      campusId={post.campus}
                    />
                  </div>
                ))}
            </div>
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export default Explore;

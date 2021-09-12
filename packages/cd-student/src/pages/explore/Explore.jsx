import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
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

const Explore = ({ isSearchPage }) => {
  const [posts, setPosts] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);

  // fetching the query params
  const { search } = useLocation();
  const searchTerm = new URLSearchParams(search).get("q");

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

  const fetchSpaces = async () => {
    const {
      data: { data: preferredSpaces }
    } = await api.getPreferredSpaces();

    setSpaces(preferredSpaces);
  };

  const searchPosts = async term => {
    const {
      data: { data: matchingPosts }
    } = await api.searchPosts(term);

    setPosts(matchingPosts);
  };

  const searchSpaces = async term => {
    const {
      data: { data: matchingSpaces }
    } = await api.searchSpaces(term);

    matchingSpaces?.forEach(matchingSpace => {
      const id = matchingSpace._id;

      setSpaces([...spaces, id]);
    });
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
    if (!isSearchPage) {
      if (showPosts) {
        fetchPosts();
      }
      if (showSpaces) {
        fetchSpaces();
      }
    }
  }, [showPosts, showSpaces]);

  useEffect(() => {
    if (searchTerm) {
      searchPosts(searchTerm);
      searchSpaces(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isSearchPage ? `Results for '${searchTerm}'` : "Explore"}
        {isSearchPage && (
          <div className={styles.results_found}>
            {posts.length + spaces.length} results found
          </div>
        )}
      </div>
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
          <div className={styles.title}>
            Spaces{" "}
            {isSearchPage ? `(${spaces.length})` : "based on your preferences"}
          </div>
          <Divider style={{ margin: "1rem 0" }} />
          <div className={styles.space_list}>
            <Carousel
              plugins={[
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 1
                  }
                },
                {
                  resolve: arrowsPlugin,
                  options: {
                    arrowLeft: (
                      <ArrowLeftOutlined className={styles.space_arrow} />
                    ),
                    arrowLeftDisabled: (
                      <ArrowLeftOutlined
                        className={styles.space_arrow}
                        style={{ color: "grey" }}
                      />
                    ),
                    arrowRight: (
                      <ArrowRightOutlined className={styles.space_arrow} />
                    ),
                    arrowRightDisabled: (
                      <ArrowRightOutlined
                        className={styles.space_arrow}
                        style={{ color: "grey" }}
                      />
                    ),
                    addArrowClickHandler: true
                  }
                }
              ]}
            >
              {spaces.length > 0 ? (
                spaces.map(space => (
                  <div className={styles.space_card}>
                    <SpaceDetails dbId={space} />
                  </div>
                ))
              ) : (
                <>
                  <Skeleton active />
                  <Skeleton active />
                </>
              )}
              <div />
            </Carousel>
          </div>
        </div>
      )}

      {showPosts && (
        <div className={styles.campus_post_section}>
          <div className={styles.title}>
            Posts {isSearchPage ? `(${posts.length})` : "from your campus"}
          </div>
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

Explore.propTypes = {
  isSearchPage: PropTypes.bool
};

Explore.defaultProps = {
  isSearchPage: false
};

export default Explore;

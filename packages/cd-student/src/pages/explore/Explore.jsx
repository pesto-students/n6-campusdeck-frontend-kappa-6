import { useState, useEffect } from "react";
import { Divider, Badge } from "antd";
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

// style
import styles from "./explore.module.scss";

const Explore = () => {
  const [posts, setPosts] = useState([
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact",
      comments: [
        {
          author: "Sai Chaitanya",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: "2021-08-27 14:48:00",
          replies: [
            {
              author: "Pushpak Bhattacharya",
              content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
              datetime: "2021-08-27 14:48:00"
            },
            {
              author: "Sai Chaitanya",
              content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
              datetime: "2021-08-27 14:48:00"
            }
          ]
        }
      ]
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
      size: "compact"
    }
  ]);
  const [spaces, setSpaces] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);

  // get user id from the token
  const {
    result: { _id: userId }
  } = JSON.parse(localStorage.getItem("profile"));

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
          <div className={styles.post_container}>
            {posts.length > 0 &&
              posts.map(post => (
                <Post
                  title={post.title}
                  label={post.label}
                  rawContent={post.rawContent}
                  points={post.points}
                  time={post.time}
                  authorName={post.authorName}
                  size='compact'
                  comments={post.comments}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;

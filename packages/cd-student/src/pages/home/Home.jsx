import { useState } from "react";
import {
  Button,
  ContextMenu,
  Footer,
  LeftSidebar,
  Post,
  SuggestionCard
} from "@cd/components";

// styles
import styles from "./home.module.scss";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya"
    },
    {
      title: "Lorem ipsum dolor sit amet?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya"
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.left_sidebar}>
        <LeftSidebar />
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

      <div className={styles.main_section}>
        <ContextMenu
          items={["Following", "Popularity", "New"]}
          handler={({ key }) => alert(`${key} clicked`)}
        >
          <span className={styles.sort_option}>Sort by: </span>
        </ContextMenu>
        <div className={styles.post_container}>
          {posts.length &&
            posts.map((post, idx) => (
              <div className={styles.post}>
                <Post
                  title={post.title}
                  label={post.label}
                  points={post.points}
                  rawContent={post.rawContent}
                  time={post.time}
                  totalComments={post.totalComments}
                  authorName={post.authorName}
                />
              </div>
            ))}
        </div>
      </div>

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
  );
};

export default Home;

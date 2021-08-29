import { useState } from "react";
import { ContextMenu, Post } from "@cd/components";

// styles
import styles from "./home.module.scss";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      title: "Lorem ipsum dolor sit amet 1?",
      label: "Question",
      rawContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus.Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.",
      points: "4723",
      time: "2 days ago",
      totalComments: "100+",
      authorName: "Pushpak Bhattacharya",
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
        },
        {
          author: "Rashi Gaikwad",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: "2021-08-28 4:50:23",
          replies: [
            {
              author: "Pushpak Bhattacharya",
              content:
                "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
              datetime: "2021-08-27 14:48:00"
            }
          ]
        },
        {
          author: "Pushpak Bhattacharya",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: "2021-08-29 12:02:12",
          replies: []
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
            }
          ]
        },
        {
          author: "Pushpak Bhattacharya",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: "2021-08-29 12:02:12"
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
      authorName: "Pushpak Bhattacharya",
      comments: [
        {
          author: "Sai Chaitanya",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          datetime: "2021-08-27 14:48:00"
        }
      ]
    }
  ]);

  const updatePosts = ({ key }) => {
    alert(`post update handler: ${key}`);
  };

  return (
    <>
      <div className={styles.main_section}>
        <ContextMenu
          items={["Following", "Popularity", "New"]}
          handler={updatePosts}
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
                  comments={post.comments}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

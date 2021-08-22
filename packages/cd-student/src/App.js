import "./App.css";
import {
  Button,
  Input,
  LeftSidebar,
  Post,
  SpaceDetails,
  SuggestionCard
} from "@cd/components";

function App() {
  return (
    <div>
      {/* Buttons */}
      {/* <Button text='Add a new post' type='add' />
      <Button text='Advice' type='label' />
      <Button
        text='Create'
        type='regular'
        // size='large'
        classes='test'
      />
      <Button text='Upload' type='skeleton' /> */}

      {/* Inputs */}
      {/* <Input size='small' placeholder='Option 1' />
      <Input size='medium' placeholder='Search posts or spaces...' />
      <Input size='large' placeholder='Post Title' /> */}

      {/* <LeftSidebar /> */}

      {/* <SpaceDetails
        name='Announcements'
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam.'
        numOfPosts={120}
        followers={542}
        numOfUsers={100}
        creatorName='Pushpak Bhattacharya'
        createdAt='1 month ago'
      /> */}

      <Post
        title='Lorem ipsum dolor sit amet?'
        label='Question'
        rawContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. 
        Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consequat lorem et nunc aliquet, et vestibulum risus mollis. Donec sed pulvinar turpis. Praesent eget lacus pellentesque, feugiat sapien quis, tincidunt ante. Integer tincidunt, dui a egestas luctus, lacus magna fermentum diam, ac fringilla eros ipsum sit amet risus. Vestibulum aliquet ante aliquam odio eleifend laoreet. Donec mattis posuere elit, vitae viverra felis ornare et. Suspendisse id accumsan nulla, ac porta lectus.'
        points='4723'
        time='2 days ago'
        totalComments='100+'
        authorName='Pushpak Bhattacharya'
      />

      {/* <SuggestionCard
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
      /> */}
    </div>
  );
}

export default App;

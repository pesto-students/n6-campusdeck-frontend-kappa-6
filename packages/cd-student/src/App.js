import "./App.css";
import { Button, Input } from "@cd/components";

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
      <Input size='small' placeholder='Option 1' />
      <Input size='medium' placeholder='Search posts or spaces...' />
      <Input size='large' placeholder='Post Title' />
    </div>
  );
}

export default App;

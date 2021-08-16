import "./App.css";
import { Button } from "@cd/components";

function App() {
  return (
    <div>
      <Button text='Add a new post' type='add' />
      <Button text='Advice' type='label' />
      <Button
        text='Create'
        type='regular'
        // size='large'
        classes='test'
      />
      <Button text='Upload' type='skeleton' />
    </div>
  );
}

export default App;

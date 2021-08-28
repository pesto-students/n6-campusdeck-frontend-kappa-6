import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Base from "./Base";

// styles
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          component={() => (
            <Base>
              <div>Hello, world</div>
            </Base>
          )}
          path='/'
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;

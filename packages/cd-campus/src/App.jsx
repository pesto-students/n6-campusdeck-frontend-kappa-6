import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Base from "./Base";

// pages
import Spaces from "./pages/spaces";

// styles
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route
          component={() => (
            <Base>
              <Spaces />
            </Base>
          )}
          path='/spaces'
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;

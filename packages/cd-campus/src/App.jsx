import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Base from "./Base";

// pages
import Spaces from "./pages/spaces";
import Students from "./pages/students";
import Login from "./pages/login";
import ContactUs from "./pages/contactUs";

// styles
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path='/login' exact />
        <Route component={ContactUs} path='/contact' exact />
        <Route
          component={() => (
            <Base>
              <Spaces />
            </Base>
          )}
          path='/spaces'
          exact
        />
        <Route
          component={() => (
            <Base>
              <Students />
            </Base>
          )}
          path='/students'
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;

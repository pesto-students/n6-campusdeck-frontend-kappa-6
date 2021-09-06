import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// styles
import "./App.scss";

// routes
import Home from "./pages/home";
import UserProfile from "./pages/userProfile";
import Base from "./Base";
import Login from "./pages/login";
import Register from "./pages/register";
import Space from "./pages/space";
import Explore from "./pages/explore";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Router>
      <Switch>
        <Route
          component={() => {
            return user ? (
              <Base>
                <Home />
              </Base>
            ) : (
              <Redirect to='/login' />
            );
          }}
          path='/'
          exact
        />
        <Route component={Login} path='/login' exact />
        <Route component={Register} path='/register' exact />
        <Route
          component={() => (
            <Base isSpacePage>
              <Space />
            </Base>
          )}
          path='/space/:id'
          exact
        />
        <Route
          component={() => (
            <Base>
              <UserProfile />
            </Base>
          )}
          path='/profile'
          exact
        />
        <Route
          component={() => (
            <Base>
              <Explore />
            </Base>
          )}
          path='/explore'
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;

import { Suspense, lazy } from "react";
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
import CreatePost from "./pages/createPost";
import Base from "./Base";

// lazy loading of pages
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

function App() {
  return (
    <Router>
      <Switch>
        {/* TODO: change to a proper loading fallback */}
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            component={() => (
              <Base>
                <Home />
              </Base>
            )}
            path='/'
            exact
          />
          <Route component={Login} path='/login' exact />
          <Route component={Register} path='/register' exact />
          <Route
            component={() => (
              <Base>
                <UserProfile />
              </Base>
            )}
            path='/profile'
            exact
          />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;

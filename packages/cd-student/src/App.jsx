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

// lazy loading of pages
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));

function App() {
  return (
    <Router>
      <Switch>
        {/* TODO: change to a proper loading fallback */}
        <Suspense fallback={<div>Loading...</div>}>
          <Route component={Home} path='/' exact />
          <Route component={Login} path='/login' exact />
          <Route component={Register} path='/register' exact />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;

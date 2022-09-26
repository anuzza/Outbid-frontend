import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import landing from "./containers/Landing/landing";
import login from "./containers/Auth/Login/login";
import signup from "./containers/Auth/Signup/signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" to="/landing" exact component={landing} />
          <Route path="/landing" exact component={landing}></Route>
          <Route path="/login" exact component={login}></Route>
          <Route path="/signup" exact component={signup}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

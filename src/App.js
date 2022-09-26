import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import landing from "./containers/Landing/landing";
import auth from "./containers/Auth/auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" to="/landing" exact component={landing} />
          <Route path="/landing" exact component={landing}></Route>
          <Route path="/auth" exact component={auth}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

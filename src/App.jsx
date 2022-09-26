import "./App.css";
import { Switch, Route } from "react-router-dom";
import landing from "./containers/Landing/landing";
import Auth from "./containers/Auth/auth";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact component={landing} />
        <Route path="/auth" exact component={Auth}></Route>
      </Switch>
    </div>
  );
}

export default App;

//#943d24

import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navigation user={user} />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route
          path="/auth"
          exact
          component={() => <Auth setUser={setUser} user={user} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;

//#943d24

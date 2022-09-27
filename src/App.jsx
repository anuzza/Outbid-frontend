import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const [user, setUser] = useState(null);

  return (
    <ToastProvider
      autoDismiss={true}
      autoDismissTimeout={2000}
      placement="top-center"
    >
      <div className="App">
        <Navigation user={user} setUser={setUser} />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route
            path="/auth"
            exact
            component={() => <Auth setUser={setUser} user={user} />}
          ></Route>
        </Switch>
      </div>
    </ToastProvider>
  );
}

export default App;

//#943d24

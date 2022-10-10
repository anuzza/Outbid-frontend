import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import Navigation from "./components/Navigation/Navigation";
import { ToastProvider } from "react-toast-notifications";
import Logout from "./components/Logout/Logout";

function App() {
  return (
    <ToastProvider
      autoDismiss={true}
      autoDismissTimeout={2000}
      placement="top-center"
    >
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/auth" exact component={() => <Auth />} />
          <Route path="/logout" exact component={() => <Logout />} />
        </Switch>
      </div>
    </ToastProvider>
  );
}

export default App;


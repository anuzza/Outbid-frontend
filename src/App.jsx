import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import ItemPost from "./containers/ItemPost/ItemPost";
import Navigation from "./components/Navigation/Navigation";
import { ToastProvider } from "react-toast-notifications";
import Logout from "./components/Logout/Logout";
import { setAuthToken } from "./utils/axios";
import useAuthStore from "./store/auth";
import PrivateRoute from "./components/Routing/UserRoute";
import MyItems from "./containers/MyItems/Mytems";
import MyBids from "./containers/MyBids/MyBids";
import MyProfile from "./containers/MyProfile/MyProfile";
import SavedItems from "./containers/Saved/SavedItems";
import ItemDetails from "./containers/ItemDetails/ItemDetails";
import { loadUser } from "./hooks/loadUser";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const { setUser, authStart, setError } = useAuthStore(
    ({ setUser, authStart, setError }) => ({
      setUser,
      setError,
      authStart,
    })
  );

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      authStart();
      loadUser(setUser, setError);
    }

    return () => {
      isCancelled = true;
    };
  }, [setError, authStart, setUser]);

  return (
    <ToastProvider
      autoDismiss={true}
      autoDismissTimeout={2000}
      placement="top-center"
    >
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Landing />} />
          <Route path="/auth" exact component={() => <Auth />} />
          <Route
            path="/item-details/:id"
            exact
            component={() => <ItemDetails />}
          />

          <PrivateRoute
            path="/items/new"
            exact
            component={() => <ItemPost />}
          />
          <PrivateRoute
            path="/items/edit/:id"
            exact
            component={() => <ItemPost />}
          />
          <PrivateRoute path="/my-items" exact component={() => <MyItems />} />
          <PrivateRoute path="/my-bids" exact component={() => <MyBids />} />
          <PrivateRoute
            path="/saved-items"
            exact
            component={() => <SavedItems />}
          />
          <PrivateRoute
            path="/my-profile"
            exact
            component={() => <MyProfile />}
          />

          <PrivateRoute path="/logout" exact component={() => <Logout />} />
        </Switch>
      </div>
    </ToastProvider>
  );
};

export default App;

import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Auth from "./containers/Auth/Auth";
import IteamPost from "./containers/IteamPost/IteamPost"
import Navigation from "./components/Navigation/Navigation";
import { ToastProvider } from "react-toast-notifications";
import Logout from "./components/Logout/Logout";
import { setAuthToken } from "./utils/axios";
import useAuthStore from "./store/auth";
import axios from "./utils/axios";
import { getError } from "./utils/error";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  const { setUser, setError } = useAuthStore(({ setUser, setError }) => ({
    setUser,
    setError,
  }));

  useEffect(() => {
    let isCancelled = false;
    const loadUser = async () => {
      try {
        const {
          data: { user, token },
        } = await axios.get("/users/me");
        setUser(user, token);
      } catch (error) {
        const err = getError(error);
        setError(err);
        console.log(err);
      }
    };
    if (!isCancelled) {
      loadUser();
    }

    return () => {
      isCancelled = true;
    };
  }, [setError, setUser]);

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
          <Route path="/Post" exact component={() => <IteamPost user={setUser} />} />
          <Route path="/auth" exact component={() => <Auth />} />
          <Route path="/logout" exact component={() => <Logout />} />
        </Switch>
      </div>
    </ToastProvider>
  );
};

export default App;

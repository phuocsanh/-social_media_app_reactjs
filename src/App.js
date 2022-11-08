import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import PageRender from "./PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import { refreshToken } from "./redux/actions/authAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import { useEffect } from "react";

function App() {
  const loading = useSelector((state) => state.appReducer.loading);
  const auth = useSelector((state) => state.authReducer.auth);
  console.log("🚀 ~ file: App.js ~ line 17 ~ App ~ auth", auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  const override = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <ToastContainer autoClose={1000} />
        <div className="loader">
          {loading && (
            <HashLoader
              color={"#77f8fc"}
              loading
              cssOverride={override}
              size={60}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
        <Header />

        <Route exact path={"/"} component={auth ? Home : Login} />
        <Route path="/register" component={Register} />
        <Route path={"/:page"} component={PageRender} />
        <Route path={"/:page/:id"} component={PageRender} />
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRouter(props) {
  console.log(
    "🚀 ~ file: PrivateRouter.jsx ~ line 5 ~ PrivateRouter ~ props",
    props
  );
  const firstLogin = localStorage.getItem("firstLogin");
  console.log(
    "🚀 ~ file: PrivateRouter.jsx ~ line 6 ~ PrivateRouter ~ firstLogin",
    firstLogin
  );
  return firstLogin ? <Route {...props} /> : <Redirect to="/" />;
}

export default PrivateRouter;

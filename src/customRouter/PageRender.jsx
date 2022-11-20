import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NotFound from "../components/notfound";
const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;
  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />;
  }
};
const PageRender = () => {
  const { page } = useParams();

  const auth = useSelector((state) => state.authReducer.auth);

  let pageName = "";
  if (auth?.token) {
    pageName = page;
  } else {
    if (page === "login" || page === "register") {
      pageName = page;
    } else {
      pageName = "";
    }
  }

  return generatePage(pageName);
};

export default PageRender;

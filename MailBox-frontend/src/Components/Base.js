import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Login from "./Authentication/Login/Login";
import SignUp from "./Authentication/SignUp/SignUp";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import MainContent from "./MainContent/MainContent";
import ReadMail from "./MainContent/ReadMail";

export default (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Switch>
        {isLoggedIn && (
          <>
            <Route path="/home">
              <MainContent />
            </Route>
            <Route path="/readMail">
              <ReadMail />
            </Route>
            <Route path="*" exact>
              <Redirect to="/home" />
            </Route>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="*" exact>
              <Redirect to="/login" />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
};

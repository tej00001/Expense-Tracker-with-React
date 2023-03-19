import React from "react";
import SinupPage from "./components/CredentialsPage/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/CredentialsPage/login";
import AfterLogin from "./components/AfterLogin";
import FirstPageDetails from "./components/FirstPage/FirstPage";
import CompleteProfile from "./components/CompleteProfilePage/CompleteProfile";
import VerifyDetails from "./components/verifyPage";
import { Redirect } from "react-router-dom";
import AddExpenseDetails from "./components/AddExpenses";
import AuthContext from "./components/Context/Auth-Context";


function App() {
 
  return (
    <Router>
      <FirstPageDetails />
      <Switch>
        <Route exact path="/Home">
          <Redirect to="/loginDetails" />
        </Route>
        <Route exact path="/SignupDetails">
          <SinupPage />
        </Route>
        <Route path="/loginDetails">
          <LoginPage />
        </Route>
        <Route path="/verify-email">
          <VerifyDetails />
        </Route>
        <Route exact path="/showHandler">
          <AfterLogin />
        </Route>
        <Route path="/AddExpenseDetails">
          <AddExpenseDetails />
        </Route>
         <Route exact path="/completeProfile">
          <CompleteProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

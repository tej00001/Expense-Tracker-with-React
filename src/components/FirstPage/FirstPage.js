import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./FirstPage.module.css";
import { useEffect, useContext } from "react";
import AuthContext from "../Context/Auth-Context";

const FirstPageDetails = () => {
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      variant="light"
      className="border border-white mt-2 "
    >
      <Navbar.Brand style={{ fontSize: "xx-large", marginLeft: "2rem" }}>
        ExpenseTracker App
      </Navbar.Brand>
      <Container className="justify-content-center ">
        <Nav>
          {!authCtx.isLoggedIn && (
            <>
              <NavLink to="/loginDetails" className={classes.login}>
                Login
              </NavLink>

              <NavLink to="/SignupDetails" className={classes.signup}>
                Sinup
              </NavLink>
            </>
          )}
          {authCtx.isLoggedIn && (
            <NavLink
              to="/Home"
              className={classes.font}
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;

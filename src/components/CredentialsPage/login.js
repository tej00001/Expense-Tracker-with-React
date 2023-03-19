import React, { useContext } from "react";
import classes from "./login.module.css";
import { Button, Form, Nav } from "react-bootstrap";
import { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../Context/Auth-Context";

const LoginPage = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [login, setLogin] = useState(false);

  const ForgotPasswordHandler = () => {
    alert("you may have received an email with reset link");
    console.log(emailInputRef.current.value);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDPoaT-0mC2-yFWGR52fJyNvc__l6fdMlI",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Login succesfullly");
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Email sent for reset password";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const FromSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setLogin(true);
    if (enteredEmail === "" || enteredPassword === "") {
      alert("Must fill both Email and Password");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPoaT-0mC2-yFWGR52fJyNvc__l6fdMlI",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Login succesfullly");
            alert("Login succesful");
            return res.json();
            //history.replace("/showHandler");
          } else {
            return res.json().then((data) => {
              // console.log(data);
              let errorMessage = "Authrntication filed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          authCtx.login(data.idToken);
          history.replace("/AddExpenseDetails");
          // history.push("/verify-email");
          // history.replace("/showHandler");
          // const userProfileIncomplete = true;

          // If user profile is incomplete, show a message to the user
          // if (userProfileIncomplete) {
          //   alert("Your profile is incomplete. Please update your profile.");
          //   // history.push("/completeProfile");
          // }
        })
        .catch((err) => {
          alert(err.message);
          setLogin(false);
        });
    }
  };

  return (
    <section className={classes.Look}>
      <h1>Login</h1>
      <Form onSubmit={FromSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" ref={emailInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <div>
          {!login ? (
            <Button variant="success pl-2" type="submit">
              Sign in
            </Button>
          ) : (
            <p style={{ color: "white" }}>Loading...</p>
          )}

          <Button
            onClick={ForgotPasswordHandler}
            style={{ color: "white", marginLeft: "1rem", padding: "0.1rem" }}
          >
            forgot password?
          </Button>
        </div>
        <Nav>
          <NavLink
            to={"/SignupDetails"}
            style={{ color: "white", paddingTop: "1rem" }}
          >
            Don't have an Account?
          </NavLink>
        </Nav>
      </Form>
    </section>
  );
};

export default LoginPage;

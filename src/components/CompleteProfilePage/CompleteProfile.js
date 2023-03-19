import React, { useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const CompleteProfile = () => {
  const name = useRef();
  const photoUrl = useRef();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDPoaT-0mC2-yFWGR52fJyNvc__l6fdMlI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Received the users details from the Firebase server");
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Updation failed filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data.users[0].displayName);
        console.log(data.users[0].photoUrl);
        name.current.value = data.users[0].displayName; //if we use useState then we write "setState"for functionality & for useRef we use this line for functionality.
        photoUrl.current.value = data.users[0].photoUrl;
        // console.log(data.displayName);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const UpdateHandler = (e) => {
    e.preventDefault();
    // Call Firebase API to update user details
    const enteredName = name.current.value;
    const enteredPhotoUrl = photoUrl.current.value;

    console.log(enteredName);
    console.log(enteredPhotoUrl);

    if (enteredName === "" || enteredPhotoUrl === "") {
      alert("please enter both full name and URL");
      return;
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDPoaT-0mC2-yFWGR52fJyNvc__l6fdMlI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            console.log("Sent succesful");
            alert("Update succesful");
            console.log(res);
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = "Updation failed filed!";
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
    }
  };

  return (
    <Form onSubmit={UpdateHandler} className="container mt-5">
      <h2 className="text-center text-white">Update profile</h2>
      <Form.Group controlId="formFullName">
        <Form.Label style={{ color: "white" }}>Full Name</Form.Label>
        <Form.Control type="text" ref={name} />
      </Form.Group>
      <Form.Group controlId="formPhotoUrl">
        <Form.Label style={{ color: "white" }}>Profile Photo URL</Form.Label>
        <Form.Control type="text" ref={photoUrl} />
      </Form.Group>
      <div className="text-center">
        <Button variant="success" type="submit" className="mt-2">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default CompleteProfile;

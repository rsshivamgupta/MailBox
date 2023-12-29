import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";

import "./SignUp.css";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { baseUrl } from "../../../Utils/utils";
import axios from "axios";

export default (props) => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const confPassRef = useRef();

  const history = useHistory();

  function formSubmitHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confPassword = confPassRef.current.value;

    if (confPassword !== password) {
      alert("Password don't match !");
      return;
    }

    const obj = {
      email: email,
      password: password,
    };

    axios
      .post(baseUrl + "user/signUp", obj)
      .then((result) => {
        if (result.status === 200) {
          alert("Signup successfull....");
          history.push("/login");
        } else {
          throw new Error(result.data.status);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  }

  return (
    <>
      <Container className="mt-5 shadow p-2 text-center container-style">
        <h2 className="pt-2 h1 fw-bold py-2">SignUp</h2>
        <hr />
        <center>
          <Form onSubmit={formSubmitHandler}>
            <FloatingLabel label="Email Address" className="mb-2 input-width">
              <FormControl
                ref={emailRef}
                size="sm"
                type="email"
                placeholder="Enter your name"
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Password" className="mb-2 input-width">
              <FormControl
                ref={passwordRef}
                size="sm"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FloatingLabel>{" "}
            <FloatingLabel
              label="Confirm Password"
              className="mb-2 input-width"
            >
              <FormControl
                ref={confPassRef}
                size="sm"
                type="password"
                placeholder="Enter your password"
                required
              />
            </FloatingLabel>
            <Button type="submit" className="input-width">
              Sign Up
            </Button>
          </Form>
          <hr />
          <Link to="/login" className="btn login-btn">
            Have an account? Login
          </Link>
        </center>
      </Container>
    </>
  );
};

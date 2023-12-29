import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";

import "./Login.css";

import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRef } from "react";
import axios from "axios";
import { baseUrl } from "../../../Utils/utils";
import { useDispatch } from "react-redux";
import authSlice from "../../../store/authSlice";
import { authAction } from "../../../store";

export default (props) => {
  const history = useHistory();
  const passwordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();

  function formSubmitHandler(event) {
    event.preventDefault();
    const obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post(baseUrl + "user/login", obj)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem("email", obj.email);
          localStorage.setItem("token", result.data.token);
          alert("Login successfull....");
          dispatch(authAction.login());
          history.push("/home");
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
        <h2 className="pt-2 h1 fw-bold py-2">Login</h2>
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
            <Button type="submit" className="input-width my-2">
              Login
            </Button>
            <br />
            <Link to="/forgetPassword">Forget Password</Link>
          </Form>
          <hr />
          <Link to="/signUp" className="btn login-btn">
            Don't have an account? Sign Up
          </Link>
        </center>
      </Container>
    </>
  );
};

import { EditorBlock, convertToRaw } from "draft-js";
import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "./MainContent.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef } from "react";
import axios from "axios";
import getTokenHeaders, { baseUrl } from "../../Utils/utils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authAction } from "../../store";
import "./Mailpage.css";

export default (props) => {
  const history = useHistory();
  const subjectRef = useRef();
  const toRef = useRef();

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleContentChange = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
   
    const contentRaw = convertToRaw(contentState);

    const obj = {
      to: toRef.current.value,
      subject: subjectRef.current.value,
      content: contentRaw,
    };
    const headers = getTokenHeaders();
    toRef.current.value = "";
    subjectRef.current.value = "";
    setEditorState(() => EditorState.createEmpty());
    axios
      .post(baseUrl + "mail/postMail", obj, { headers })
      .then((result) => {
        console.log("Mail Sent Successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 503) {
            history.push("/login");
            dispatch(authAction.logOut());
            alert("Session timeout");
          } else if (err.response.status === 500) {
            alert("Something went wrong");
          }
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleContentChange}>
        <Row>
          <FloatingLabel controlId="floatingInput" label="To" className="mb-3">
            <Form.Control
              type="email"
              ref={toRef}
              placeholder="name@example.com"
              required
            />
          </FloatingLabel>
        </Row>
        <Row>
          {" "}
          <FloatingLabel
            controlId="floatingInput"
            label="Subject"
            className="mb-3"
          >
            <Form.Control
              type="text"
              ref={subjectRef}
              placeholder="Subject"
              required
            />
          </FloatingLabel>
        </Row>
        <Row>
          <div
            className="form-group col-md-12 editor"
            style={{ maxHeight: 500, overflow: "auto" }}
          >
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperStyle={{
                backgroundColor: "#f0f0f0",
                marginBottom: "10px",
              }}
              required
            />
          </div>
        </Row>

        <Container className="d-flex justify-content-center">
          <Button type="submit">Send</Button>
        </Container>
      </Form>
    </Container>
  );
};

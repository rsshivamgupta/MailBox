import React, { useState } from "react";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const YourComponent = (props) => {
  const history = useHistory();

  const data = useSelector((state) => state.data.readEmailData);
  
  let rawContentFromServer = {};
  let initialEditorState = null;
  let fromEmail = "",
    subject = "";
  if (data) {
    fromEmail = data.fromEmail;
    subject = data.subject;
    rawContentFromServer = JSON.parse(data.body);
    initialEditorState = EditorState.createWithContent(
      convertFromRaw(rawContentFromServer)
    );
  } else {
    initialEditorState = () => EditorState.createEmpty();
  }

  // Convert raw content to EditorState

  const [editorState, setEditorState] = useState(initialEditorState);

  const handleContentChange = () => {
    const contentState = editorState.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    //console.log(contentRaw);
  };

  function handleBackClick(event) {
    event.preventDefault();
    history.push("/home");
  }

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col>
          <Button variant="primary" onClick={handleBackClick}>
            Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>Email Details</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>From:</strong> {fromEmail}
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>Subject:</strong> {subject}
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>Email Content:</strong>
        </Col>
      </Row>
      <Row>
        <Col>
          <Editor
            editorState={editorState}
            onEditorStateChange={(newEditorState) =>
              setEditorState(newEditorState)
            }
            readOnly
            wrapperStyle={{
              backgroundColor: "#f0f0f0",
              marginBottom: "10px",
            }}
            toolbarHidden
          />
        </Col>
      </Row>
    </Container>
  );
};

export default YourComponent;

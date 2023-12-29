import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./InboxPage.css";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../../store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import getTokenHeaders, { baseUrl } from "../../Utils/utils";
export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const inboxMail = useSelector((state) => state.data.inboxMail);
  const sentMail = useSelector((state) => state.data.sentMail);
  const item = props.item;
  let email = item.fromEmail;
  let isRead = item.read;
  if (!props.isInbox) {
    email = item.toEmail;
    isRead = true;
  }
  async function filterOut() {
    if (!isRead && props.isInbox) {
      let mid = 0;
      try {
        const newInboxMail = inboxMail.map((mitem) => {
          if (mitem.id === item.id) {
            const newItem = { ...mitem };
            newItem.read = true;
            mid = item.id;
            return newItem;
          }
          return mitem;
        });

        dispatch(dataAction.setInboxMail(newInboxMail));
        const headers = getTokenHeaders();

        const response = await axios.post(
          baseUrl + "mail/readMail",
          { id: mid },
          { headers }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  const subject = item.subject;

  function onEmailClick(event) {
    event.preventDefault();
    dispatch(dataAction.setReadEmailData(item));
    history.push("/readMail");
    filterOut();
  }
  async function onDeletEmail(event) {
    event.preventDefault();

    if (props.isInbox) {
      const newMail = inboxMail.filter((mitem) => mitem.id !== item.id);

      dispatch(dataAction.setInboxMail(newMail));
    } else {
      const newMail = sentMail.filter((mitem) => mitem.id !== item.id);
      dispatch(dataAction.setSentMail(newMail));
    }
    const headers = getTokenHeaders();
    try {
      const response = await axios.post(
        baseUrl + "mail/deleteMail",
        { id: item.id },
        { headers }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Row className="clickable-row mb-2">
      <Col md={3} className="flex" onClick={onEmailClick}>
        <h6 className="fst-bold" style={{ color: "blue" }}>
          {!isRead && "* "}
          {email}
        </h6>
      </Col>
      <Col>
        <h6 className="text-muted fst-italic">{subject}</h6>
      </Col>

      <Col md={1}>
        <Button variant="danger" onClick={onDeletEmail}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

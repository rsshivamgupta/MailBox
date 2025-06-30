import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import MailPage from "../MainContent/MailPage";
import InboxPage from "../MainContent/InboxPage";
import ReadMail from "../MainContent/ReadMail";
import { useDispatch, useSelector } from "react-redux";
import { dataAction } from "../../store";
import SentMail from "../MainContent/SentMail";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./Homeheader.css"

const HomeHeader = () => {
  //const [selectedTab, setSelectedTab] = useState("inbox");
  const dispatch = useDispatch();
  const unreadMails=useSelector(state=>state.data.inboxUnreadMail)

  const selectedTab = useSelector((state) => state.data.selectedTab);
  const handleTabClick = (tab) => {
    dispatch(dataAction.setSelectedTab(tab));
  };

  return (
    <Container className="mt-4">
      <Tab.Container id="mail-tabs" defaultActiveKey="inbox">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link
                  eventKey="inbox"
                  onClick={() => handleTabClick("inbox")}
                >
                  Inbox {` (${unreadMails})`}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="sent"
                  onClick={() => handleTabClick("sent")}
                >
                  Sent Mail
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="compose"
                  onClick={() => handleTabClick("compose")}
                >
                  Compose
                </Nav.Link>
              </Nav.Item>
              
            </Nav>
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="inbox">
                <InboxPage />
              </Tab.Pane>
              <Tab.Pane eventKey="sent">
                <SentMail />
              </Tab.Pane>
              <Tab.Pane eventKey="compose">
                <MailPage />
              </Tab.Pane>
              <Tab.Pane eventKey="email">
                <ReadMail />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <center>
        {" "}
        <h5 className="text-muted h5 fst-italic">This is an awsome message</h5>
      </center>
    </Container>
  );
};

export default HomeHeader;

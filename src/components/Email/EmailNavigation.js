import React, { Fragment, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import ComposeEmail from "./ComposeEmail";

const EmailNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  function handleClose() {
    setShowModal(false);
  }

  const handleOpen = () => {
    setShowModal(true);
  };

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  return (
    <Fragment>
      <Navbar expand="lg" variant="light" bg="light" className="p-0">
      <Button
            onClick={toggleNavigation}
            className="me-3"
            variant="outline-primary"
          >
            ☰
          </Button>
      <Navbar.Brand>
          
        </Navbar.Brand>
        <Navbar.Collapse>
          {showNavigation &&<Nav className={`gap-5 ${showNavigation ? "show" : ""}`}>
            <Nav.Link onClick={handleOpen}>Compose</Nav.Link>
            <Nav.Link>Inbox</Nav.Link>
            <Nav.Link>Sent</Nav.Link>
            <Nav.Link>Starred</Nav.Link>
          </Nav>}
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className={`content ${showNavigation ? "shift" : ""}`}>
        <div style={{ marginLeft: "20%" }}>
          {showModal && <ComposeEmail show={showModal} handleClose={handleClose} />}
        </div>
      </Container>
    </Fragment>
  );
};

export default EmailNavigation;

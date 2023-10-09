import { Container, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';
import { Fragment } from 'react';

const NavBar = () => {
  return (
    <Fragment>
      <Navbar expand="lg" className="bg-info w-100">
        <Container className='d-flex justify-content-around align-items-center'>
          <div className='mx-2 mx-lg-3'> {/* Reduce margin for smaller screens */}
            <Navbar.Brand>Mail-Box</Navbar.Brand>
          </div>

          <Link to="/home"> {/* Add Link to navigate to the home component */}
            <i className="bi bi-house-door mx-2 mx-lg-3" style={{ fontSize: '1.5rem', color: 'white' }}></i> {/* Reduce margin for smaller screens */}
          </Link>

          <Form className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button variant="outline-light">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
        </Container>
      </Navbar>
      <SideBar />
    </Fragment>
  );
}

export default NavBar;

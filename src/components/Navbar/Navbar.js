import {Container,Navbar,Nav,Button,Form,FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';
import { Fragment } from 'react';
const NavBar = () => {
    return ( 
        <Fragment>
          <Navbar expand="lg" className="bg-info w-100">
      <Container>
        <Navbar.Brand>Mail-Box</Navbar.Brand>
        
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-2" />
          <Button variant="outline-light">
            <i className="bi bi-search"></i> {/* Bootstrap Icons search icon */}
          </Button>
        </Form>
      </Container>
    </Navbar>
      <SideBar/>
        </Fragment>
     );
}
 
export default NavBar;
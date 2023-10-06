import {Container,Navbar,Nav,Button} from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
//  import ReorderIcon from '@mui/icons-material/Reorder';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
// import { Link } from 'react-router-dom/cjs/react-router-dom';
// import { Button } from 'react-bootstrap';
const NavBar = () => {
    const dispatch=useDispatch();

  // const handbleButtonicon=()=>{
  //   console.log('ddb')
  //   alert('fun')
  // }
  const logoutHandler=()=>{
    dispatch(authActions.logout())
    console.log('logout')
  }
    return ( 
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            {/* <ReorderIcon onClick={handbleButtonicon} />Mail-Box */}
Mail-Box
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
      
              <Nav.Link as={Link} to= '/'>Home</Nav.Link>
              <Nav.Link as={Link} to="/inbox">Inbox</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Button onClick={logoutHandler} variant="warning">Logout</Button>
        {/* <AccountCircleIcon src="sharpne.jpg" onClick={logoutHandler} /> */}
      </Navbar>
     );
}
 
export default NavBar;
import React from 'react';
import { Navbar, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/uiSlice'; // Import the toggleSidebar action
import { Fragment } from 'react';
import SideBar from './Sidebar';

const NavBar = () => {
  const isSidebarCollapsed = useSelector((state) => state.ui.isSidebarCollapsed);
  const dispatch = useDispatch();

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar()); // Dispatch the action to toggle the Sidebar
  };

  return (
    <Fragment>
      <Navbar expand="lg" className="bg-info">
        <Container
          className="d-flex justify-content-between align-items-center w-100"
          style={{ paddingLeft: 0, paddingRight: 0 }} // Set padding to 0 to take 100% width
        >
          <Button
            className={`btn btn-primary rounded mx-1 p-1`} // Rounded button
            style={{ zIndex: '10' }}
            onClick={toggleSidebarHandler}
          >
            <i className={`bi bi-chevron-${isSidebarCollapsed ? 'right' : 'left'}`}></i>
          </Button>

          <div className="rounded p-1 bg-white d-flex align-items-center search-bar">
            <FormControl
              type="text"
              placeholder="Search"
              className="border-0 custom-form-control"
              aria-label="Search"
              style={{ boxShadow: 'none', borderColor: 'rgba(0, 0, 0, 0.125)' }}
            />
            <Button
              variant="light"
              className="search-icon"
              style={{ border: 'none', background: 'transparent', padding: '0' }}
            >
              <i className="bi bi-search p-1 mx-1 lg-2"></i>
            </Button>
          </div>

          <Link to="/home" className="text-white"> {/* Added margin and align-items */}
            <i className="bi bi-house mx-2 mx-lg-3" style={{ fontSize: '1.5rem' }}></i>
          </Link>
        </Container>
      </Navbar>
      <SideBar />
    </Fragment>
  );
};

export default NavBar;

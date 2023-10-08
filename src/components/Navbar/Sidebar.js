import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { authActions } from '../../store/authSlice';
import Inbox from '../Email/Inbox';
import Sent from '../Email/Sent';
import Draft from '../Email/Draft';
import ComposeEmail from '../Email/ComposeEmail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeFolder, setActiveFolder] = useState('inbox');

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function LogoutHandler() {
    dispatch(authActions.logout());
  }

  const toggleFolder = folderName => {
    setActiveFolder(folderName);
  };

  return (
    <div>
      {isLoggedIn && (
        <div className={`d-flex`}>
          {/* Toggle button for sidebar */}
          <button
            className={`btn btn-primary position-absolute top-0 start-0`}
            style={{ zIndex: '1', marginTop: '10px', marginLeft: '10px', width: '40px' }}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <i className={`bi bi-chevron-${isSidebarCollapsed ? 'right' : 'left'}`}></i>
          </button>
          <div
            className={`vh-100 bg-dark ${isSidebarCollapsed ? 'd-none' : ''}`}
            style={{minWidth: '200px', maxWidth: '10%' }}
          >
            <ul className="p-2">
              <Container fluid>
                {showModal && <ComposeEmail show={showModal} handleClose={() => setShowModal(false)} />}
              </Container>
              <Button
                onClick={() => setShowModal(true)}
                variant="light"
                className="nav-link px-2"
                style={{ fontWeight: 'bold', borderRadius: '4px' }}
              >
                <i className="bi bi-send">
                  <span className="d-none d-sm-inline">Compose</span>
                </i>
              </Button>
              {['inbox', 'sent', 'draft'].map(folderName => (
                <a
                  key={folderName}
                  className={`nav-link px-2 ${activeFolder === folderName ? 'active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                  onClick={() => toggleFolder(folderName)}
                >
                  <i className={`bi bi-${folderName === 'inbox' ? 'inbox' : folderName === 'sent' ? 'box-arrow-up-right' : 'floppy'}`}>
                    <span className="ms-1 d-none d-sm-inline">{folderName.charAt(0).toUpperCase() + folderName.slice(1)}</span>
                  </i>
                </a>
              ))}
              <a
                className={`nav-link px-2`}
                style={{
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                onClick={LogoutHandler}
              >
                <i className={`bi bi-box-arrow-right`}>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </i>
              </a>
            </ul>
          </div>
          <div className='flex-grow-1'>
            {activeFolder === 'inbox' && <Inbox />}
            {activeFolder === 'sent' && <Sent />}
            {activeFolder === 'draft' && <Draft />}
            {/* Add similar conditions for other folders */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;

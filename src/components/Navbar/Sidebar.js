import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { authActions } from '../../store/authSlice';
import { setShowModal, setActiveFolder } from '../../store/uiSlice'; // Import Redux actions
import Inbox from '../Email/Inbox';
import Sent from '../Email/Sent';
import Draft from '../Email/Draft';
import ComposeEmail from '../Email/ComposeEmail';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useMailAPI from '../utils/useMail';
import { useEffect } from 'react';
// import { useEffect } from 'react';

const SideBar = () => {
  const isSidebarCollapsed = useSelector((state) => state.ui.isSidebarCollapsed);
  const showModal = useSelector((state) => state.ui.showModal);
  const activeFolder = useSelector((state) => state.ui.activeFolder);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history=useHistory();

  const inboxEmails = useSelector((state)=>state.email.inboxEmails);
  
  const sentEmails=useSelector((state)=>state.email.sentEmails);
  console.log(inboxEmails);
  console.log(sentEmails);
    const unreadCount = inboxEmails.reduce((count, email) => {
      if (!email.read) {
        return count + 1;
      }
      return count;
    }, 0);

    const sendCount = sentEmails.length;
  function LogoutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('endpoint')
    dispatch(authActions.logout());
    history.replace('/login')
  }

  const toggleFolder = (folderName) => {
    dispatch(setActiveFolder(folderName)); // Dispatch the action to update activeFolder
  };

  const toggleModal = () => {
    dispatch(setShowModal(!showModal)); // Dispatch the action to toggle showModal
  };

  return (
    <div>
      {isLoggedIn && (
        <div className={`d-flex`}>
          <div
            className={`vh-100 bg-dark ${isSidebarCollapsed ? 'd-none' : ''}`}
            style={{
              minWidth: '200px',
              maxWidth: '200px',
              overflow: 'hidden',
              [`${isSidebarCollapsed ? 'd-none' : ''}`]: true,
            }}
          >
            <ul className="p-1">
              <Container fluid>
                <div className='flex-grow-1 my-2 p-2'>
                  <h3 className='text-white'>Re-Mail</h3>
                </div>

                {showModal && <ComposeEmail show={showModal} handleClose={toggleModal} />}

                <Button
                  onClick={toggleModal}
                  variant="light"
                  className="nav-link px-2 w-100 "
                  style={{ fontWeight: 'bold', borderRadius: '4px', maxWidth: '100%' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-sm-inline">Compose</span>
                    <i className="bi bi-send ms-2"></i>
                  </div>
                </Button>

                {['inbox', 'sent', 'draft'].map(folderName => (
                  <a
                    key={folderName}
                    className={`nav-link px-2  ${activeFolder === folderName ? 'active' : ''} w-100 d-flex justify-content-between align-items-center`}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '4px',
                      maxWidth: '100%',
                    }}
                    onClick={() => toggleFolder(folderName)}
                  >
                    <i
                      className={`bi bi-${folderName === 'inbox' ? 'inbox' : folderName === 'sent' ? 'box-arrow-up-right' : 'floppy'} ms-1`}
                      style={{ order: 2 }}
                    ></i>
                    
                    <span className="d-sm-inline me-1" style={{ order: 1 }}>
                      {folderName.charAt(0).toUpperCase() + folderName.slice(1)}
                    </span>
                    {folderName === 'inbox' && (
                      <span style={{ order: 4 }} className="text-white bg-info rounded circle p-1">{unreadCount}+new</span>
                    )}
                    {folderName === 'sent' && (
                      <span style={{ order: 4 }} className="text-white bg-info rounded circle p-1">{sendCount}++</span>
                    )}
                    {folderName === 'draft' && (
                      <span style={{ order: 4 }} className="text-white bg-info rounded circle p-1">1+new</span>
                    )}
                  </a>
                ))}
                <a
                  className={`nav-link px-1 w-100 d-flex justify-content-between`}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '4px',
                    maxWidth: '100%',
                    alignItems: 'center', // To vertically center the content
                  }}
                  onClick={LogoutHandler}
                >
                  <span className="ms-1 text-danger d-sm-inline">Logout</span>
                  <i className={`bi bi-box-arrow-right`}></i>
                </a>
              </Container>
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

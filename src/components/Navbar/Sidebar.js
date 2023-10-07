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

const customStyles = {
    navLink: {
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        borderRadius: '4px', // Consistent border radius value
    },
    activeNavLink: {
        backgroundColor: '#fff',
        border: '2px solid red',
        borderRadius:'4px',
        color: '#007bff',
    },
};

const FolderLink = ({ folderName, activeFolder, onClick }) => (
    <a
        className={`nav-link px-2 ${activeFolder === folderName ? 'active' : ''}`}
        style={activeFolder === folderName ? customStyles.activeNavLink : customStyles.navLink}
        onClick={() => onClick(folderName)}
    >
        <i className={`bi bi-${folderName === 'inbox' ? 'inbox' : folderName === 'sent' ? 'box-arrow-up-right' : 'floppy'}`}>
            <span className='ms-1 d-none d-sm-inline'>{folderName.charAt(0).toUpperCase() + folderName.slice(1)}</span>
        </i>
    </a>
);

const SideBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeFolder, setActiveFolder] = useState('inbox');

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    function LogoutHandler() {
        dispatch(authActions.logout());
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const handleModal = () => {
        setShowModal(true);
    };

    const toggleFolder = folderName => {
        setActiveFolder(folderName);
    };

    return (
        <div className="container-fluid">
            {isLoggedIn && (
                <div className="row">
                    <div className={`col-auto min-vh-100 bg-dark`}>
                        <ul className='p-2'>
                            <li>
                                <Container fluid style={{ marginLeft: '20%' }}>
                                    {showModal && <ComposeEmail show={showModal} handleClose={handleClose} />}
                                </Container>
                            </li>
                            <li>
                                
                                <Button
                                    onClick={handleModal}
                                    variant='light'
                                    className='nav-link px-2'
                                    style={{ backgroundColor: '#007bff', color: '#fff', fontWeight: 'bold', borderRadius: '4px' }}
                                >
                                    <i className='bi bi-send'>
                                        <span className=' d-none d-sm-inline'>Compose</span>
                                    </i>
                                </Button>
                            </li>
                            <li>
                                <FolderLink folderName="inbox" activeFolder={activeFolder} onClick={toggleFolder} />
                            </li>
                            <li>
                                <FolderLink folderName="sent" activeFolder={activeFolder} onClick={toggleFolder} />
                            </li>
                            <li>
                                <FolderLink folderName="draft" activeFolder={activeFolder} onClick={toggleFolder} />
                            </li>
                            {/* Add links for other folders */}
                            <li>
                                <a
                                    className='nav-link px-2'
                                    style={customStyles.navLink}
                                    onClick={LogoutHandler}
                                >
                                    <i className='bi bi-box-arrow-right'>
                                        <span className='ms-1 d-none d-sm-inline'>Logout</span>
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
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

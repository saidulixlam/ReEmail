import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItems'; // Assuming you have an EmailItem component
import EmailView from './EmailView'; // Assuming you have an EmailView component
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions, emailSlice } from '../../store/emailSlice';

const Sent = () => {
  const endpoint = localStorage.getItem('endpoint');
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

  const dispatch = useDispatch();
  const emails = useSelector((state)=>state.email.emails);
 
  const [selectedEmail, setSelectedEmail] = useState(null); // State to track selected email
  const [showEmailView, setShowEmailView] = useState(false); // State to control the visibility of the EmailView modal
  
  
    // Call the fetchData function when needed
  
  // Function to handle clicking on an email item
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailView(true); // Show the EmailView modal
  };

  // Function to close the EmailView modal
  const handleCloseEmailView = () => {
    setShowEmailView(false);
    setSelectedEmail(null);
  };

  return (
    <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {/* Conditionally render Inbox or EmailView based on showEmailView */}
  {showEmailView &&
    <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}
  
  {!showEmailView && <Fragment>
    {/* Your inbox content goes here */}
    
    {emails.map((email, index) => (
      <EmailItem
        key={index}
        email={email}
        onClick={() => handleEmailClick(email)}
      />
    ))}
  </Fragment>}
</div>
  );
};

export default Sent;

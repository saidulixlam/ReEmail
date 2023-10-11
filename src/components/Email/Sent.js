import React, {useState } from 'react';
import EmailItem from './EmailItems'; // Assuming you have an EmailItem component
import { Fragment } from 'react';
import {useSelector } from 'react-redux';

import SentView from './SentView';

const Sent = () => {
  const emails = useSelector((state)=>state.email.emails);
 console.log(emails);
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
console.log(emails);
  return (
    <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {/* Conditionally render Inbox or EmailView based on showEmailView */}
  {showEmailView &&
    <SentView email={selectedEmail} onClose={handleCloseEmailView} />}
  
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
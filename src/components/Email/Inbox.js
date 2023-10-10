import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItems'; // Assuming you have an EmailItem component
import EmailView from './EmailView'; // Assuming you have an EmailView component
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap modal component
import { Fragment } from 'react';

const Inbox = () => {
  const endpoint = localStorage.getItem('endpoint');
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

  // Define emailArray as a state variable
  const [emailArray, setEmailArray] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null); // State to track selected email
  const [showEmailView, setShowEmailView] = useState(false); // State to control the visibility of the EmailView modal
  console.log('Am i rendering');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/sent/${endpoint}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json(); // Parse response JSON
          console.log('Data retrieved successfully:', responseData);
          const newArray = Object.values(responseData);

          // Update the emailArray state with the retrieved data
          setEmailArray(newArray);
        } else {
          console.error('Failed to retrieve data.');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    // Call the fetchData function when needed
    fetchData();
  }, [endpoint]); // Make sure to include endpoint in the dependency array

  // Function to handle clicking on an email item
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailView(true); // Show the EmailView modal
    console.log('email clikc');
  };

  // Function to close the EmailView modal
  const handleCloseEmailView = () => {
    setShowEmailView(false);
    setSelectedEmail(null);
    console.log('emailClose clikc');
  };

  return (
    <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {/* Conditionally render Inbox or EmailView based on showEmailView */}
  {showEmailView &&
    <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}
  
  {!showEmailView && <Fragment>
    {/* Your inbox content goes here */}
    
    {emailArray.map((email, index) => (
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

export default Inbox;

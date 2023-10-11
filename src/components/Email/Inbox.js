import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItems'; // Assuming you have an EmailItem component
import EmailView from './EmailView'; // Assuming you have an EmailView component
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions, emailSlice } from '../../store/emailSlice';

const Inbox = () => {
  const endpoint = localStorage.getItem('endpoint');
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

  const dispatch = useDispatch();
  const emails = useSelector((state)=>state.email.emails);

  const [selectedEmail, setSelectedEmail] = useState(null); // State to track selected email
  const [showEmailView, setShowEmailView] = useState(false); // State to control the visibility of the EmailView modal
  
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
          // console.log('Data retrieved successfully:', responseData);
        
          // Iterate through the response data and assign unique keys
          const newDataWithKeys = {};
          Object.keys(responseData).forEach((key) => {
            newDataWithKeys[key] = responseData[key];
            newDataWithKeys[key].id = key; // Add a unique 'id' property to each data item
          });
        
          // Convert the modified data back to an array
          const newArray = Object.values(newDataWithKeys);
        
          // Update the emailArray state with the retrieved data
          dispatch(emailActions.setEmails(newArray))
          // setEmailArray(newArray);
        } else {
          console.error('Failed to retrieve data.');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    // Call the fetchData function when needed
    fetchData();
  }, []);
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

export default Inbox;

import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItems';
import EmailView from './EmailView';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';

const Inbox = () => {
  const endpoint = localStorage.getItem('endpoint');
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';

  const dispatch = useDispatch();
  const emails = useSelector((state) => state.email.emails);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailView, setShowEmailView] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // State to store the unread email count

  const fetchDataAndUpdateStore = async () => {
    try {
      const response = await fetch(`${url}/sent/${endpoint}.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        const newDataWithKeys = {};
        Object.keys(responseData).forEach((key) => {
          newDataWithKeys[key] = responseData[key];
          newDataWithKeys[key].id = key;
        });

        const newArray = Object.values(newDataWithKeys);

        dispatch(emailActions.setEmails(newArray));

        // Calculate the unread email count
        const newUnreadCount = newArray.reduce((count, email) => {
          return !email.read ? count + 1 : count;
        }, 0);

        setUnreadCount(newUnreadCount);
      } else {
        console.error('Failed to retrieve data.');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateStore();

    const intervalId = setInterval(() => {
      fetchDataAndUpdateStore();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailView(true);
  };

  const handleCloseEmailView = () => {
    setShowEmailView(false);
    setSelectedEmail(null);
  };

  return (
    <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <div className="d-flex justify-content-between">
        <h3>Inbox</h3>
        <div>Unread: {unreadCount}</div>
      </div>
      {showEmailView && <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}

      {!showEmailView && (
        <Fragment>
          {emails.map((email, index) => (
            <EmailItem key={index} email={email} onClick={() => handleEmailClick(email)} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Inbox;

import React, { useEffect, useState } from 'react';
import EmailItem from './EmailItems';
import EmailView from './EmailView';
import { Fragment } from 'react';
import useMailAPI from '../utils/useMail';

const Inbox = () => {
  const emailItems = useMailAPI('inbox');

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailView, setShowEmailView] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      emailItems.fetchDataAndUpdateStore();
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
      </div>
      {showEmailView && <EmailView email={selectedEmail} onClose={handleCloseEmailView} />}

      {!showEmailView && (
        <Fragment>
          {emailItems.mailData.map((email, index) => (
            <EmailItem key={index} email={email} onClick={() => handleEmailClick(email)} />
          )
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Inbox;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SentView from './SentView';
// import useMailAPI from '../utils/useMail';
import SentItems from './SentItems';
// import { useEffect } from 'react';

const Sent = () => {
  const sentEmails = useSelector((state) => state.email.sentEmails);
  

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailView, setShowEmailView] = useState(false);
  
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setShowEmailView(true);
  };

  // const sent = useMailAPI('sent');
  // useEffect(() => {
  //   sent.fetchDataAndUpdateStore();
  //   // }, 2000);

  //   // return () => {
  //   //   clearInterval(intervalId);
  //   // };
  // }, []);

  const handleCloseEmailView = () => {
    setShowEmailView(false);
    setSelectedEmail(null);
  };

  return (
    <div className='mx-1 my-1 p-1' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <div className="d-flex justify-content-between">
        <h3>Sent</h3>
      </div>
      {showEmailView && <SentView email={selectedEmail} onClose={handleCloseEmailView} />}

      {!showEmailView && (
        <>
          {sentEmails.map((email) => (
            <SentItems
              key={email.id}
              email={email}
              onClick={() => handleEmailClick(email)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Sent;

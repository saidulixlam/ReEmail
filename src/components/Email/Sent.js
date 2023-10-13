import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SentView from './SentView';
import useMailAPI from '../utils/useMail';
import SentItems from './SentItems';

const Sent = () => {
  const sentEmails = useSelector((state) => state.email.sentEmails);
  const sent = useMailAPI('sent');

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showEmailView, setShowEmailView] = useState(false);

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

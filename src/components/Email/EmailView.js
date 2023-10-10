import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const EmailView = (props) => {
  const location = useLocation();
  const emailData = location.state.emailData; // Access the email data from the location state
  const history = useHistory();

  // Function to handle closing the modal
  const handleCloseModal = () => {

    // You can use the history object to navigate back to the inbox or any other route
    history.goBack(); // This will navigate back to the previous route (inbox)
    props.onClose();
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Email Subject: {emailData.subject}</h2>
        <button className="btn btn-danger" onClick={handleCloseModal}>
          x
        </button>
      </div>
      <p>To: {emailData.to}</p>
      <p>Body: {emailData.body}</p>
      <p>Time: {emailData.time}</p>
      {/* Add more content as needed */}
    </div>
  );
};

export default EmailView;

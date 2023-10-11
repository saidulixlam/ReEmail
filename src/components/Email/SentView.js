import React from 'react';
// import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
// import { emailActions } from '../../store/emailSlice';
import { Button, Container } from 'react-bootstrap';

const SentView = (props) => {
  const location = useLocation();
  const emailData = location.state.emailData; // Access the email data from the location state
 

  const timeParts = emailData.time.split(' ');

  const datePart = timeParts[0];

  const date = new Date(datePart);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const day = date.getDate();
  const month = date.getMonth(); // Returns a zero-based index (0 for January, 1 for February, etc.)
 
  const formattedMonth = monthNames[month];
  const formattedDate = ` ${day} ${formattedMonth}`;

  const history = useHistory();
 


  // Function to handle closing the modal
  const handleCloseModal = () => {
    // You can use the history object to navigate back to the inbox or any other route
    history.goBack(); // This will navigate back to the previous route (inbox)
    props.onClose();
  };
console.log(emailData);
  return (
    <Container className="mt-4">
      <button className="btn btn-info my-2" onClick={handleCloseModal}>
        <i className='bi bi-arrow-left'></i>
      </button>
      <div className="bg -light shadow rounded p-2 my-2 d-flex justify-content-between align-items-center">
        <h3 className='text-bold'><strong>{emailData.subject}</strong></h3>
        <i className='bi bi-star mx-2'></i>
      </div>

      <div className="d-flex justify-content-between align-items-center my-5">
        <i className="bi bi-person-circle" style={{ fontSize: '3rem' }}></i>
        <div>
          <div className="d-flex">
            <p><strong>{emailData.sender}</strong>&nbsp;</p>
            <span className='text-muted'>&nbsp;{formattedDate}</span>
          </div>
          <p className="text-muted">to {emailData.to}</p>
        </div>
        <i className='bi bi-reply mx-2' style={{ fontSize: '2rem' }}></i>
        <i className="bi bi-three-dots-vertical" style={{ fontSize: '2rem' }} ></i> {/* style={{ fontSize: '3rem' }} */}
      </div>

      <Container className=" rounded p-2 my-5 d-flex justify-content-between align-items-center">
        <h5><strong>{emailData.body}</strong></h5>
      </Container>

      <div className='d-flex justify-content-between align-items-center my-5 py-5 mx-2'>
        <Button variant='dark rounded'>
          <i className='bi bi-reply mx-2'></i>
          <span>Reply</span>
        </Button>
        <Button variant='dark rounded'>
          <i className='bi bi-reply-all mx-2'></i>
          <span>Reply All</span>
        </Button>
        <Button variant='dark rounded'>
          <i className='bi bi-forward mx-2'></i>
          <span>Forward</span>
        </Button>
      </div>

    </Container>
  );
};

export default SentView;

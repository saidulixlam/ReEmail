import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { emailActions } from '../../store/emailSlice';
import { Button, Container } from 'react-bootstrap';

const EmailView = (props) => {
  const location = useLocation();
  const emailData = location.state.emailData; // Access the email data from the location state
  const key = emailData.id;
  const endpoint = localStorage.getItem('endpoint');

  const userEmail = localStorage.getItem('email')

  const timeParts = emailData.time.split(' - ');
  const datePart = timeParts[0]; // Assuming date is in the format "DD/MM/YYYY"
  // Split the date string into day, month, and year
  const [day, month, year] = datePart.split('/').map(Number);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedMonth = monthNames[month - 1]; // Adjust for 0-based month
  const formattedDate = `${day} ${formattedMonth} ${year}`;

  const history = useHistory();
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';
  const updatedData = { ...emailData, read: true };
  const dispatch = useDispatch();

  async function update() {
    try {
      const response = await fetch(`${url}/inbox/${endpoint}/${key}.json`, {
        method: 'PUT', // or 'PATCH' depending on your API's requirements
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        // The item was successfully updated
        console.log(`Item at ${endpoint} updated successfully.`);
        dispatch(emailActions.markEmailAsRead(key))
      } else {
        // Handle the error here
        console.error(`Error updating item at ${endpoint}:`, response.status, response.statusText);
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  console.log(emailData);
  // Function to handle closing the modal
  const handleCloseModal = () => {
    // You can use the history object to navigate back to the inbox or any other route
    history.goBack(); // This will navigate back to the previous route (inbox)
    props.onClose();
    update();
  };

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
            <p><span className='text-muted'>From&nbsp;</span><strong>{emailData.sender}</strong>&nbsp;</p>
            <span className='text-muted'>&nbsp;{formattedDate}</span>
          </div>
          <p className="text-muted">to {userEmail}</p>
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

export default EmailView;
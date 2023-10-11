import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailActions } from '../../store/emailSlice';
const unreadDotStyle = {
  width: '15px',
  height: '15px',
  backgroundColor: 'blue',
  borderRadius: '50%',
  display: 'inline-block',
  marginLeft: '5px', // Adjust as needed
};

const EmailItem = ({ email, onClick }) => {
  const url = 'https://remail-341c0-default-rtdb.firebaseio.com';
  const dispatch = useDispatch();
  const key = email.id;

  const deleteHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();


    const endpoint = localStorage.getItem('endpoint');

    try {
      const response = await fetch(`${url}/sent/${endpoint}/${key}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json(); // You can extract and log the response data

        dispatch(emailActions.deleteEmail(key));
        // If you need to perform any additional actions, you can do so here
      } else {
        throw new Error('Failed to delete the email. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Error deleting email:', error.message);
      // You can display an error message to the user or handle the error as needed.
    }
  };

  //individual item displaying
  const handleItemClick = () => {
    onClick(email); // Call the onClick function with the email as a parameter
    console.log('am i runing emailitem ');
  };
  console.log(email);
  return (
    <Link
      to={{
        pathname: `/email/${email.subject}`,
        state: { emailData: email }
      }}
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={handleItemClick} // Call the handleItemClick function when the link is clicked
    >
      <Card className="email-item">
        <Card.Body >
          <div className="d-flex justify-content-between align-items-center">
            {!email.read && <span style={unreadDotStyle}></span>}
            {/* <input type="checkbox" className="mr-2" /> */}
            <Card.Title className="mb-0">{email.to}</Card.Title>
            <Card.Title className="mb-2">{email.subject}</Card.Title>

            <small className="text-muted">

              {email.time}

            </small>
            <i className="bi bi-trash3" onClick={deleteHandler}></i>
          </div>
          <Card.Text>{email.snippet}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EmailItem;
import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emailActions } from '../../store/emailSlice';

const SentItems = ({ email, onClick }) => {
  const url = 'https://shoppy-8c801-default-rtdb.firebaseio.com';
  const dispatch = useDispatch();
  const key = email.id;
  const endpoint = localStorage.getItem('endpoint');

  const deleteEmail = async () => {
    try {
      const response = await fetch(`${url}/sent/${endpoint}/${key}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch(emailActions.deleteEmail(key));
      } else {
        throw new Error('Failed to delete the email. Status: ' + response.status);
      }
    } catch (error) {
      console.error('Error deleting email:', error.message);
      // You can display an error message to the user or handle the error as needed.
    }
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteEmail();
  };

  const handleItemClick = () => {
    onClick(email);
  };

  return (
    <Link
      to={{
        pathname: `/sent/${email.id}`,
        state: { emailData: email }
      }}
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={handleItemClick}
    >
      <Card className="email-item">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="mb-0"><span className="text-muted">To : </span>{email.to}</Card.Title>
            <Card.Title className="mb-2">{email.subject}</Card.Title>
            <small className="text-muted">{email.time}</small>
            <i className="bi bi-trash3" onClick={handleDeleteClick}></i>
          </div>
          <Card.Text>{email.snippet}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SentItems;

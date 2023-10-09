import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const EmailItem = ({ email, onClick }) => {
  const handleItemClick = () => {
    onClick(email); // Call the onClick function with the email as a parameter
  };

  return (
    <Link
      to={{
        pathname: `/email/${email.subject}`,
        state: { emailData: email }
      }}
      style={{ textDecoration: 'none' }}
      onClick={handleItemClick} // Call the handleItemClick function when the link is clicked
    >
      <Card className="email-item">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <input type="checkbox" className="mr-2" />
          <Card.Title>{email.to}</Card.Title>
          <Card.Title>{email.subject}</Card.Title>
          <Card.Text>{email.body}</Card.Text>
          <span className="email-date mr-3">{email.time}</span>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EmailItem;

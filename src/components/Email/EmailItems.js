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
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={handleItemClick} // Call the handleItemClick function when the link is clicked
    >
      <Card className="email-item">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            
              <input type="checkbox" className="mr-2" />
              <Card.Title className="mb-0">{email.to}</Card.Title>
              <Card.Title className="mb-2">{email.subject}</Card.Title>
            
              <small className="text-muted">{email.time}</small>
            
          </div>
          
          <Card.Text>{email.snippet}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EmailItem;

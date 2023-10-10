import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const unreadDotStyle = {
  width: '15px',
  height: '15px',
  backgroundColor: 'blue',
  borderRadius: '50%',
  display: 'inline-block',
  marginLeft: '5px', // Adjust as needed
};

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
        <Card.Body className="">
          <div className="d-flex justify-content-between align-items-center">
            {!email.read && <span style={unreadDotStyle}></span>}
            {/* <input type="checkbox" className="mr-2" /> */}
            <Card.Title className="mb-0">{email.to}</Card.Title>
            <Card.Title className="mb-2">{email.subject}</Card.Title>

            <small className="text-muted">

              {email.time}

            </small>
          </div>
          <Card.Text>{email.snippet}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EmailItem;

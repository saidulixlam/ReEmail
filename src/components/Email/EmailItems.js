import React from 'react';
import Card from 'react-bootstrap/Card';

const EmailItem = ({ email }) => {
  return (
    <Card className="email-item">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <input type="checkbox" className="mr-2" />
          <Card.Title>{email.to}</Card.Title>
        </div>
        <div className="flex-grow-1">
          <Card.Title>{email.subject}</Card.Title>
          <Card.Text>{email.body}</Card.Text>
        </div>
        <span className="email-date mr-3">{email.time}</span>
      </Card.Body>
    </Card>
  );
};

export default EmailItem;

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Card style={{ width: '42rem' }}>
      <Card.Body>
        <Card.Title>Images Gallery</Card.Title>
        <Card.Text>This APP uses Unsplash API to fetch images</Card.Text>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Welcome;

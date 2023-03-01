import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'lightblue',
};

const Header = ({ title }) => {
  // const { title } = props
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '20rem', maxHeight: '2rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;

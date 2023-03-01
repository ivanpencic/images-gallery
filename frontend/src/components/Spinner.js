import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const spinerStyle = {
  position: 'absolute',
  top: 'calc(50% - 1rem)',
  left: 'calc(50% - 1rem)',
};

const Spinner = () => {
  return <Loader style={spinerStyle} animation="grow" />;
};

export default Spinner;

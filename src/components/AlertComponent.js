import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';

import AlertActions from '../actions/alert.action';

const AlertComponent = ({ content, variant, show }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Alert
        show={show}
        variant={variant}
        onClose={() => dispatch(AlertActions.clean())}
        dismissible
      >
        {content}
      </Alert>
    </>
  );
};

export default AlertComponent;

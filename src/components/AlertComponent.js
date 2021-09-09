import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AlertComponent = ({ content, variant, show = true }) => {
  const [alertShow, setAlertShow] = useState(show);
  return (
    <>
      {alertShow && (
        <Alert
          variant={variant}
          onClose={() => setAlertShow(false)}
          dismissable
        >
          {content}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;

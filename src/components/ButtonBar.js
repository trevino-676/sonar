import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

const ButtonBar = ({
  handleOpenForm,
  handleDeleteForm,
  addLabel,
  deleteLabel,
}) => (
  <ButtonToolbar>
    <Button onClick={handleOpenForm} variant="outline-primary">
      {addLabel}
    </Button>
    <Button onClick={handleDeleteForm} variant="outline-danger">
      {deleteLabel}
    </Button>
  </ButtonToolbar>
);

export default ButtonBar;

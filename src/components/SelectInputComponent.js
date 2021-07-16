import React from 'react';
import { Form } from 'react-bootstrap';

const SelectComponent = ({ data, name, handleChange }) => (
  <>
    <Form.Control
      as="select"
      aria-label="Default select example"
      name={name}
      onChange={(e) => handleChange(e)}
    >
      <option>Escoge un opcion</option>
      {data.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </Form.Control>
  </>
);

export default SelectComponent;

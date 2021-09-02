import React from 'react';
import { Form } from 'react-bootstrap';

const SelectComponent = ({ data, name, handleChange, defaultData = null }) => (
  <>
    <Form.Control
      as="select"
      aria-label="Default select example"
      name={name}
      onChange={(e) => handleChange(e)}
    >
      <option value="" selected={defaultData === null}>
        Escoge un opcion
      </option>
      {data.map((item) => (
        <option
          key={item.value}
          value={item.value}
          selected={item.value === defaultData}
        >
          {item.text}
        </option>
      ))}
    </Form.Control>
  </>
);

export default SelectComponent;

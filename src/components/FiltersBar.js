import React from 'react';
import _ from 'lodash';
import {
  Accordion,
  Card,
  Form,
  InputGroup,
  Col,
  Row,
  Button,
} from 'react-bootstrap';

import SelectComponent from './SelectInputComponent';

import '../styles/components/filterbar.css';

const FilterBar = ({
  dataFields,
  onHandleChange,
  onHandleClick,
  textFilter = null,
}) => (
  <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey="0"
        className="filters-header"
      >
        <div>Filtros</div>
        <div className="text-filters">{textFilter && textFilter}</div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <Form>
            <Row>
              {_.map(dataFields, (field) => (
                <Col xs md={3} key={field.name}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <b>{field.label}</b>:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    {field.type === 'Select' ? (
                      <SelectComponent
                        data={field.options}
                        name={field.name}
                        handleChange={onHandleChange}
                      />
                    ) : (
                      <Form.Control
                        type={field.type}
                        name={field.name}
                        onChange={(e) => onHandleChange(e)}
                      />
                    )}
                  </InputGroup>
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs
                md={{ span: 2, offset: 10 }}
                className="justify-content-end"
              >
                <Button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    onHandleClick();
                  }}
                >
                  Generar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
);

export default FilterBar;

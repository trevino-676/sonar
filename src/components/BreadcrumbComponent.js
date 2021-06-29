/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent = ({ routes }) => (
  <Breadcrumb>
    {routes.map((route, index) => (
      <Breadcrumb.Item href={route.path} active={route.active} key={index}>
        {route.name}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default BreadcrumbComponent;

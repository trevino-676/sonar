import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent = ({ routes }) => (
  <Breadcrumb>
    {routes.map((route) => (
      <Breadcrumb.Item href={route.path} active={route.active}>
        {route.name}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

export default BreadcrumbComponent;

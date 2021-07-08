/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/breadcrumb.css';

const BreadcrumbComponent = ({ routes }) => (
  <>
    <ul className="breadcrumb">
      {routes.map((item, index) => (
        <li>
          <Link to={item.path} key={`B-${index}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export default BreadcrumbComponent;

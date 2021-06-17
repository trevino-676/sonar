import React from 'react';

import Settings from '../pages/Settings';
import CompanyPage from '../pages/companies';
import UsersPage from '../pages/users';

export default {
  Settings: {
    component: <Settings />,
    path: '/settings',
  },
  Company: {
    component: <CompanyPage />,
    path: '/companies',
  },
  Users: {
    component: <UsersPage />,
    path: '/users',
  },
};

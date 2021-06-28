import Login from '../pages/Login';
import Home from '../pages/Home';
import Registro from '../pages/Registro';
import SellsByClient from '../pages/reports/sells';

export default {
  Login: {
    component: Login,
    path: '/login',
  },
  Home: {
    component: Home,
    path: '/',
  },
  UserRegistry: {
    component: Registro,
    path: '/registry',
  },
  SellsReport: {
    path: '/reports/sells/by_client',
    component: SellsByClient,
  },
};

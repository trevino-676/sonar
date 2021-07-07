import Login from '../pages/Login';
import Home from '../pages/Home';
import Registro from '../pages/Registro';

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
};

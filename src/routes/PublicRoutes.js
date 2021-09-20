import Login from '../pages/Login';
import Home from '../pages/Home';
import UserRegistry from '../pages/users/register';
import PasswordRecovery from '../pages/PasswordRecovery';
import Pagos from '../pages/reports/nomina/pagosNomina';
import FormUploadFile from '../components/FormUploadFile';
 
export default {
  Login: {
    component: Login,
    path: '/login', 
  },
  Home: {
    component: Home,
    path: '/home',
  },
  UserRegistry: {
    component: UserRegistry,
    path: '/registry',
  },
  PasswordRecovery: {
    component: PasswordRecovery,
    path: '/recovery',
  },
  UploadFileComp: {
    component: FormUploadFile,
    path: '/uploadFileComp',
  },
};

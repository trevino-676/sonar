import Login from '../pages/Login';
import Home from '../pages/Home';
import UserRegistry from '../pages/users/register';
import PasswordRecovery from '../pages/PasswordRecovery';
import Nomina from '../pages/reports/nomina/deduccionesNomina';
import Percepcciones from '../pages/reports/nomina/percepcionesNomina';
import Pagos from '../pages/reports/nomina/pagosNomina';
import NominaOtrosPagos from '../pages/reports/nomina/otrosPagosNomina';
import Proveedores from '../pages/reports/nomina/proveedores';
import complementosDePago from '../pages/reports/nomina/complementosDePago';

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
  Nomina: {
    component: Nomina,
    path: '/nomina',
  },
  Percepcciones: {
    component: Percepcciones,
    path: '/nominaPercepciones',
  },
  Pagos: {
    component: Pagos,
    path: '/pagosNomina',
  },
  NominaOtrosPagos: {
    component: NominaOtrosPagos,
    path: '/otrosPagosNomina',
  },
  Proveedores: {
    component: Proveedores,
    path: '/proveedores',
  },
  complementosDePago: {
    component: complementosDePago,
    path: '/complementosDePago',
  },
  PasswordRecovery: {
    component: PasswordRecovery,
    path: '/recovery',
  },
};

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Registro from '../pages/Registro';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import CompanyPage from '../pages/companies';
import NotFound from '../pages/NotFound';

import Flogin from '../pages/Flogin';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        {/* Aqui van las rutas de la aplicacion */}
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Home} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/companies" component={CompanyPage} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Flogin" component={Flogin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;

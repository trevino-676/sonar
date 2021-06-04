import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {_.map(PublicRoutes, (route, key) => {
            const { component, path } = route;
            return <Route exact path={path} component={component} key={key} />;
          })}
          {_.map(PrivateRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={() =>
                  !user.loggedIn ? component : <Redirect to="/login" />
                }
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;

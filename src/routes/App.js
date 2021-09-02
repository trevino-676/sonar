/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import SystemConstants from '../constants/system.constants';
import ConfigActions from '../actions/config.action';

const socketRoute = 'wss://sws.sonar32.com.mx';
// const socketRoute = 'ws://localhost:6789';
const socket = new WebSocket(socketRoute);

const notification = (data) => {
  if (window.Notification) {
    if (Notification.permission === 'granted') {
      const _notify = new Notification(data.title, {
        body: data.body,
        requireInteraction: true,
        icon: SystemConstants.NOTIFICATION_LOGO,
      });
    } else {
      Notification.requestPermission()
        .then((p) => {
          if (p === 'granted') {
            const _notify = new Notification(data.title, {
              body: data.body,
              requireInteraction: true,
              icon: SystemConstants.NOTIFICATION_LOGO,
            });
          }
        })
        .catch(null);
    }
  }
};


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const config = useSelector((state) => state.config.config);

  useEffect(() => {
    if (user.loggedIn && !config) {
      dispatch(ConfigActions.getUserConfig());
    }
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'notification':
          if (localStorage.getItem('token')) {
            data.data.forEach((notify) => {
              if (config.notifications.indexOf(notify.type) > -1) {
                notification(notify);
                const socketData = {
                  action: 'seen',
                  notification: notify,
                };
                socket.send(JSON.stringify(socketData));
              }
            });
          }
          break;
        default:
          break;
      }
    };
  }, []);

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
                  user.loggedIn ? component : <Redirect to="/login" />
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

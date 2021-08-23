/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

// Se importan en esta seccion la paginas de la aplicacion
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

// const socketRoute = 'ws://3.138.155.212:6789/';
// const socket = new WebSocket(socketRoute);

// const notification = (data) => {
//   if (window.Notification) {
//     if (Notification.permission === 'granted') {
//       const _notify = new Notification(data.title, {
//         body: data.body,
//       });
//     } else {
//       Notification.requestPermission()
//         .then((p) => {
//           if (p === 'granted') {
//             const _notify = new Notification(data.title, {
//               body: data.body,
//             });
//           }
//         })
//         .catch(null);
//     }
//   }
// };

const App = () => {
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     switch (data.type) {
  //       case 'notification':
  //         data.data.map((notify) => notification(notify));
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }, []);

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

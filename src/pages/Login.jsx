/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import LoginActions from '../actions/login.action';
import ModalActions from '../actions/modal.action';

import '../styles/pages/login.css';

const Login = () => {
  const [login, setLogin] = useState({
    username: null,
    password: null,
  });
  const dispatch = useDispatch();
  const facebookLogin = () => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '850025339250150',
        xfbml: true,
        version: 'v10.0',
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const facebookStart = () => {
    window.FB.login(
      (response) => {
        if (response.status === 'connected') console.log('Entro!!');
      },
      { scope: 'public_profile' }
    );
  };

  const googleLogin = () => {
    let s = document.createElement('script');
    s.setAttribute('src', 'https://apis.google.com/js/api.js');
    s.onload = googleStart;
    document.body.appendChild(s);
  };

  const googleStart = () => {
    let GoogleAuth;
    const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
    console.log('----------');
    handleClientLoad();
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
      console.log(gapi);
    }

    function initClient() {
      const discoveryUrl =
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
      gapi.client
        .init({
          apiKey: 'AIzaSyBbW99HNi4hkZdpNC381-RRq63MXCmdDFs',
          clientId:
            '145180067857-iff01u76igkocukv6j1hfvjboe1bf97c.apps.googleusercontent.com',
          discoveryDocs: [discoveryUrl],
          scope: SCOPE,
        })
        .then(() => {
          GoogleAuth = gapi.auth2.getAuthInstance();
          GoogleAuth.isSignedIn.listen(updateSigninStatus);
          // const user = GoogleAuth.currentUser.get();
          setSigninStatus();
          const el = document.getElementById('sign-in-or-out-button');
          el.addEventListener('click', handleAuthClick, false);
          /*
      $('#revoke-access-button').click(function() {
        revokeAccess();
      }); */
        });
    }
    function handleAuthClick() {
      if (GoogleAuth.isSignedIn.get()) {
        GoogleAuth.signOut();
      } else {
        GoogleAuth.signIn();
      }
    }

    function revokeAccess() {
      GoogleAuth.disconnect();
    }

    function setSigninStatus() {
      const user = GoogleAuth.currentUser.get();
      const isAuthorized = user.hasGrantedScopes(SCOPE);
      if (isAuthorized) {
        console.log('SI');
      } else {
        console.log('NO');
      }
    }

    function updateSigninStatus() {
      setSigninStatus();
    }
  };

  const fun = {
    ss: () => 20,
  };

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const basicLogin = (event) => {
    event.preventDefault();
    dispatch(ModalActions.Clean());
    if (!login.username || !login.password) {
      dispatch(
        ModalActions.Alert({
          title: 'Datos incompletos',
          body: 'Ingresa el correo o la contraseña',
        })
      );
      return;
    }
    dispatch(LoginActions.Login(login));
  };

  googleLogin();
  facebookLogin();

  return (
    <>
      <div className="login-area">
        <div className="login-main-area">
          <div className="login-header">
            <h2>SONAR 32</h2>
            <p>Bienvenido, ingresa con tu correo y contraseña</p>
          </div>
          <div className="login-main">
            <form onSubmit={basicLogin}>
              <input
                type="email"
                placeholder="Ingresa tu correo electronico"
                name="username"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                onChange={handleChange}
              />
              <Button type="submit" variant="primary">
                Ingresar
              </Button>
              <Button variant="outline-primary">Registrate</Button>
              <div className="login-snbuttons">
                <Button
                  variant="outline-secondary"
                  type="button"
                  title="Inicia sesion con facebook"
                  onClick={facebookStart}
                >
                  <span>
                    <i className="fab fa-facebook" />
                  </span>
                  Facebook
                </Button>
                <Button
                  variant="outline-secondary"
                  type="button"
                  title="Inicia sesion con google"
                >
                  <span>
                    <i className="fab fa-google" />
                  </span>
                  Google
                </Button>
              </div>
            </form>
          </div>
          <div className="login-footer">
            <Link to="/recovery">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

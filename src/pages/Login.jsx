/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable func-names */
import React from 'react';

import { useDispatch } from 'react-redux';
import LoginActions from '../actions/login.action';
import ModalActions from '../actions/modal.action';

const Login = () => {
  const dispatch = useDispatch();
  const facebookLogin = () => {
    console.log('FB iniciado');

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
    console.log('diálogo de inicio FB');
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

  const info = {
    user: '',
    pass: '',
  };

  const setUser = {
    user: (element) => {
      const user = element.target.value;
      info.user = user;
    },
    pass: (element) => {
      const pass = element.target.value;
      info.pass = pass;
    },
  };

  const basicLogin = () => {
    dispatch(ModalActions.Clean());
    if (info.user.length < 1 || info.pass.length < 1) {
      dispatch(
        ModalActions.Alert({
          title: 'Login',
          body: 'Debes de ingresar el usuario y contraseña',
        })
      );
    } else {
      dispatch(
        LoginActions.Login({ username: info.user, password: info.pass })
      );
    }
  };

  googleLogin();
  facebookLogin();

  return (
    <>
      <script src="https://connect.facebook.net/en_US/sdk.js" />
      <div className="row page-content">
        <div className="col-lg-12">
          <div className="container-login">
            <div className="content-login">
              <div className="form-group text-left">
                <strong
                  className="font-weight-bold"
                  htmlFor="exampleInputEmail1"
                >
                  Correo electrónico
                </strong>
                <input
                  onChange={setUser.user}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Introduce tu correo"
                />
                <small id="emailHelp" className="form-text text-left">
                  Nunca compartiremo tu correo con alguien más.
                </small>
              </div>
              <div className="form-group">
                <strong htmlFor="exampleInputPassword1">Contraseña</strong>
                <input
                  type="password"
                  onChange={setUser.pass}
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Recordarme
                </label>
                <div>
                  <a href="register">crear una cuenta cuenta</a>
                </div>
              </div>
              <br />
              <div className="btn-send">
                <button
                  type="button"
                  onClick={basicLogin}
                  className="btn btn-primary"
                >
                  Entrar
                </button>
              </div>
              <div className="row">
                <div className="col-lg-5 np">
                  <hr />
                </div>
                <div className="col-lg-2 np option-social">o</div>
                <div className="col-lg-5 np">
                  <hr />
                </div>
              </div>
              <div className="social-footer">
                <div className="row">
                  <div className="col-lg-6">
                    <button
                      onClick={facebookStart}
                      className="btn-login btn-fb btn form-control"
                      type="button"
                    >
                      Facebook
                    </button>
                  </div>
                  <div className="col-lg-6 np">
                    <button
                      id="sign-in-or-out-button"
                      className="btn btn-g form-control"
                      type="button"
                    >
                      Google
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

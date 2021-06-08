import React from 'react';
import {Redirect} from 'react-router-dom'; 

import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import LoginActions from '../actions/login.action'
  
const Login = () => { 
  const dispatch = useDispatch();  
  const facebookLogin = () => {
  console.log("FB iniciado"); 

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '850025339250150',
      xfbml      : true,
      version    : 'v10.0'
    });
    FB.AppEvents.logPageView(); 
  };

    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   

  }; 

  const facebookStart = () => { 
      console.log("diálogo de inicio FB"); 
      window.FB.login( function(response){ if( response.status === "connected"){ console.log( response ); } }, {scope :'public_profile'} ); 
  };

  const googleLogin = () => {
     
      var s = document.createElement( 'script' );
      s.setAttribute( 'src', "https://apis.google.com/js/api.js" );
      s.onload =  googleStart;  
      document.body.appendChild( s );
  }; 
 

  const googleStart = () => {
     var GoogleAuth;
     var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';
     console.log("----------"); 
     handleClientLoad(); 
    function handleClientLoad() {
      gapi.load('client:auth2', initClient);
      console.log( gapi ); 
    }

    function initClient() {
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
    gapi.client.init({
        'apiKey': 'AIzaSyBbW99HNi4hkZdpNC381-RRq63MXCmdDFs',
        'clientId': '145180067857-iff01u76igkocukv6j1hfvjboe1bf97c.apps.googleusercontent.com',
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
      var user = GoogleAuth.currentUser.get();
      setSigninStatus();
      var el = document.getElementById("sign-in-or-out-button");
      el.addEventListener("click",  handleAuthClick, false);
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
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      console.log("SI"); 
    } else {
      console.log("NO"); 
    }
  }

  function updateSigninStatus() {
    setSigninStatus();
  }
   
  }; 

  const fun = {
    "ss" : function() { return 20; }
  };

  const info = {
    "user" : "", 
    "pass" : "" 
  }

   const setUser =  {
     "user" : function( element ) { let u_user = element.target.value; console.log(u_user); info.user = u_user;  }, 
     "pass" : function( element ) { let pass = element.target.value; console.log(pass); info.pass = pass;  }
  }; 

   const basicLogin = () => {
    if( info.user.length < 1 || info.pass.length < 1 ) {
      alert("es necesario el usuario y la contraseña"); 
    } else {

      dispatch(LoginActions.sendData( info.user, info.pas)); 
      /* 
      let url = "http://127.0.0.1:5000/unprotected?user="+info.user+"&pass="+info.pass;  
      const response = fetch( url, {method:'get'}).then((res)=> res.json()).then( function( json ) { 
            if( json.message == 1 ) {
              alert("Bienvenido");  
              console.log( window.localStorage.getItem("LOGED_IN") ); 
              window.localStorage.setItem("LOGED_IN", "IN"); 
              console.log( window.localStorage.getItem("LOGED_IN") ); 
              console.log("REDIRECCIONAR");
              window.location.href = "politica-de-privacidad"; 
            } else {
              alert("Usuario desconocido"); 
            }
      }); */  


    }  
  }; 
 
  googleLogin();  
  facebookLogin(); 

  return ( 
    <>
    <script src="https://connect.facebook.net/en_US/sdk.js"/>  
    <div class="row page-content"> 
      <div class="col-lg-6">
         <div class="container-login">
          <div class="content-login"> 
              
        <div class="form-group text-left">
          <strong class="font-weight-bold" for="exampleInputEmail1">Correo electrónico</strong>
          <input  onChange={setUser.user}  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce tu correo"/>
          <small id="emailHelp" class="form-text text-left">Nunca compartiremo tu correo con alguien más.</small>
        </div>
        <div class="form-group">
          <p></p>
          <strong for="exampleInputPassword1">Contraseña</strong>
          <input type="password" onChange={setUser.pass} class="form-control" placeholder="Ingresa tu contraseña"/>
        </div>
        <div class="form-check">
          <input   type="checkbox" class="form-check-input" id="exampleCheck1"/>
          <label  class="form-check-label" for="exampleCheck1">Recordarme</label>
          <div> 
            <a href="register">crear una cuenta cuenta</a>
          </div> 
        </div>
        <br/> 
        <div class="btn-send"> 
          <button  onClick={basicLogin}  class="btn btn-primary">Entrar</button>
        </div> 
        <div class="row">   
          <div class="col-lg-5 np"> 
            <hr/> 
          </div> 
          <div class="col-lg-2 np option-social">o</div> 
          <div class="col-lg-5 np">
            <hr/> 
          </div> 
        </div> 
        <div class="social-footer">  
          <div class="row"> 
            <div class="col-lg-6"> 
               <button onClick={facebookStart} class="btn-login btn-fb btn form-control">Facebook</button> 
            </div> 
            <div class="col-lg-6 np"> 
               <button id="sign-in-or-out-button" className="btn btn-g form-control">Google</button>  
            </div> 
          </div> 
        </div>
        </div> 
        </div>  
      </div>
       <div class="col-lg-6">
       <div class="slogan-container">    
          <h1 class="slogan-main-text">Sonar32</h1>
          <h4> 
            Sonar32 te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.
          </h4>
        </div>    
      </div>
    </div>  
    </>
);   

};

export default Login; 
import React from 'react';


const Login = () => (
    <>
    <div class="container-login">
    <div class="content-login"> 
    <h1>LOGIN</h1> 
   			<input class="input-login" placeholder="usuario"></input>
   			<input class="input-login" placeholder="contraseña" type="password"></input>
   			<div class="content-footer-login"> 
   			<button class="btn-login">Entrar</button> 
   			</div> 
   	 	<hr/> 
   	 	<div> <a href="Flogin"> <button class="btn-login btn-fb">FACEBOOK</button> </a>  <a href="Flogin"> <button class="btn-login btn-g">GOOGLE</button> </a> </div> 
   	 </div> 
   	 </div> 
    </>
)  

export default Login;
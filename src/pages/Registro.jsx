import React from 'react';
import {Redirect} from 'react-router-dom'; 
 

class Registro extends React.Component {
  
   constructor( props ) {
   	super(props); 
   	this.state = {
   		clase: ''
   	}
   }

  clases = {
  	"btnMoral" : "btn btn-primary", 
  	"btnPerson" : "btn", 
  	"divPerson" : "", 
  	"divCompany": "hidden"
  } 
 
  btnCompany = (event) => {
  	if ( event.target.id == 'company') {
  		this.clases.btnMoral= "btn btn-primary";
  		this.clases.btnPerson= "btn";
      this.clases.divPerson = "";  
      this.clases.divCompany = "hidden"; 
  	} else {
  		this.clases.btnPerson= "btn btn-primary"; 
  		this.clases.btnMoral= "btn";  
  		this.clases.divPerson = "hidden"; 
      this.clases.divCompany = ""; 
  	} 
  	this.setState({}); 
  }

  changeType = () =>  {
  	this.setState({
  		clase: 'btn-primary'
  	})

  }
 
  info = {
    "name" : "", 
    "mail" : "", 
    "pass" : "", 
    "confirmPass" : ""
  }

  setName = (element) => {
    let u_user = element.target.value; console.log(u_user);  this.info.name = u_user; 
  } 
  setMail = (element) => {
    let u_user = element.target.value; console.log(u_user);  this.info.mail = u_user; 
  }
  setPass = (element) => {
    let u_user = element.target.value; console.log(u_user);  this.info.pass = u_user; 
  }
  confirmPass = (element) => {
    let u_user = element.target.value; console.log(u_user);  this.info.confirmPass = u_user; 
  }
   
 registro = (event) => { 
    if( this.info.pass.length < 1  || this.info.confirmPass.length < 1 || this.info.name.length < 1 || this.info.mail.length < 1 ) {
      alert("Lllena todos los campos"); 
    } else {
      if( this.info.pass != this.info.confirmPass ) {
        alert("Las contraseñas no coinciden"); 
      } else {
        document.getElementsByClassName("container-login")[0].innerHTML = "<h1>Registrado</h1>"; 
        let url = "http://127.0.0.1:5000/registerPerson?nombre="+this.info.name+"&correo="+this.info.mail+"&password="+this.info.pass;  
        const response = window.fetch( url, {method:'GET' }).then((res)=> res.json()).then( function( json ) { 
               console.log( json ); 
          }); 
      }
    }
  }
  
  render( ) { 
   
  return ( 
    <>	
    <div class="row page-content"> 
 	 	<div> 
		   <div class="row">
		   	<div class="col-lg-6"> 
		 		<button id="person" onClick={this.btnCompany} class={this.clases.btnPerson} >Persona física</button>
		   	</div>  
		   	<div class="col-lg-6">  
    		 <button id="company" onClick={this.btnCompany} class={this.clases.btnMoral} >Persona moral</button>
		   	</div>  
		   </div> 
		 </div> 
    <div class={this.clases.divCompany}> 
    	 <div class="container-login">
          <div> 
          <div class="form-group text-left">
          <strong class="font-weight-bold" for="exampleInputEmail1">Nombre</strong>
          <input  type="email" onChange={this.setName} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce tu nombre"/>
          <small id="emailHelp"  class="form-text text-left">Nunca compartiremo tu correo con alguien más.</small>
        </div>
        <div class="form-group text-left">
          <strong class="font-weight-bold" for="exampleInputEmail1">Correo electrónico</strong>
          <input    type="email" onChange={this.setMail} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce tu correo"/>
          <small id="emailHelp" class="form-text text-left">Nunca compartiremo tu correo con alguien más.</small>
        </div>
        <div class="form-group">
          <p></p>
          <strong for="exampleInputPassword1">Asingna una contraseña</strong>
          <input type="password" onChange={this.setPass} class="form-control" placeholder="Ingresa tu contraseña"/>
        </div>
        <div class="form-group">
          <p></p>
          <strong for="exampleInputPassword1">Confirma tu contraseña</strong>
          <input type="password" onChange={this.confirmPass} class="form-control" placeholder="Ingresa tu contraseña"/>
        </div>
         
        <br/> 
        <div class="btn-send"> 
          <button onClick={this.registro} class="btn btn-primary">Crear cuenta</button>
        </div>  
        </div> 
        </div> 
    </div> 
     <div class={this.clases.divPerson}> 
           <div class="container-login">
          <div> 
        <div class="form-group text-left">
          <strong class="font-weight-bold" for="exampleInputEmail1">Correo electrónico</strong>
          <input    type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduce tu correo"/>
          <small id="emailHelp" class="form-text text-left">Nunca compartiremo tu correo con alguien más.</small>
        </div>
        <div class="form-group">
          <p></p>
          <strong for="exampleInputPassword1">Asingna una contraseña</strong>
          <input type="password"  class="form-control" placeholder="Ingresa tu contraseña"/>
        </div>
        <div class="form-group">
          <p></p>
          <strong for="exampleInputPassword1">Confirma tu contraseña</strong>
          <input type="password"  class="form-control" placeholder="Ingresa tu contraseña"/>
        </div>
         
        <br/> 
        <div class="btn-send"> 
          <button     class="btn btn-primary">Crear cuenta</button>
        </div>  
        </div> 
        </div>  
      </div> 
      </div> 
    </>
);   

}
}

export default Registro; 
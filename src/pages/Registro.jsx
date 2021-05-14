import React from 'react';


const Registro = () => (
    <>
    <h1>Registro para usuarios</h1>
   	<form className="col-md-3"> 
	 	<input  placeholder="NOMBRE"></input>
	 	<input placeholder="CORREO ELECTRÓNICO"></input>
	 	<input placeholder="CONTRASEÑA" type="password"></input>
	 	<button>Registrar</button> 
   	</form> 
    </>
)

export default Registro;
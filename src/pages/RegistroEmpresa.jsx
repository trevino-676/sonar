import React from 'react';


const RegistroEmpresa = () => (
    <>
    <h1>Registro para empresas</h1>
   	<form className="col-md-3"> 
	 	<input  placeholder="RFC EMPRESA"></input>
	 	<input placeholder="NOMBRE EMPRESA"></input>
	 	<input placeholder="CONTRASEÑA" type="password"></input>
	 	<button>Registrar</button> 
   	</form> 
    </>
)

export default RegistroEmpresa;
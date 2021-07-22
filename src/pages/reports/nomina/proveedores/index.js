import React from 'react'; 
import ReportTable from '../../../../components/ReportTablesNomina';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import useTaxablePerceptionsExpandData from './ExpandData';
 
const Menu = () => {
  const dispatch = useDispatch();
  
   const currencyFormatter = (cell) => (
    <span>$ {parseFloat(cell).toFixed(2)}</span>
  );

  const [expandedColumns, expandedData] = useTaxablePerceptionsExpandData(
    dataReport,
    currencyFormatter
  );

  const dataReport =  [
      { "id": 1, "empleado": 1, "price": "Type 1" },
      { "id": 2, "empleado": 2, "price": "Type 2" },
      { "id": 3, "empleado": 3, "price": "Type 3" },
      { "id": 4, "empleado": 4, "price": "Type 2" },
      { "id": 5, "empleado": 5, "price": "Type 3" },
      { "id": 6, "empleado": 6, "price": "Type 1" },
    ];


const [equipo, setEquipo] = React.useState([]);
const [subs, setSubs] = React.useState([]);

const BaseURL = 'https://www.sonar32.com.mx';

const expand = null;   

    const obtenerDatos = async () => {
      alert("..");  
      //const data = await fetch(`${BaseURL}/v1/niminaReports/deducciones`); 
      const data = await fetch("http://127.0.0.1:5000/deducciones?empresa=GPR070228780&empleado=VIEA940203HY0");   
      const users = await data.json();  

      console.log("--"); 
      console.log(users)
      console.log("--"); 
      setEquipo(users.elements); 
      setSubs(users.percepciones); 
      //expand = users.sub;  
      console.log( expandedColumns ); 
      console.log(users);  
      console.log( dataReport );
    }
  React.useEffect(
      () => {
        document.title = 'Nomina - '; 
        //obtenerDatos(); 
      }
    , [])


const extpandData = [ 
            [ { "id": "SEPTIMO DÍA", "rfc": 800, "price": 200 }, { "id": "SEPTIMO DÍA 01", "rfc": 100, "price": 900 } ], 
            [ { "id": "OTRO DÍA", "rfc": 800, "price": 200 }, { "id": "OTRO DÍA 01", "rfc": 100, "price": 900 } ]  
          ]; 

const dataColumns = [{
  dataField: 'id',
  text: 'id'
}, {
  dataField: 'empleado',
  text: 'CLIENTE'
}, 
{
  dataField: 'rfc',
  text: 'CONCEPTO'
},
{
  dataField: 'price',
  text: 'MONTO'
}, 
{
  dataField: 'otrospagos',
  text: 'RFC'
}]; 

const dataColumnsExpand = [{
  dataField: 'id',
  text: 'id'
}, {
  dataField: 'TipoPercepcion',
  text: 'Clave'
}, 
{
  dataField: 'Concepto',
  text: 'Concepto'
}, 
{
  dataField: 'ImporteGravado',
  text: 'Grabado'
},
{
  dataField: 'ImporteExento',
  text: 'Excento'
} ]; 
 
const dataColumnss = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'key',
  text: 'Product Name'
} ]; 

 
const expandRow =  [
     {'id': 'id'} 
]; 

 
 
  return(
<div> 
 <div> <h2> Compras por proveedor </h2> </div> 
  
  <div class="card">
  <div class="card-header">
    Filtros
  </div>
  <div class="card-body">
  <div class="row"> 
  <div class="col-lg-3">
     <span>&nbsp;</span>
      <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">RFC EMPRESA</div>
    </div>
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="XAXX010101000
"/>
  </div>
    </div> 
    <div class="col-lg-3">
     <span>&nbsp;</span> 
      <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">RFC CLIENTE</div>
    </div>
    <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="XAXX010101000
"/>
  </div>
    </div>   
    <div class="col-lg-3">
      <span> Desde </span> 
      <input class="form-control" type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"/>
    </div> 
    <div class="col-lg-3">
      <span>Hasta</span> 
      <input class="form-control" type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"/>
    </div>
    <div class="col-lg-3"> 
      <br/>
      <button class="btn btn-primary" onClick={obtenerDatos}>Generar</button>
    </div> 
  </div> 
  </div>
</div>

 

 <h2>&nbsp;</h2>
  {  equipo && ( 
    <Container>
       <ReportTable
            tableData={equipo}
            tableColumns={dataColumns} 
            expandRow={expandRow}
            expandColumns={dataColumnsExpand}
            expandData={subs}
            expandDataKey="empleado"
            dataKey="empleado"
          />
        </Container>
        )
       }
       </div>
    );  
}

export default Menu; 
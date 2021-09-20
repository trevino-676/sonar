import React from 'react'; 
import ReportTable from '../../../../components/ReportTablesReportes';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import useTaxablePerceptionsExpandData from './ExpandData';
  
const DeduccionesNomina = () => {
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
    //const data = await fetch(`${BaseURL}/v1/niminaReports/deducciones`); 
    let rfcempresa  =   document.getElementById("rfc-empresa").value; 
    let rfcempleado =   document.getElementById("rfc-empleado").value; 
    let dataFrom    =   document.getElementById("data-from").value; 
    let dataTo      =   document.getElementById("data-to").value; 
     
    if( rfcempresa.length < 2 ) {
      alert("Debes proporciona una empresa"); 
      return;    
    } 

    //const data = await fetch("http://127.0.0.1:5000/deducciones?empresa=GPR070228780&empleado=VIEA940203HY0");    
    //let url = "http://127.0.0.1:5000/nominas?empresa=SEE0610097T3&empleado=VIAA851209PG3&from=2021-01-01&to=2021-01-31"; 
    //let url = "http://127.0.0.1:5000/nominas?empresa="+rfcempresa+"&empleado="+rfcempleado+"&from="+dataFrom+"&to="+dataTo; 
    let url = "http://127.0.0.1:5000/v1/retentions/reports/nominas?empresa=GPR070228780"; 
    
    const data = await fetch(url);   
    const users = await data.json();  
    console.log( users ); 
   
    setEquipo(users.elements); 
    setSubs(users.percepciones); 
    //expand = users.sub;  
    console.log( expandedColumns ); 
    console.log(users);  
    console.log( dataReport );
  }

  React.useEffect(
      () => {
        document.title = 'Nomina - Reportes de nomina '; 
        //obtenerDatos(); 
      }
    , [])
 
const extpandData = [ 
            [ { "id": "SEPTIMO DÍA", "rfc": 800, "price": 200 }, { "id": "SEPTIMO DÍA 01", "rfc": 100, "price": 900 } ], 
            [ { "id": "OTRO DÍA", "rfc": 800, "price": 200 }, { "id": "OTRO DÍA 01", "rfc": 100, "price": 900 } ]  
          ]; 

const dataColumns = [{
  dataField: 'id',
  text: '#' 
}, {
  dataField: 'empleado',
  text: 'Empleado'
}, 
{
  dataField: 'rfc',
  text: 'Total Deducciones', 
  align: 'right' 
},  
{ 
  dataField: 'price',
  text: 'Total Percepciones', 
  align: 'right' 
}, 
{
  dataField: 'otrospagos',
  text: 'Otros pagos', 
  align: 'right' 
}]; 

const dataColumnsExpand = [{
  dataField: 'id',
  text: 'id', 
  hidden: true 
},
{
  dataField: 'Clave',
  text: 'Clave'  
}, 
{
  dataField: 'TipoDeduccion',
  text: 'TipoDeduccion-'
}, 
{
  dataField: 'Concepto',
  text: 'Concepto'
}, 
{
  dataField: 'Importe',
  text: 'Importe'
},
{
  dataField: 'fecha',
  text: 'Fecha'
}
  ]; 
 
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
    <> 
<div> 
 <div>  
  <div class="bread-crumb"> Home / Ventas / Reportes de Nominas </div> 

  <h2> Reportes de nomina </h2> </div> 

 
  <div class="card">
  <div class="card-header">
    Filtros
  </div>
  <div class="card-body">
  <div class="row"> 
  <div class="col-lg-5">
     <span>&nbsp;</span>
      <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">RFC EMPRESA</div>
    </div>
    <select className="form-control" id="rfc-empresa"> 
      <option value="GPR070228780">LA PICANHA GRILL TACOS SA DE CV - GPR070228780</option>
    </select> 
  </div>
    </div> 
    <div class="col-lg-3">
     <span>&nbsp;</span> 
      <div class="input-group mb-2 mr-sm-2">
    <div class="input-group-prepend">
      <div class="input-group-text">RFC EMPLEADO</div>
    </div>
    <input type="text" class="form-control" id="rfc-empleado" placeholder="XAXX010101000
"/>
  </div>
    </div>   
    <div class="col-lg-2">
      <span> Desde </span> 
      <input class="form-control" type="date" id="data-from" name="trip-start"
        />
    </div> 
    <div class="col-lg-2">
      <span>Hasta</span> 
      <input class="form-control" type="date" id="data-to" name="trip-start"
       />
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
       </>
    );  
}; 
 
export default DeduccionesNomina; 
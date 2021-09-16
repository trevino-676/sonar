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

    const obtenerDatos = async ( def ) => {
      //const data = await fetch(`${BaseURL}/v1/niminaReports/deducciones`); 
      let rfcempresa  =   document.getElementById("rfc-empresa").value; 
      let rfcempleado =   document.getElementById("rfc-empleado").value; 
      let dataFrom    =   document.getElementById("data-from").value; 
      let dataTo      =   document.getElementById("data-to").value; 
      
      let url = ''; 
      if( def === 'default') {
        url = "http://127.0.0.1:5000/comprasPorProveedor?receptor=GPR070228780&emisor=&from=2021-08-01&to=2021-08-31"; 
      }  else {
        //const data = await fetch("http://127.0.0.1:5000/deducciones?empresa=GPR070228780&empleado=VIEA940203HY0");    
        url = "http://127.0.0.1:5000/comprasPorProveedor?receptor="+rfcempresa+"&emisor="+rfcempleado+"&from="+dataFrom+"&to="+dataTo; 
        //let url = "http://127.0.0.1:5000/nominas?empresa=SEE0610097T3&emisor=VIAA851209PG3&from=2021-01-01&to=2021-01-31"; 
      }

      const data = await fetch(url);   
      const users = await data.json();  

      setEquipo(users.elements); 
      setSubs(users.emisores); 
      //expand = users.sub;  
      console.log( expandedColumns ); 
      console.log(users);  
      console.log( dataReport );
    }
  React.useEffect(
      () => {
        document.title = 'Nomina - Compras por proveedor '; 
        obtenerDatos("default"); 
      }
    , [])


const extpandData = [ 
            [ { "id": "SEPTIMO DÍA", "rfc": 800, "price": 200 }, { "id": "SEPTIMO DÍA 01", "rfc": 100, "price": 900 } ], 
            [ { "id": "OTRO DÍA", "rfc": 800, "price": 200 }, { "id": "OTRO DÍA 01", "rfc": 100, "price": 900 } ]  
          ]; 

const dataColumns = [{
  dataField: 'id',
  text: '#',
  sort: true, 
  hidden: true 
}, {
  dataField: 'Nombre', 
  text: 'Empresa', 
  sort: true
},
{
  dataField: 'rfc',
  text: 'RFC', 
  sort: true
},  
{
  dataField: 'Total',
  text: 'Total', 
  align: 'right',
  sort: true
}

]; 

const dataColumnsExpand = [{
  dataField: 'id',
  text: 'id', 
  hidden: true 
},
{
  dataField: 'MetodoPago',
  text: 'Metodo de Pago'  
}, 
{
  dataField: 'Total',
  text: 'Total'
}, 
{
  dataField: 'SubTotal',
  text: 'SubTotal'
}, 
{
  dataField: 'Fecha',
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
<div> 
 <div>  
  <div className="bread-crumb"> Home / Compras / Por Proveedor </div> 

  <h2> Compras por proveedor </h2> </div> 
 
  <div className="card">
  <div className="card-header">
    Filtros
  </div>
  <div className="card-body">
  <div className="row"> 
  <div className="col-lg-4">
     <span>&nbsp;</span>
      <div className="input-group mb-2 mr-sm-2">
    <div className="input-group-prepend">
      <div className="input-group-text">RFC EMPRESA</div>
    </div>
     <select className="form-control" id="rfc-empresa"> <option value="GPR070228780">LA PICANHA GRILL TACOS SA DE CV - GPR070228780</option> </select> 
  </div>
    </div> 
    <div className="col-lg-4">
     <span>&nbsp;</span> 
      <div className="input-group mb-2 mr-sm-2">
    <div className="input-group-prepend">
      <div className="input-group-text">PROVEEDOR</div>
    </div>
    <input type="text" className="form-control" id="rfc-empleado" placeholder="XAXX010101000
"/>
  </div>
    </div>   
    <div className="col-lg-2">
      <span> Desde </span> 
      <input className="form-control" type="date" id="data-from" name="trip-start"
        />
    </div> 
    <div className="col-lg-2">
      <span>Hasta</span> 
      <input className="form-control" type="date" id="data-to" name="trip-start"
       />
    </div>
    <div className="col-lg-3"> 
      <br/>
      <button className="btn btn-primary" onClick={obtenerDatos}>Generar</button>
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
            expandDataKey="id"
            dataKey="id"
          />
        </Container>
        )
       }
       </div>
    );  
}

export default Menu; 
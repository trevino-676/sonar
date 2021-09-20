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
      //const data = await fetch(`${BaseURL}/v1/niminaReports/deducciones`); 
      //GPR070228780 empresa
      //VIEA940203HY0 empleado  
      //const data = await fetch("http://127.0.0.1:5000/efos");   
      const data = await fetch("http://127.0.0.1:5000/v1/retentions/reports/efos");   
      const users = await data.json();  

      console.log("--"); 
      console.log(users)
      console.log("--"); 
      setEquipo(users.elements); 
      setSubs(extpandData)
    }
  React.useEffect( 
      () => {
        document.title = 'EFOS'; 
        obtenerDatos();  
      }
    , [])


const extpandData = [ 
          ]; 

const dataColumns = [{
  dataField: '_id',
  text: 'RFC'  
}, {
  dataField: 'Nombre',
  text: 'Total Facturado'
}, {
  dataField: 'Empresa',
  text: 'Empresa'
}, 
{
  dataField: 'cantidad',
  text: 'Cantidad de facturas'
} 
];   

const dataColumnsExpand = [{
  dataField: '_id',
  text: '_id'
}, {
  dataField: 'Clave',
  text: 'Clave'
},  
{
  dataField: 'Concepto',
  text: 'Concepto'
}
 ]; 
 
const dataColumnss = [{
  dataField: '_id',
  text: 'Product ID'
}, {
  dataField: 'key',
  text: 'Product Name'
} ]; 

 
const expandRow =  [
     {'_id': '_id'} 
]; 

 
 
  return(
<div> 
 <div className="bread-crumb"> Home / Ventas / Reportes / EFOS </div> 
 <div> <h2> Lista de EFOS </h2> </div> 

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
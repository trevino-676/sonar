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

    const obtenerDatos = async () => {

      //const data = await fetch("http://127.0.0.1:5000/deducciones"); 
      const data = await fetch(`${BaseURL}/v1/niminaReports/deducciones`); 
      const users = await data.json();  
      setEquipo(users); 
      
      console.log( expandedColumns ); 
      console.log(users); 
    }
	React.useEffect(
      () => {
        document.title = 'Nomina - '; 
        obtenerDatos(); 
      }
    , [])


const extpandData = [ 
					  [ { "id": "SEPTIMO DÍA", "rfc": 800, "price": 200 }, { "id": "SEPTIMO DÍA 01", "rfc": 100, "price": 900 } ], 
					  [ { "id": "OTRO DÍA", "rfc": 800, "price": 200 }, { "id": "OTRO DÍA 01", "rfc": 100, "price": 900 } ]  
					]; 

const dataColumns = [{
  dataField: 'id',
  text: 'Empleado'
}, {
  dataField: 'empleado',
  text: 'Total Deducciones'
}, {
  dataField: 'price',
  text: 'Total Deducciones'
}, 
{
  dataField: 'price',
  text: 'Otros pagos'
}]; 
 
const dataColumnss = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'key',
  text: 'Product Name'
} ]; 


const expandRow =  [
     {'rfc': 'rfc'}
]; 
 
	return(
<div> 
 <div> <h2> Deducciones de nomina </h2> </div> 
	{  equipo && ( 
		<Container>
			 <ReportTable
            tableData={equipo}
            tableColumns={dataColumns}
            expandRow={expandRow}
            expandColumns={dataColumns}
            expandData={extpandData}
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
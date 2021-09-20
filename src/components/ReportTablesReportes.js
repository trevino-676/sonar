import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import usePaginationOptions from '../hooks/usePaginationOptions';

const ReportTable = ({
  tableData,
  tableColumns,
  dataKey,
  expandData = null,
  expandColumns = null,
  expandDataKey = null,
}) => {
  const [options] = usePaginationOptions();
  if (expandData && expandColumns && expandDataKey) {
    //expandData = await fetch("http://127.0.0.1:5000/deduccionesUser"); 
    const expandRow = {
      renderer: (row) => {
      console.log(expandColumns); 
      //alert(expandData[0].rfc); 
      //console.log( row );  

      let title = '';  
      try {
        let element_this = event.target;

         console.log( element_this ); 

      let tds = event.target.parentNode; 
      let columns = tds.getElementsByTagName("td"); 
      let indexx = 0; 
      let dataColumnsExpand_ = [{
                        dataField: 'id',
                        text: '#', 
                        hidden: true 
                      },
                      {
                        dataField: 'Clave',
                        text: 'Clave'  
                      }, 
                      {
                        dataField: 'TipoDeduccion',
                        text: 'Tipo'
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
      for( let i = 0; i <= columns.length; i++ ) {
        if( columns[i] == element_this ) {
          indexx = (i-2); 
          if( indexx < 0 ) return; 
          if( indexx == 0 ) { 
            title = "TOTAL DE DEDUCCIONES"; 
            dataColumnsExpand_ = [{
                        dataField: 'id',
                        text: '#', 
                        hidden: true 
                      },
                      {
                        dataField: 'Clave',
                        text: 'Clave'  
                      }, 
                      {
                        dataField: 'TipoDePercepcion',
                        text: 'Tipo'
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
          } else if( indexx == 1 ) {
            title = "TOTAL DE PERCEPCIONES"; 
            dataColumnsExpand_ = [{
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
                        text: 'TipoDePercepcion'
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
          } else if( indexx == 2 ) {
            title = "TOTAL DE OTROS PAGOS"; 
            dataColumnsExpand_ = [{
                        dataField: 'id',
                        text: '#', 
                        hidden: true 
                      },
                      {
                        dataField: 'Clave',
                        text: 'Clave'  
                      }, 
                      {
                        dataField: 'TipoDeduccion',
                        text: 'TipoDePago'
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
          }
        }
      } 

      console.log( event.target.parentNode.parentNode ); 

      const data =  expandData[ (row.id) -1 ][indexx]; 
      } catch( error ) { console.log(error); }

      

        return (
          <div> 
          <h2>{title}</h2>
          <BootstrapTable
            keyField={expandDataKey}
            data={data}
            columns={dataColumnsExpand_}
            striped
            hover
            condensed
          /></div> 
        );
      },
    };
    return (
      <>
        <BootstrapTable
          id="emp"
          keyField={dataKey}
          data={tableData}
          columns={tableColumns}
          pagination={paginationFactory(options)}
          expandRow={expandData && expandRow}
          striped
          hover
          condensed
        />
        <hr />
        <ReactHTMLTableToExcel
          className="btn btn-info"
          table="emp"
          filename="SellsByClient"
          sheet="Sheet"
          buttonText="EXPORTAR A EXCEL"
        />
      </>
    );
  }
  return (
    <>
      <BootstrapTable
        id="emp"
        keyField={dataKey}
        data={tableData}
        columns={tableColumns}
        pagination={paginationFactory(options)}
        striped
        hover
        condensed
      />
      <hr />
      <ReactHTMLTableToExcel
        className="btn btn-info"
        table="emp"
        filename="SellsByClient"
        sheet="Sheet"
        buttonText="Exportar a excel"
      />
    </>
  );
};

export default ReportTable;

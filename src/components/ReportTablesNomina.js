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
      let titulo = "Complementarios"; 
      try { console.log( event.target ); } catch( error ) { console.log(error); return; }

      console.log( event.target ); 
      console.log( event.target.parentNode ); 
      console.log( event.target.parentNode.parentNode ); 
      
      try{ 
        console.log( expandData[0][ (row.id-1) ]) 
      } catch( error ) { return; }

      const data =  expandData[0][ (row.id-1) ];   

      console.log(data); 
      
      try { 
      if( data[0].MonedaDR.length < 2 ) return(
                                                <div style={{textAlign: "center"}}>
                                                  <p>Sin registro de pago complementario</p>
                                                </div>); } catch( error ) { }
        return (
          <div> 
          
          <BootstrapTable
            keyField={expandDataKey}
            data={data}
            columns={expandColumns}
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

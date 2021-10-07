import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import usePaginationOptions from '../hooks/usePaginationOptions';

import '../styles/components/ReportTable.css';

const ReportTable = ({
  tableData,
  tableColumns,
  dataKey,
  expandData = null,
  expandColumns = null,
  expandDataKey = null,
  selectRow = null,
}) => {
  const [options] = usePaginationOptions();
  if (expandData && expandColumns && expandDataKey) {
    const expandRow = {
      renderer: (row) => {
        const filterData = expandData.filter((dataRow) => {
          if (row.rfc !== undefined) return dataRow[0].rfc === row.rfc;
          return dataRow[0].rfc === row._id.rfc;
        });
        const data = filterData[0].map((innerData) => innerData);

        return (
          <BootstrapTable
            keyField={expandDataKey}
            data={data}
            columns={expandColumns}
            headerClasses="table-header"
            striped
            hover
            condensed
          />
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
          headerClasses="table-header"
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
          buttonText="Exportar a Excel"
        />
      </>
    );
  }
  if(selectRow){
    return (
      <>
        <BootstrapTable
          id="emp"
          keyField={dataKey}
          data={tableData}
          columns={tableColumns}
          pagination={paginationFactory(options)}
          headerClasses="table-header"
          striped
          hover
          condensed
          selectRow = {selectRow && selectRow}
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
  }
  
  return (
    <>
      <BootstrapTable
        id="emp"
        keyField={dataKey}
        data={tableData}
        columns={tableColumns}
        pagination={paginationFactory(options)}
        headerClasses="table-header"
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

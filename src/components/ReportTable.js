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
    const expandRow = {
      renderer: (row) => {
        const filterData = expandData.filter(
          (dataRow) => dataRow[0].rfc === row.rfc
        );
        const data = filterData[0].map((innerData) => innerData);
        return (
          <BootstrapTable
            keyField={expandDataKey}
            data={data}
            columns={expandColumns}
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

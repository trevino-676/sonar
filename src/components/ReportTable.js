import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ReportTable = ({
  tableData,
  tableColumns,
  dataKey,
  expandData = null,
  expandColumns = null,
  expandDataKey = null,
}) => {
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
        pagination={paginationFactory()}
        expandRow={expandData && expandRow}
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

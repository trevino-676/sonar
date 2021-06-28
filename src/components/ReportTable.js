import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
    <BootstrapTable
      keyField={dataKey}
      data={tableData}
      columns={tableColumns}
      pagination={paginationFactory()}
      expandRow={expandData && expandRow}
    />
  );
};

export default ReportTable;

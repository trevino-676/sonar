import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const DataTable = ({ tableData, tableColumns, dataKey, onModify, onSelected }) => {
  const [selected, setSelected] = useState([]);
  const onSelectRow = (row) => {
    const findID = selected.find((data) => data._id.$oid === row._id.$oid);
    if (!findID) {
      setSelected([row]);
    } else {
      selected.splice(selected.indexOf(row), 1);
    }
    onSelected(selected);
  };
  const selectedRowProp = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#91c4f7',
    hideSelectColumn: true,
    onSelect: onSelectRow,
  };
  const options = {
    onDoubleClick: (e, row) => onModify(row),
  };

  return (
    <BootstrapTable
      keyField={dataKey}
      data={tableData}
      columns={tableColumns}
      selectRow={selectedRowProp}
      rowEvents={options}
    />
  );
};

export default DataTable;

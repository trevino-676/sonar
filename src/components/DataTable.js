import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const DataTable = ({ data, columns, key, onModify, onSelected }) => {
  const [selected, setSelected] = useState([]);
  const onSelectRow = (idRow) => {
    const findID = selected.find((id) => id === idRow);
    if (!findID) {
      setSelected([...selected, idRow]);
    } else {
      selected.splice(selected.indexOf(idRow), 1);
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
    onRowDoubleClick: (row) => onModify(row),
  };

  return (
    <BootstrapTable
      keyField={key}
      data={data}
      columns={columns}
      selectRow={selectedRowProp}
      options={options}
      pagination
    />
  );
};

export default DataTable;

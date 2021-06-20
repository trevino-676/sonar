import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';

const DataTable = ({
  tableData,
  tableColumns,
  dataKey,
  onModify,
  onSelected,
  onDelete,
}) => {
  const onSelectRow = (row) => {
    onSelected(row);
  };
  const selectedRowProp = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#91c4f7',
    hideSelectColumn: true,
  };
  const options = {
    onClick: (e, row) => onSelectRow(row),
  };

  const actionButtonsColumn = {
    text: 'Acciones',
    formatter: (cell, row) => (
      <div>
        <Button onClick={() => onModify(row)}>
          <i className="far fa-edit" />
        </Button>
        <Button onClick={() => onDelete(row._id.$oid)} variant="danger">
          <i className="far fa-trash-alt" />
        </Button>
      </div>
    ),
    align: 'center',
  };

  return (
    <BootstrapTable
      keyField={dataKey}
      data={tableData}
      columns={[...tableColumns, actionButtonsColumn]}
      selectRow={selectedRowProp}
      rowEvents={options}
      pagination={paginationFactory()}
    />
  );
};

export default DataTable;

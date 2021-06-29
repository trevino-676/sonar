import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';

import usePaginationOptions from '../hooks/usePaginationOptions';

const DataTable = ({
  tableData,
  tableColumns,
  dataKey,
  onModify,
  onDelete,
}) => {
  const [options] = usePaginationOptions();
  const selectedRowProp = {
    mode: 'radio',
    clickToSelect: true,
    bgColor: '#91c4f7',
    hideSelectColumn: true,
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
      pagination={paginationFactory(options)}
      striped
      hover
      condensed
    />
  );
};

export default DataTable;

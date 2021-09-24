import React from 'react';

const usePaginationOptions = () => {
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando { from } de { to }.
      <br />
      Total de registros: {size}.
    </span>
  );

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      { text: '10', value: 10 },
      { text: '20', value: 20 },
    ],
  };

  return [options];
};

export default usePaginationOptions;

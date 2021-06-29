import React from 'react';

const usePaginationOptions = () => {
  const customTotal = () => (
    <span className="react-bootstrap-table-pagination-total">
      Registros por pagina.
    </span>
  );

  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
    ],
  };

  return [options];
};

export default usePaginationOptions;

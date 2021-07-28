const useDataColumns = (formatter) => {
  const dataColumns = [
    {
      dataField: '_id.empleado',
      text: 'Empleado',
      sort: true,
    },
    {
      dataField: '_id.rfc',
      text: 'RFC',
      sort: true,
    },
    {
      dataField: 'total_grabado',
      text: 'Gravado',
      align: 'right',
      formatter,
      sort: true,
    },
    {
      dataField: 'total_exento',
      text: 'Exento',
      align: 'right',
      formatter,
      sort: true,
    },
    {
      dataField: 'total_sueldo',
      text: 'Sueldo',
      align: 'right',
      formatter,
      sort: true,
    },
  ];

  return [dataColumns];
};

export default useDataColumns;

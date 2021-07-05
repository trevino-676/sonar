const useDataColumns = (formatter) => {
  const dataColumns = [
    {
      dataField: '_id.empleado',
      text: 'Empleado',
    },
    {
      dataField: '_id.rfc',
      text: 'RFC',
    },
    {
      dataField: 'total_grabado',
      text: 'Gravado',
      align: 'right',
      formatter,
    },
    {
      dataField: 'total_exento',
      text: 'Excento',
      align: 'right',
      formatter,
    },
    {
      dataField: 'total_sueldo',
      text: 'Sueldo',
      align: 'right',
      formatter,
    },
  ];

  return [dataColumns];
};

export default useDataColumns;

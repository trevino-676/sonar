const useDataColumns = (formatter) => {
  const handleFormatter = (cell) => formatter('en-US', cell);
  const columns = [
    {
      dataField: '_id.clave',
      text: 'Clave de retencion',
      sort: true,
    },
    {
      dataField: 'tipo_factor',
      text: 'Tipo factor',
      sort: true,
    },
    {
      dataField: '_id.tasa_cuota',
      text: 'Tasa Cuota',
      sort: true,
    },
    {
      dataField: 'retencion',
      text: 'Retencion',
      sort: true,
      formatter: handleFormatter,
    },
    {
      dataField: 'importe',
      text: 'Importe',
      sort: true,
      formatter: handleFormatter,
    },
  ];
  return [columns];
};

export default useDataColumns;

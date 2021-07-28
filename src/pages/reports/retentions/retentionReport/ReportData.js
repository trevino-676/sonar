const useDataColumns = (formatter) => {
  const handleFormatter = (cell) => formatter('en-US', cell);
  const columns = [
    {
      dataField: '_id.clave',
      text: 'Clave de retencion',
      sort: true,
    },
    {
      dataField: 'clave',
      text: 'Descripcion',
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
      align: 'right',
    },
    {
      dataField: 'retencion',
      text: 'Retencion',
      sort: true,
      formatter: handleFormatter,
      align: 'right',
    },
    {
      dataField: 'importe',
      text: 'Importe',
      sort: true,
      formatter: handleFormatter,
      align: 'right',
    },
  ];
  return [columns];
};

export default useDataColumns;

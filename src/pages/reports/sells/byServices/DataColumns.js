const useDataColumns = (formatter) => {
  const columns = [
    {
      dataField: '_id.servicio',
      text: 'Servicio',
      sort: true
    },
    {
      dataField: '_id.clave',
      text: 'Clave servicio',
      sort: true
    },
    {
      dataField: '_id.codigo',
      text: 'Codigo servicio',
      sort: true
    },
    {
      dataField: 'cantidad',
      text: 'Cantidad',
      align: 'right',
      sort: true
    },
    {
      dataField: 'precio_unitario',
      text: 'Precio unitario',
      align: 'right',
      formatter,
      sort: true
    },
    {
      dataField: 'importe',
      text: 'Importe',
      align: 'right',
      formatter,
      sort: true
    },
  ];

  return [columns];
};

export default useDataColumns;

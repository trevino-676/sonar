const useDataColumns = (formatter) => {
  const columns = [
    {
      dataField: '_id.servicio',
      text: 'Servicio',
    },
    {
      dataField: '_id.clave',
      text: 'Clave servicio',
    },
    {
      dataField: '_id.codigo',
      text: 'Codigo servicio',
    },
    {
      dataField: 'cantidad',
      text: 'Cantidad',
      align: 'right',
    },
    {
      dataField: 'precio_unitario',
      text: 'Precio unitario',
      align: 'right',
      formatter,
    },
    {
      dataField: 'importe',
      text: 'Importe',
      align: 'right',
      formatter,
    },
  ];

  return [columns];
};

export default useDataColumns;

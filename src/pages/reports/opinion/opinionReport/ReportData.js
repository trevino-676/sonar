const useDataColumns = () => {
    const columns = [
      {
        dataField: '_id',
        text: 'RFC',
      },
      {
        dataField: 'Nombre',
        text: 'Proveedor',
      },
      {
        dataField: 'Opinion_comp',
        text: 'Estatus',
      },
    ];
  
    return [columns];
  };
  
  export default useDataColumns;
  
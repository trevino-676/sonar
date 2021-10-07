import React from 'react';

const useDataColumns = () => {
    const columns = [
      {
        dataField: '_id',
        text: 'RFC',
        editable:false
      },
      {
        dataField: 'Nombre',
        text: 'Proveedor',
        editable:false
      },
      {
        dataField: 'Opinion_comp',
        text: 'Estatus',
        editable:false
      },
      {
        text: 'Email',
        formatter : () =>(
          <>
          <input type="text" name="email"></input>
          </>
        ),   
        
      }
    ];

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: '#B1BEEE'
    };


    return [columns,selectRow];
  };
  
  export default useDataColumns;
  
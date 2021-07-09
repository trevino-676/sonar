import { useState } from 'react';

const useSellsFilterForm = () => {
  const [filter, setFilter] = useState({
    from_date: null,
    to_date: null,
    rfc: null,
    status: null,
    amount: null,
    'datos.Rfc': null,
  });
  const FilterForm = [
    {
      label: 'Empresa',
      text: 'text',
      name: 'datos.Rfc',
    },
    {
      label: 'Desde',
      type: 'date',
      name: 'from_date',
    },
    {
      label: 'Hasta',
      type: 'date',
      name: 'to_date',
    },
    {
      label: 'RFC',
      type: 'text',
      name: 'rfc',
    },
    {
      label: 'Estatus',
      type: 'text',
      name: 'status',
    },
  ];
  const handleChangeFilter = (event) => {
    let dateValue = 0;
    if (event.target.name === 'from_date') {
      dateValue = `${event.target.value}T00:00:00`;
    } else if (event.target.name === 'to_date') {
      dateValue = `${event.target.value}T23:59:59`;
    }

    setFilter({
      ...filter,
      [event.target.name]: dateValue === 0 ? event.target.value : dateValue,
    });
  };

    const getTextFilters = () => {
        let textFilters = '';
        if (filter['datos.Rfc']){
            textFilters += `Empresa: ${filter['datos.Rfc']}, `;
        }
        if (filter.from_date){
            textFilters += `Desde: ${filter.from_date}, `;
        }
        if (filter.to_date) {
            textFilters += `Hasta: ${filter.to_date}, `;
        }
        if (filter.rfc){
            textFilters += `Cliente: ${filter.rfc}, `;
        }
        if (filter.status) {
            textFilters += `Estatus: ${filter.status}`;
        }
        return textFilters;
    };

  return [filter, FilterForm, handleChangeFilter, getTextFilters];
};

export default useSellsFilterForm;

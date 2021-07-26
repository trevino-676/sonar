import { useState } from 'react';

const useFilterForm = () => {
  const [filter, setFilter] = useState({
    from_date: null,
    to_date: null,
    rfc: null,
    status: null,
  });

  const handleChangeFilter = (event) => {
    let value = null;
    if (event.target.name === 'from_date')
      value = `${event.target.value}T00:00:00`;
    if (event.target.name === 'to_date')
      value = `${event.target.value}T23:59:59`;
    setFilter({
      ...filters,
      [event.target.name]: value || event.target.value,
    });
  };

  const filterFields = [
    {
      label: 'Estatus',
      type: 'text',
      name: 'status',
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
    }
  ];

    const getTextFilters = () => {
        let text = '';
        if (filter.status)
            text += `Estatus: ${filter.status}, `;
        if (filter.from_date)
            text += `Desde: ${filter.from_date}, `;
        if (filter.to_date)
            text += `Hasta: ${filter.to_date}, `;
        if (filter.rfc)
            text += `RFC: ${filter.rfc}, `;
        return text
    }
   
 return [filter, handleChangeFilter, filterFields, getTextFilters];
};

export default useFilterForm;


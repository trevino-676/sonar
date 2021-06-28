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
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  return [filter, FilterForm, handleChangeFilter];
};

export default useSellsFilterForm;

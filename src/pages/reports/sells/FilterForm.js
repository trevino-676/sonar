import { useState } from 'react';

const useSellsFilterForm = () => {
  const [filter, setFilter] = useState({
    from_date: '',
    to_date: '',
    rfc: '',
    status: '',
    amount: '',
  });
  const FilterForm = [
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

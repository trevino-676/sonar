import { useState } from 'react';

const useFilterForm = () => {
  const [filter, setFilter] = useState({
    'datos.Rfc': null,
    from_date: null,
    to_date: null,
  });

  const handleChangeFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const FilterForm = [
    {
      label: 'Empresa',
      type: 'text',
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
  ];

  return [filter, handleChangeFilter, FilterForm];
};

export default useFilterForm;

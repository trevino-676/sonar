import { useState } from 'react';

const useFiltersTaxablePerceptions = () => {
  const [filter, setFilter] = useState({
    'datos.Rfc': null,
    from_date: null,
    to_date: null,
    rfc: null,
  });

  const handleChangeFilter = (event) => {
    let value = null;
    if (event.target.name === 'from_date') {
      value = `${event.target.value}T00:00:00`;
    }

    if (event.target.name === 'to_date') {
      value = `${event.target.value}T23:59:59`;
    }

    setFilter({ ...filter, [event.target.name]: value || event.target.value });
  };

  const filterFields = [
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
    {
      label: 'Empleado (rfc)',
      type: 'text',
      name: 'rfc',
    },
  ];

  return [filter, handleChangeFilter, filterFields];
};

export default useFiltersTaxablePerceptions;

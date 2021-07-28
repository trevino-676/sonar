import { useState } from 'react';

const useFiltersTaxablePerceptions = (companies) => {
  const [filter, setFilter] = useState({
    'datos.Rfc': null,
    from_date: null,
    to_date: null,
    rfc: null,
    name: null,
  });

  const _companiesOptions = companies.map((company) => ({
    value: company.rfc,
    text: company.name,
  }));

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
      type: 'Select',
      name: 'datos.Rfc',
      options: _companiesOptions,
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
    {
      label: 'Empleado',
      type: 'text',
      name: 'name',
    },
  ];

  const getTextFilters = () => {
    let text = '';
    if (filter['datos.Rfc']) text += `Empresa: ${filter['datos.Rfc']}, `;
    if (filter.from_date) text += `Desde: ${filter.from_date.split('T')[0]}, `;
    if (filter.to_date) text += `Hasta: ${filter.to_date.split('T')[0]}, `;
    if (filter.rfc) text += `Empleado (RFC): ${filter.rfc}, `;
    if (filter.name) text += `Empleado: ${filter.name}`;
    return text;
  };

  return [filter, handleChangeFilter, filterFields, getTextFilters];
};

export default useFiltersTaxablePerceptions;

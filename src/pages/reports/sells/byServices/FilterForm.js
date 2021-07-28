import { useState } from 'react';

const useFilterForm = (companies) => {
  const [filters, setFilter] = useState({
    'datos.Rfc': null,
    from_date: null,
    to_date: null,
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
    setFilter({ ...filters, [event.target.name]: value || event.target.value });
  };

  const formFields = [
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
  ];

  const getTextFilters = () => {
    let text = '';
    if (filters['datos.Rfc']) text += `Empresa: ${filters['datos.Rfc']}, `;
    if (filters.from_date)
      text += `Desde: ${filters.from_date.split('T')[0]}, `;
    if (filters.to_date) text += `Hasta: ${filters.to_date.split('T')[0]} `;

    return text;
  };

  return [filters, handleChangeFilter, formFields, getTextFilters];
};

export default useFilterForm;

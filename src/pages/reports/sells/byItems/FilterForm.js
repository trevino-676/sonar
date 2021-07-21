import { useState } from 'react';

const useFilterForm = (companies) => {
  const [filter, setFilter] = useState({
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

    if (event.target.name === 'from_date')
      value = `${event.target.value}T00:00:00`;
    if (event.target.name === 'to_date')
      value = `${event.target.value}T23:59:59`;

    setFilter({ ...filter, [event.target.name]: value || event.target.value });
  };

  const FilterForm = [
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

  const getTextFilter = () => {
    let textFilter = '';
    if (filter['datos.Rfc']) textFilter += `Empresa: ${filter['datos.Rfc']}, `;
    if (filter.from_date) textFilter += `Desde: ${filter.from_date}, `;
    if (filter.to_date) textFilter += `Hasta: ${filter.to_date}`;

    return textFilter;
  };

  return [filter, handleChangeFilter, FilterForm, getTextFilter];
};

export default useFilterForm;

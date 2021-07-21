import { useState } from 'react';

const useSellsFilterForm = (companies) => {
  const [filter, setFilter] = useState({
    from_date: null,
    to_date: null,
    rfc: null,
    status: null,
    amount: null,
    'datos.Rfc': null,
    name: null,
  });

  const _companiesOptions = companies.map((company) => ({
    value: company.rfc,
    text: company.name,
  }));

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
    {
      label: 'RFC',
      type: 'text',
      name: 'rfc',
    },
    {
      label: 'Cliente',
      type: 'text',
      name: 'name',
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
    if (filter['datos.Rfc']) {
      textFilters += `Empresa: ${filter['datos.Rfc']}, `;
    }
    if (filter.from_date) {
      textFilters += `Desde: ${filter.from_date}, `;
    }
    if (filter.to_date) {
      textFilters += `Hasta: ${filter.to_date}, `;
    }
    if (filter.rfc) {
      textFilters += `Cliente: ${filter.rfc}, `;
    }
    if (filter.status) {
      textFilters += `Estatus: ${filter.status}, `;
    }
    if (filter.name) textFilters += `Empleado: ${filter.name}`;
    return textFilters;
  };

  return [filter, FilterForm, handleChangeFilter, getTextFilters];
};

export default useSellsFilterForm;

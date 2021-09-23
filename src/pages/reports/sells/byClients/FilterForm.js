import { useState } from 'react';
import useFormatters from '../../../../hooks/useFormatters';

const useSellsFilterForm = (companies, company, dates) => {
  const {dateFiltersFormater} = useFormatters();
  const [filter, setFilter] = useState({
    from_date: dates.fromDate,
    to_date: dates.toDate,
    rfc: null,
    status: null,
    amount: null,
    'datos.Rfc': company,
    name: null,
  });

  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
  }));

  const FilterForm = [
    {
      label: 'Empresa',
      type: 'Select',
      name: 'datos.Rfc',
      options: _companiesOptions,
      default: company,
    },
    {
      label: 'Desde',
      type: 'date',
      name: 'from_date',
      default: dates.fromDate,
    },
    {
      label: 'Hasta',
      type: 'date',
      name: 'to_date',
      default: dates.toDate,
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
      textFilters += `Desde: ${dateFiltersFormater(filter.from_date.split('T')[0])}, `;
    }
    if (filter.to_date) {
      textFilters += `Hasta: ${dateFiltersFormater(filter.to_date.split('T')[0])}, `;
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

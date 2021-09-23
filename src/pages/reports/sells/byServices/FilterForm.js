import { useState } from 'react';
import useFormatters from '../../../../hooks/useFormatters';

const useFilterForm = (companies, company = null, dates = null) => {
  const {dateFiltersFormater} = useFormatters();
  const [filters, setFilter] = useState({
    'datos.Rfc': company || null,
    from_date: dates.fromDate || null,
    to_date: dates.toDate || null,
  });

  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
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
  ];

  const getTextFilters = () => {
    let text = '';
    if (filters['datos.Rfc']) text += `Empresa: ${filters['datos.Rfc']}, `;
    if (filters.from_date)
      text += `Desde: ${dateFiltersFormater(filters.from_date.split('T')[0])}, `;
    if (filters.to_date) text += `Hasta: ${dateFiltersFormater(filters.to_date.split('T')[0])} `;

    return text;
  };

  return [filters, handleChangeFilter, formFields, getTextFilters];
};

export default useFilterForm;

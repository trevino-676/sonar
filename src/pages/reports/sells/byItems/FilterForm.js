import { useState } from 'react';
import useFormatters from '../../../../hooks/useFormatters';

const useFilterForm = (companies, company = null, dates = null) => {
  const {dateFiltersFormater} = useFormatters();
  const [filter, setFilter] = useState({
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

  const getTextFilter = () => {
    let textFilter = '';
    if (filter['datos.Rfc']) textFilter += `Empresa: ${filter['datos.Rfc']}, `;
    if (filter.from_date)
      textFilter += `Desde: ${dateFiltersFormater(filter.from_date.split('T')[0])}, `;
    if (filter.to_date) textFilter += `Hasta: ${dateFiltersFormater(filter.to_date.split('T')[0])}`;

    return textFilter;
  };

  return [filter, handleChangeFilter, FilterForm, getTextFilter];
};

export default useFilterForm;

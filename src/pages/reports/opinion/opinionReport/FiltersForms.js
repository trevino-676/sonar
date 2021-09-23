import { useState } from 'react';
import useFormatters from '../../../../hooks/useFormatters';

const useFiltersForm = (dispatch, action, companies) => {
  const {dateFiltersFormater} = useFormatters();
  const [filter, setFilter] = useState({
    from_date: null,
    to_date: null,
    'datos.Rfc': null,
    Opinion_comp: null,
    private: null,
  });

  const handleChangeFilter = (event) => {
    let value = null;
    if (event.target.name === 'from_date')
      value = `${event.target.value}T00:00:00`;
    if (event.target.name === 'to_date')
      value = `${event.target.value}T23:59:59`;
    if (event.target.name === 'Opinion_comp' && event.target.value === 'Private') {
      setFilter({ ...filter, Opinion_comp: 'false', private: 'true' })

      return;
    }
    if (event.target.name === 'Opinion_comp' && event.target.value !== 'Private') {
      setFilter({ ...filter, Opinion_comp: event.target.value, private: null })

      return;
    }
    setFilter({
      ...filter,
      [event.target.name]: value || event.target.value,
    });
  };

  const _companiesOptions = companies.map((company) => ({
    value: company.rfc,
    text: company.name,
    id: company._id.$oid,
  }));

  const filterFields = [
    {
      label: 'Empresa',
      type: 'Select',
      name: 'datos.Rfc',
      options: _companiesOptions,
    },
    {
      label: 'Estatus',
      type: 'Select',
      name: 'Opinion_comp',
      options: [
        {
          value: 'true',
          text: 'Positiva',
        },
        {
          value: 'false',
          text: 'Negativa',
        },
        {
          value: 'null',
          text: 'Pendiente',
        },
        {
          value: 'Private',
          text: 'Privada',
        },
      ],
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
      name: '_id',
    }
  ];



  const submitFilters = () => {
    dispatch(action(filter));
  };

  const getTextFilters = () => {
    let text = '';
    if (filter.status)
      text += `Estatus: ${filter.Opinion_comp}, `;
    if (filter.from_date)
      text += `Desde: ${dateFiltersFormater(filter.from_date)}, `;
    if (filter.to_date)
      text += `Hasta: ${dateFiltersFormater(filter.to_date)}, `;
    if (filter.rfc)
      text += `RFC: ${filter._id}, `;
    return text
  }

  return [handleChangeFilter, filterFields, submitFilters, getTextFilters];
};

export default useFiltersForm;


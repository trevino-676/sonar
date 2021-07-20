// TODO: Quitar el codigo hardcodeado de las opciones de empresas y tipos de retenciones
import { useState } from 'react';

const useFilterForm = (dispatch, action, companiesOptions, typeOptions) => {
  const [filters, setFilters] = useState({
    'datos.Rfc': null,
    from_date: null,
    to_date: null,
    type: null,
  });

  const handleChangeFilter = (event) => {
    let value = null;
    if (event.target.name === 'from_date')
      value = `${event.target.value}T00:00:00`;
    if (event.target.name === 'to_date')
      value = `${event.target.value}T23:59:59`;
    setFilters({
      ...filters,
      [event.target.name]: value || event.target.value,
    });
  };

  const formFields = [
    {
      label: 'Empresa',
      type: 'Select',
      name: 'datos.Rfc',
      options: [
        {
          value: 'PGT190401156',
          text: 'LA PICANHA GRILL TACOS SA DE CV',
        },
        {
          value: 'GPR070228780',
          text: 'GLOBAL PRESER, S.A. DE C.V.',
        },
      ],
    },
    {
      label: 'Tipo retencion',
      type: 'Select',
      name: 'type',
      options: [
        {
          value: '001',
          text: 'ISR',
        },
        {
          value: '002',
          text: 'IVA',
        },
        {
          value: '003',
          text: 'IEPS',
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
  ];

  const submitFilters = () => {
    dispatch(action(filters));
  };

  const getTextFilters = () => {
    let text = '';
    if (filters['datos.Rfc']) text += `Empresa: ${filters['datos.Rfc']}, `;
    if (filters.from_date) text += `Desde: ${filters.from_date}, `;
    if (filters.to_date) text += `Hasta: ${filters.to_date}, `;
    if (filters.type) text += `Tipo retencion: ${filters.type}`;

    return text;
  };

  return [handleChangeFilter, formFields, submitFilters, getTextFilters];
};

export default useFilterForm;
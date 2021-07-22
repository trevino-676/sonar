const useTaxablePerceptionsExpandData = (data, formatter) => {
  const expandedColumns = [
    {
      dataField: 'tipo',
      text: 'Tipo',
    },
    {
      dataField: 'clave',
      text: 'Clave',
    },
    {
      dataField: 'concepto',
      text: 'Conceptos',
    },
    {
      dataField: 'gravado',
      text: 'Importe gravado',
      align: 'right',
      formatter,
    },
    {
      dataField: 'excento',
      text: 'Importe excento',
      align: 'right',
      formatter,
    },
  ];
  alert('mje'); 
  const expandedData = data
    ? data.map((row) => {
        const innerData = row.tipo_percepcion.map((perception, index) => ({
          key: `${row.uuid}//${index}`,
          rfc: row._id.rfc,
          tipo: perception,
          clave: row.claves[index],
          concepto: row.conceptos[index],
          gravado: row.importes_gravados[index],
          excento: row.importes_exento[index],
        }));
        return innerData;
      })
    : null;

  return [expandedColumns, expandedData];
};

export default useTaxablePerceptionsExpandData;
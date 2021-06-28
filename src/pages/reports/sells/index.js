import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SellsReportsActions from '../../../actions/SellsReport.action';
import useSellsFilterForm from './FilterForm';
import FilterBar from '../../../components/FiltersBar';
import ReportTable from '../../../components/ReportTable';

import '../../../styles/reports.css';

const SellsByClient = () => {
  const dispatch = useDispatch();
  let expandedData = [];
  const dataReport = useSelector((state) => state.sell_reports.by_clients);
  const [filter, FilterForm, handleChangeFilter] = useSellsFilterForm();
  useEffect(() => {
    document.title = 'Reportes | Ventas por clientes';
  }, [dataReport]);
  const onSubmit = (filters) => {
    dispatch(SellsReportsActions.byClients(filters));
  };
  const priceFormatter = (cell) => <span>$ {cell.toFixed(2)}</span>;
  const dateFormatter = (cell) => {
    const date = new Date(cell);
    return <span>{date.toLocaleString()}</span>;
  };
  const dataFields = [
    {
      dataField: '_id',
      text: 'Cliente',
    },
    {
      dataField: 'rfc',
      text: 'RFC',
    },
    {
      dataField: 'subtotal',
      text: 'Subtotal',
      align: 'right',
      formatter: priceFormatter,
    },
    {
      dataField: 'iva',
      text: 'IVA',
      align: 'right',
      formatter: priceFormatter,
    },
    {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      formatter: priceFormatter,
    },
  ];
  const expandedColumns = [
    {
      dataField: 'fecha',
      text: 'Fecha',
      formatter: dateFormatter,
    },
    {
      dataField: 'serie',
      text: 'Serie',
    },
    {
      dataField: 'folio',
      text: 'Folio',
    },
    {
      dataField: 'metodo_pago',
      text: 'Metodo de pago',
    },
  ];

  if (dataReport) {
    expandedData = dataReport.map((data) => {
      const innerData = data.folio.map((folioData, folioIndex) => ({
        key: `${data.serie[folioIndex]}-${folioData}-${folioIndex}`,
        rfc: data.rfc,
        folio: folioData,
        serie: data.serie[folioIndex],
        metodo_pago: data.metodo_pago[folioIndex],
        fecha: data.fechas[folioIndex],
      }));
      return innerData;
    });
  }

  return (
    <Container>
      <FilterBar
        dataFields={FilterForm}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => {
          onSubmit(filter);
        }}
      />
      <div className="report-area">
        {dataReport && (
          <ReportTable
            tableData={dataReport}
            tableColumns={dataFields}
            expandData={expandedData}
            expandColumns={expandedColumns}
            expandDataKey="key"
            dataKey="rfc"
          />
        )}
      </div>
    </Container>
  );
};

export default SellsByClient;

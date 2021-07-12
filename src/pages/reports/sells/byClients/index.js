import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SellsReportsActions from '../../../../actions/SellsReport.action';
import useSellsFilterForm from './FilterForm';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import Routes from './BreadcrumbsRoutes';

import '../../../../styles/reports.css';

const SellsByClient = () => {
  const dispatch = useDispatch();
  let expandedData = [];
  const dataReport = useSelector((state) => state.sell_reports.by_clients);
  const [filter, FilterForm, handleChangeFilter, getTextFilters] =
    useSellsFilterForm();
  useEffect(() => {
    document.title = 'Reportes | Ventas por clientes';
  }, [dataReport]);
  const onSubmit = (filters) => {
    dispatch(SellsReportsActions.byClients(filters));
  };
  const priceFormatter = (cell) => {
    const price = Intl.NumberFormat('en-US').format(
      parseFloat(cell).toFixed(2)
    );
    return <span>${price}</span>;
  };
  const dateFormatter = (cell) => {
    const date = new Date(cell);
    return <span>{date.toLocaleString()}</span>;
  };
  const dataFields = [
    {
      dataField: '_id',
      text: 'Cliente',
      sort: true,
    },
    {
      dataField: 'rfc',
      text: 'RFC',
      sort: true,
    },
    {
      dataField: 'subtotal',
      text: 'Subtotal',
      sort: true,
      align: 'right',
      formatter: priceFormatter,
    },
    {
      dataField: 'iva',
      text: 'IVA',
      align: 'right',
      formatter: priceFormatter,
      sort: true,
    },
    {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      formatter: priceFormatter,
      sort: true,
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

  if (dataReport) {
    expandedData = dataReport.map((data) => {
      const innerData = data.folio.map((folioData, folioIndex) => ({
        key: `${data.serie[folioIndex]}-${folioData}-${folioIndex}`,
        rfc: data.rfc,
        folio: folioData,
        serie: data.serie[folioIndex],
        metodo_pago: data.metodo_pago[folioIndex],
        total: data.total_por_factura[folioIndex],
        subtotal: data.subtotal_por_factura[folioIndex],
        iva: data.iva_por_factura[folioIndex],
        fecha: data.fechas[folioIndex],
      }));
      return innerData;
    });
  }

  return (
    <Container>
      <h1 className="text-center">Reporte de ventas por clientes</h1>
      <BreadcrumbComponent routes={Routes} />
      <FilterBar
        dataFields={FilterForm}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => {
          onSubmit(filter);
        }}
        textFilter={getTextFilters()}
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

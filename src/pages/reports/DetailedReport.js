import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ReportTable from '../../components/ReportTable';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import SellsReportsActions from '../../actions/SellsReport.action';
import useReportTitle from '../../hooks/useReportTitle';
import useFormatters from '../../hooks/useFormatters';

const DetailedReport = () => {
  const location = useLocation();
  const { type, company } = location.state;
  let data = null;
  const dispatch = useDispatch();
  useReportTitle(`Sonar | ${type === 'sells' ? 'Clientes' : 'Proveedores'}`);
  const { currencyFormatter, DateFormatter } = useFormatters();
  const currency = (cell) => currencyFormatter('es-MX', cell);
  if (type === 'sells') {
    data = useSelector((state) => state.sell_reports.detailed_sells);
  } else {
    data = null;
  }
  useEffect(() => {
    if (type === 'sells') {
      dispatch(SellsReportsActions.detailedSells(company));
    }
  }, []);

  const tableColumns = [
    {
      dataField: 'receptor',
      text: 'Receptor',
      sort: true,
    },
    {
      dataField: 'receptor_rfc',
      text: 'RFC Receptor',
      sort: true,
    },
    {
      dataField: 'folio_fiscal',
      text: 'Folio fiscal',
      sort: true,
    },
    {
      dataField: 'serie',
      text: 'Serie',
      sort: true,
    },
    {
      dataField: 'folio',
      text: 'Folio',
      sort: true,
    },
    {
      dataField: 'fecha',
      text: 'Fecha de emisión',
      formatter: DateFormatter,
      sort: true,
    },
    {
      dataField: 'metodo_pago',
      text: 'Método de pago',
      sort: true,
    },
    {
      dataField: 'moneda',
      text: 'Moneda',
      sort: true,
    },
    {
      dataField: 'subtotal',
      text: 'Subtotal',
      sort: true,
      formatter: currency,
      align: 'right',
    },
    {
      dataField: 'impuesto',
      text: 'Impuestos',
      sort: true,
      formatter: currency,
      align: 'right',
    },
    {
      dataField: 'total',
      text: 'Total',
      sort: true,
      formatter: currency,
      align: 'right',
    },
  ];

  if (data) {
    data = data.map((item) => {
      if (item.receptor_rfc === 'XAXX010101000') {
        return { ...item, receptor: 'PUBLICO EN GENERAL' };
      }
      return { ...item };
    });
  }

  const routes = [
    {
      name: 'Inicio',
      path: '/',
    },
    {
      name: 'Clientes',
      path: '/clients',
    },
    {
      name: 'CFDIs emitidos',
      path: '#',
    },
  ];
  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">CFDIs emitidos</h1>
      {data && (
        <ReportTable
          tableData={data}
          tableColumns={tableColumns}
          dataKey="folio_fisacal"
        />
      )}
    </>
  );
};

export default DetailedReport;
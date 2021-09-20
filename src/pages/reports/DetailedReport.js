import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ReportTable from '../../components/ReportTable';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import SellsReportsActions from '../../actions/SellsReport.action';
import useReportTitle from '../../hooks/useReportTitle';
import useFormatters from '../../hooks/useFormatters';
import DetailedReportActions from '../../actions/detailed.action';

const DetailedReport = () => {
  const location = useLocation();
  const { type, company, dates } = location.state;
  let data = null;
  const dispatch = useDispatch();
  useReportTitle(`Sonar | ${type === 'sells' ? 'Clientes' : type === 'providers' ? 'Proveedores' : 'Distribución'}`);
  const { currencyFormatter, DateFormatter } = useFormatters();
  const currency = (cell) => currencyFormatter('es-MX', cell);
  
  switch (type) {
    case 'sells':
      data = useSelector((state) => state.sell_reports.detailed_sells);
      break;
    case 'providers':
      data = useSelector((state) => state.detailed.provider_detailed_report);
      break;
    case 'all':
      data = useSelector((state) => state.detailed.total_detailed_report);
      break;
    default:
      data = useSelector((state) => state.sell_reports.detailed_sells);
      break;
  }
  useEffect(() => {

    switch (type) {
      case 'sells':
        dispatch(SellsReportsActions.detailedSells(company, dates.fromDate, dates.toDate));
        break;
      case 'providers':
        dispatch(DetailedReportActions.getProviderDetailedReport(company, dates.fromDate, dates.toDate));
        break;
      case 'all':
        dispatch(DetailedReportActions.getTotalDetailedReport(company, dates.fromDate, dates.toDate));
        break;
      default:
        break;
  
    }
  }, []);

  const tableColumns = [
    {
      dataField: 'receptor',
      text: type === 'sells' ? 'Receptor' : 'Emisor',
      sort: true,
    },
    {
      dataField: 'receptor_rfc',
      text: type === 'sells' ? 'RFC Receptor' : 'RFC Emisor',
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
      name: type === 'sells' ? 'Cliente' : type === 'providers' ? 'Proveedores' : 'Distribución',
      path: type === 'sells' ? '/clients' : type === 'providers' ? '/providers' : 'cfdi',
    },
    {
      name: type === 'sells' ? 'CFDIs emitidos' : type === 'providers' ? 'CFDIs recibidos' : 'Distribución de CFDIs',
      path: '#',
    },
  ];
  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">
        CFDIs {type === 'sells' ? 'emitidos' : type === 'providers' ? 'recibidos' : ''}
      </h1>
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

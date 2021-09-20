/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ReportTable from '../../components/ReportTable';
import BreadcrumbComponent from '../../components/BreadcrumbComponent';
import SellsReportsActions from '../../actions/SellsReport.action';
import useReportTitle from '../../hooks/useReportTitle';
import useFormatters from '../../hooks/useFormatters';
import DetailedReportActions from '../../actions/detailed.action';
import FilterBar from '../../components/FiltersBar';

const getTitle = (type) => {
  switch (type) {
    case 'sells':
      return 'Clientes';
    case 'providers':
      return 'Proveedores';
    default:
      return 'Distribucion';
  }
};

const DetailedReport = () => {
  const location = useLocation();
  const { type, company, dates } = location.state;
  const [filters, setFilters] = useState({
    company: company || null,
    fromDate: dates.fromDate || null,
    toDate: dates.toDate || null,
  });
  let data = null;
  const dispatch = useDispatch();
  const title = getTitle(type);
  useReportTitle(`Sonar | ${title}`);
  const { currencyFormatter, DateFormatter } = useFormatters();
  const currency = (cell) => currencyFormatter('es-MX', cell);
  const companies = useSelector((state) => state.companies.companies);
  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
  }));

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
        dispatch(
          SellsReportsActions.detailedSells(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
        break;
      case 'providers':
        dispatch(
          DetailedReportActions.getProviderDetailedReport(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
        break;
      case 'all':
        dispatch(
          DetailedReportActions.getTotalDetailedReport(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
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
      name:
        type === 'sells'
          ? 'Cliente'
          : type === 'providers'
          ? 'Proveedores'
          : 'Distribución',
      path:
        type === 'sells'
          ? '/clients'
          : type === 'providers'
          ? '/providers'
          : 'cfdi',
    },
    {
      name: 'CFDIs emitidos',
      path: '#',
    },
  ];

  const reportFilters = [
    {
      label: 'Empresa',
      type: 'Select',
      name: 'company',
      default: filters.company,
      options: _companiesOptions,
    },
    {
      label: 'Desde',
      type: 'date',
      name: 'from_date',
      default: filters.fromDate,
    },
    {
      label: 'Hasta',
      type: 'date',
      name: 'to_date',
      default: filters.toDate,
    },
  ];

  const handleChangeFilter = (event) => {
    let value = null;
    if (event.target.name === 'from_date') {
      value = `${event.target.value}T00:00:00`;
    }
    if (event.target.name === 'to_date') {
      value = `${event.target.value}T23:59:59`;
    }
    setFilters({
      ...filters,
      [event.target.name]: value || event.target.value,
    });
  };

  const handleSubmit = (type, filters) => {
    switch (type) {
      case 'sells':
        dispatch(
          SellsReportsActions.detailedSells(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
        break;
      case 'providers':
        dispatch(
          DetailedReportActions.getProviderDetailedReport(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
        break;
      case 'all':
        dispatch(
          DetailedReportActions.getTotalDetailedReport(
            filters.company,
            filters.fromDate,
            filters.toDate
          )
        );
        break;
      default:
        break;
    }
  };

  const getTextFilters = () => {
    let text = '';
    if (filters.company) text += `Empresa: ${filters.company}, `;
    if (filters.fromDate) text += `Desde: ${filters.fromDate.split('T')[0]}, `;
    if (filters.toDate) text += `Hasta: ${filters.toDate.split('T')[0]} `;

    return text;
  };

  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">
        CFDIs{' '}
        {type === 'sells'
          ? 'emitidos'
          : type === 'providers'
          ? 'recibidos'
          : ''}
      </h1>
      <FilterBar
        dataFields={reportFilters}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => handleSubmit(type, filters)}
        textFilter={getTextFilters()}
      />
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

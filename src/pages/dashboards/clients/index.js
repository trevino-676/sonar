import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DonutComponent from '../../../components/DonutComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import routes from './BreadcrumbRoutes';
import AmountDisplay from '../../../components/AmountDisplayComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import SellsReportsActions from '../../../actions/SellsReport.action';
import SelectComponent from '../../../components/SelectInputComponent';
import CompanyActions from '../../../actions/company.action';

import '../../../styles/pages/Dashboard.css';

const ClientDashboard = () => {
  // TODO: Mover los titulos, top y data a archivos independientes.
  useReportTitle('Sonar | Clientes');
  const totalReport = useSelector((state) => state.sell_reports.total_sells);
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  const [company, setCompany] = useState({
    rfc: '',
  });
  const handleChangeCompany = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value,
    });
    dispatch(SellsReportsActions.totalSells(company.rfc));
  };
  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
    id: item._id.$oid,
  }));
  useEffect(() => {
    dispatch(SellsReportsActions.totalSells(company.rfc));
    dispatch(CompanyActions.getCompaniesByUser());
  }, []);
  const titles = [
    {
      title: 'Ventas por cliente',
      route: '/reports/sells/by_client',
    },
    {
      title: 'Ventas por producto',
      route: '/reports/sells/by_items',
    },
    {
      title: 'Ventas por servicios',
      route: '/reports/sells/by_services',
    },
  ];
  const top = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'];
  const data = [
    ['Clientes', 'Ventas'],
    ['Cliente 1', 200000.0],
    ['Cliente 2', 100000.0],
    ['Cliente 3', 50000.0],
    ['Cliente 4', 150000.0],
  ];

  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <div className="dashboard_title">
        <h1 className="title">Clientes</h1>
        <SelectComponent
          name="rfc"
          handleChange={handleChangeCompany}
          data={_companiesOptions}
        />
      </div>
      <div className="dashboard-content">
        {totalReport && (
          <AmountDisplay
            title="Ventas del mes"
            amount={totalReport.total}
            currency="es-MX"
            route="/"
          />
        )}
        {titles.map((title) => (
          <DonutComponent
            top={top}
            data={data}
            title={title.title}
            route={title.route}
          />
        ))}
      </div>
    </>
  );
};

export default ClientDashboard;

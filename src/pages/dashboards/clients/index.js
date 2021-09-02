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
import CFDIReports from '../../../service/clients/Clients.service';
import usePeriodData from '../../../hooks/usePeriodData';

import '../../../styles/pages/Dashboard.css';

const ClientDashboard = () => {
  // TODO: Mover los titulos, top y data a archivos independientes.
  useReportTitle('Sonar | Clientes');
  const totalReport = useSelector((state) => state.sell_reports.total_sells);
  const config = useSelector((state) => state.config.config);
  const [listDonut, setListDonut] = useState(null);
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  const [fromDate, toDate] = usePeriodData(config.period);
  const [company, setCompany] = useState(config.main_company);
  const [companyTitle, setCompanyTitle] = useState('');
  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
    setCompanyTitle(event.target.selectedOptions[0].text);
  };
  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
    id: item._id.$oid,
  }));

  useEffect(() => {
    dispatch(SellsReportsActions.totalSells(company, fromDate, toDate));
  }, [company]);

  useEffect(() => {
    const currentCompany = companies.filter(
      (item) => item.rfc === config.main_company
    );
    if (currentCompany.length > 0) {
      setCompanyTitle(currentCompany[0].name);
    }
  }, [companies]);

  useEffect(() => {
    setCompany(config.main_company);
    dispatch(SellsReportsActions.totalSells(company, fromDate, toDate));
    dispatch(CompanyActions.getCompaniesByUser());
    CFDIReports.groupRequest(
      'principal',
      company,
      'Receptor.Rfc',
      'datos.MetodoPago'
    )
      .then((data) => {
        const temp = {
          title: 'Metodos de pago',
          path: '/providers',
          top: [],
          data: [['Tipo', 'Cantidad']],
        };
        if (data) {
          data.forEach((d) => {
            temp.top.push('');
            temp.data.push([d._id, d.count]);
          });
        }
        setListDonut([
          temp,
          {
            title: 'Ventas por cliente',
            route: '/reports/sells/by_client',
            top: ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'],
            data: [
              ['Clientes', 'Ventas'],
              ['Cliente 1', 200000.0],
              ['Cliente 2', 100000.0],
              ['Cliente 3', 50000.0],
              ['Cliente 4', 150000.0],
            ],
          },
          {
            title: 'Ventas por producto',
            route: '/reports/sells/by_items',
            top: ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'],
            data: [
              ['Clientes', 'Ventas'],
              ['Cliente 1', 200000.0],
              ['Cliente 2', 100000.0],
              ['Cliente 3', 50000.0],
              ['Cliente 4', 150000.0],
            ],
          },
          {
            title: 'Ventas por servicios',
            route: '/reports/sells/by_services',
            top: ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4'],
            data: [
              ['Clientes', 'Ventas'],
              ['Cliente 1', 200000.0],
              ['Cliente 2', 100000.0],
              ['Cliente 3', 50000.0],
              ['Cliente 4', 150000.0],
            ],
          },
        ]);
      })
      .catch(console.log);
  }, []);
  const passData = {
    company,
    dates: { fromDate, toDate },
    type: 'sells',
  };
  return (
    <>
      <div className="dashboard-header">
        <BreadcrumbComponent routes={routes} />
        <div className="select">
          <SelectComponent
            className="select"
            data={_companiesOptions}
            name="rfc"
            handleChange={handleChangeCompany}
            defaultData={company}
          />
        </div>
      </div>
      <div className="dashboard_title">
        <h1 className="title">Clientes - {companyTitle}</h1>
      </div>
      <div className="dashboard-content">
        {totalReport && (
          <AmountDisplay
            title="Ventas del mes"
            amount={totalReport.total}
            currency="es-MX"
            route="/reports/detailed"
            data={passData}
          />
        )}
        {listDonut &&
          listDonut.map((title) => (
            <DonutComponent
              top={title.top}
              data={title.data}
              title={title.title}
              route={title.route}
              key={title.title}
            />
          ))}
      </div>
    </>
  );
};

export default ClientDashboard;

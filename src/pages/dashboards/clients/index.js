import React, { useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DonutComponent from '../../../components/DonutComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import routes from './BreadcrumbRoutes';
import AmountDisplay from '../../../components/AmountDisplayComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import SellsReportsActions from '../../../actions/SellsReport.action';
// import SelectComponent from '../../../components/SelectInputComponent';
import CompanyActions from '../../../actions/company.action';
import CFDIReports from '../../../service/clients/Clients.service';

import '../../../styles/pages/Dashboard.css';

const ClientDashboard = () => {
  // TODO: Mover los titulos, top y data a archivos independientes.
  useReportTitle('Sonar | Clientes');
  const totalReport = useSelector((state) => state.sell_reports.total_sells);
  const [listDonut, setListDonut] = useState(null);
  // const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  // const [company, setCompany] = useState({
  //   rfc: '',
  // });
  // const handleChangeCompany = (event) => {
  //   setCompany({
  //     ...company,
  //     [event.target.name]: event.target.value,
  //   });
  //   dispatch(SellsReportsActions.totalSells(company.rfc));
  // };
  // const _companiesOptions = companies.map((item) => ({
  //   value: item.rfc,
  //   text: item.name,
  //   id: item._id.$oid,
  // }));
  useEffect(() => {
    dispatch(SellsReportsActions.totalSells('PGT190401156'));
    dispatch(CompanyActions.getCompaniesByUser());
    CFDIReports.groupRequest('principal', 'PGT190401156', 'Receptor.Rfc', "datos.MetodoPago").then((data) => {
      let temp = {
        title:"Metodos de pago",
        path: '/providers',
        top: [],
        data: [['Tipo', 'Cantidad']],
      }
      if (data) {
        data.forEach(d => {
          temp.top.push('');
          temp.data.push([d._id, d.count]);
        })
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
          ]
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
          ]
        }
      ])
    }).catch(console.log);
  }, []);
  const passData = {
    company: 'PGT190401156',
    type: 'sells',
  };
  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <div className="dashboard_title">
        <h1 className="title">Clientes - LA PICANHA GRILL TACOS SA DE CV</h1>
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
        {listDonut && listDonut.map((title, i) => (
          <DonutComponent
            top={title.top}
            data={title.data}
            title={title.title}
            route={title.route}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default ClientDashboard;

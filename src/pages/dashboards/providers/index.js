import React, { useEffect, useState } from 'react';

import AmountDisplay from '../../../components/AmountDisplayComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import DonutComponent from '../../../components/DonutComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import routes from './BreadcrumbRoutes';
import EfoList from '../../../components/EfoListComponent';
import TotalServirce from '../../../service/reports/Total.service';
import CFDIReports from '../../../service/clients/Clients.service';

import '../../../styles/pages/Dashboard.css';

const ProviderDashboard = () => {
  useReportTitle('Sonar | Proveedores');
  const [total, setTotal] = useState(null);
  const [providerData, setProviderData] = useState(null);
  useEffect(async () => {
    const params = {
      fromDate: '2021-05-01T00:00:00',
      toDate: '2021-05-31T23:59:59',
      field: 'Receptor.Rfc',
      rfc: 'PGT190401156',
    };
    let graficsData = [];
    TotalServirce.getTotalData(params).then((resp)=>{
      setTotal(resp.total);
    });
    let comp = await CFDIReports.countRequest('payment', 'PGT190401156', 'Receptor.Rfc', "datos.Total", "Diferencia");
    CFDIReports.countRequest('principal', 'PGT190401156', 'Receptor.Rfc', "datos.Total", "datos.SubTotal").then((data) => {
      let temp = {
        title:"Complementos de pago",
        path: '/providers',
        top: ['', ''],
        data: [['Tipo', 'Cantidad']],
      }
      try {
        temp.data.push(["Con complemento", comp[0].count]);
      } catch (error) {
        comp = [{
          count:0,
          total:0,
          subTotal:0
        }]
        temp.data.push(["Con complemento", comp[0].count]);
      }
      if (data) {
        temp.data.push(["Sin complemento", data[0].count-comp[0].count]);
      }
      graficsData.push(temp);
      setProviderData(graficsData);
    }).catch(console.log);
  }, []);
  const efoList = ['Preveedor X', 'Proveedor Y', 'Proveedor Z', 'Proveedor ∫'];
  const passData = {
    company: 'PGT190401156',
    type: 'providers',
  };
  return (
    <>
      <BreadcrumbComponent routes={routes} />
      <h1 className="title">Proveedores - LA PICANHA GRILL TACOS SA DE CV</h1>
      <div className="dashboard-content">
        {total && (
          <AmountDisplay
            title="Compras del mes"
            amount={total}
            route="/reports/detailed"
            data={passData}
          />
        )}
        {providerData && providerData.map((item) => (
          <DonutComponent
            top={item.top}
            data={item.data}
            route={item.path}
            title={item.title}
            key={item.title}
          />
        ))}
        <EfoList
          title="Proveedores en lista de EFOs"
          efoList={efoList}
          route="/"
        />
      </div>
    </>
  );
};

export default ProviderDashboard;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AmountDisplay from '../../../components/AmountDisplayComponent';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import DonutComponent from '../../../components/DonutComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import routes from './BreadcrumbRoutes';
import EfoList from '../../../components/EfoListComponent';
import TotalServirce from '../../../service/reports/Total.service';
import CFDIReports from '../../../service/clients/Clients.service';


import SelectComponent from '../../../components/SelectInputComponent';
import CompanyActions from '../../../actions/company.action';
import usePeriodData from '../../../hooks/usePeriodData';

import '../../../styles/pages/Dashboard.css';

import axios from 'axios';

const ProviderDashboard = () => {
  useReportTitle('Sonar | Proveedores');
  const [total, setTotal] = useState(null);
  const [providerData, setProviderData] = useState(null);

  //   
   const [efoList, setEfoList] = useState(null); 
  //    

  const config = useSelector((state) => state.config.config);
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  const [fromDate, toDate] = usePeriodData(config.period);
  const [company, setCompany] = useState(config.main_company);
  const [companyTitle, setCompanyTitle] = useState('');

  const handleChangeCompany = (event) => {
    setCompany(event.target.value); 
    
    setCompanyTitle(event.target.selectedOptions[0].text);
    // 
    alert(event.target.value);
    setEfoList(  ['X asd', 'asd Y', 'Provsdeedor Z', 'asd ∫'] ); 
    
    console.log( " ----- 4" ); 
    const listEfos = async () => { 
       CFDIReports.getEfos().then((resp)=>{
        console.log(resp);  
        console.log("RESPxx");
      }); 
    }    
    listEfos();   
    //
  };

  const _companiesOptions = companies.map((item) => ({
    value: item.rfc,
    text: item.name,
    id: item._id.$oid,
  }));

  useEffect(() => {
    setChartData();
  }, [company]);

  useEffect(() => {
    const currentCompany = companies.filter(
      (item) => item.rfc === config.main_company
    );
    if (currentCompany.length > 0) {
      setCompanyTitle(currentCompany[0].name);
    }
  }, [companies]);

  const setChartData = async () => {

    const params = {
      fromDate: '2021-05-01T00:00:00',
      toDate: '2021-05-31T23:59:59',
      field: 'Receptor.Rfc',
      rfc: company,
    };

    let graficsData = [];
    TotalServirce.getTotalData(params).then((resp)=>{
      setTotal(resp.total);
    });
    let comp = await CFDIReports.countRequest('payment', params, 'Receptor.Rfc', "datos.Total", "Diferencia");
    CFDIReports.countRequest('principal', params, 'Receptor.Rfc', "datos.Total", "datos.SubTotal").then((data) => {
      let temp = {
        title:"Complementos de pago",
        path: '/providers',
        top: ['', ''],
        data: [['Tipo', 'Cantidad']],
      }
      try {
        temp.data.push(["Con complemento", comp[0].count]);
      } catch (error) {
        console.log("is empty", data);
        comp = [{
          count:0,
          total:0,
          subTotal:0
        }]
        temp.data.push(["Con complemento", comp[0].count]);
      }
      if (data && data.length>0) {
        temp.data.push(["Sin complemento", data[0].count-comp[0].count]);
      } else {
        temp.data.push(["Sin complemento", comp[0].count]);
      }
      graficsData.push(temp);
      console.log(graficsData);
      setProviderData(graficsData);
    }).catch(console.log);
  };


  useEffect(() => {

    setCompany(config.main_company);
    dispatch(CompanyActions.getCompaniesByUser());
    
    setChartData();
  }, []); 
  //efoList = ['Preveedor X', 'Proveedor Y', 'Proveedor Z', 'Proveedor ∫'];
  const passData = {
    company: company,
    dates: { fromDate, toDate },
    type: 'providers',
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
        <h1 className="title">Proveedores - {companyTitle}</h1>
      </div>
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

        {efoList && (
        <EfoList
          title="Proveedores en lista de EFOs"
          efoList={efoList}
          route="/"
        /> )} 

      </div>
    </>
  );
};

export default ProviderDashboard;

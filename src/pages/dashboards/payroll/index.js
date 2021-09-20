import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import BreadcrumbComponent from '../../../components/BreadcrumbComponent';
import AmountDisplayComponent from '../../../components/AmountDisplayComponent';
import useReportTitle from '../../../hooks/useReportTitle';
import routes from './BreadcrumbRoutes';

import SelectComponent from '../../../components/SelectInputComponent';
import CompanyActions from '../../../actions/company.action';
import usePeriodData from '../../../hooks/usePeriodData';

import '../../../styles/pages/Dashboard.css';

const PayrollDashboard = () => {
  useReportTitle('Sonar | Nómina');

  const config = useSelector((state) => state.config.config);
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
    //setChartData();
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
    dispatch(CompanyActions.getCompaniesByUser());
    
  }, []);

  const data = [
    {
      title: 'Retenciones de nómina',
      amount: 346345.35,
      path: '/reports/retentions',
    },
    {
      title: 'Percepciones grabadas',
      amount: 178658.58,
      path: '/reports/payroll/taxables_perceptions',
    },
  ];

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
        <h1 className="title">Nomina - {companyTitle}</h1>
      </div>
      <div className="dashboard-content">
        {data.map((item) => (
          <AmountDisplayComponent
            title={item.title}
            amount={item.amount}
            route={item.path}
            key={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default PayrollDashboard;

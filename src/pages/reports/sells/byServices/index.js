import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import SellsReportsActions from '../../../../actions/SellsReport.action';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import useDataColumns from './DataColumns';
import useFilterForm from './FilterForm';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import Routes from './BreadcrumbsRoutes';
import CompanyActions from '../../../../actions/company.action';
import useFormatters from '../../../../hooks/useFormatters';

import '../../../../styles/reports.css';

const SellsByServices = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const dataReport = useSelector((state) => state.sell_reports.by_services);
  const companies = useSelector((state) => state.companies.companies);
  const { currencyFormatter } = useFormatters();
  const formatter = (cell) => currencyFormatter('en-US', cell);
  const [columns] = useDataColumns(formatter);
  const { company, dates } = location.state;
  const [filters, handleChangeFilter, formFields, getTextFilters] =
    useFilterForm(companies, company, dates);
  const onSubmit = (filter) => dispatch(SellsReportsActions.byServices(filter));

  useEffect(() => {
    document.title = 'Sonar | Ventas por servicios';
    dispatch(CompanyActions.getCompaniesByUser());
    dispatch(SellsReportsActions.byServices(filters));
  }, []);

  return (
    <Container>
      <BreadcrumbComponent routes={Routes} />
      <h1 className="title">Reporte de ventas por servicios</h1>
      <FilterBar
        dataFields={formFields}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => onSubmit(filters)}
        textFilter={getTextFilters()}
      />
      <div className="report-area">
        {dataReport && (
          <ReportTable
            tableData={dataReport}
            tableColumns={columns}
            dataKey="uuid"
          />
        )}
      </div>
    </Container>
  );
};

export default SellsByServices;

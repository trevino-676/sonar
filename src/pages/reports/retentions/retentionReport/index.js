import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import RetentionsActions from '../../../../actions/RetentionReport.action';
import CompanyActions from '../../../../actions/company.action';
import useReportTitle from '../../../../hooks/useReportTitle';
import useFormatters from '../../../../hooks/useFormatters';
import useFilterForm from './FiltersForm';
import Routes from './BreadcrumbRoutes';
import useDataColumns from './ReportData';

import '../../../../styles/reports.css';

const RetentionReport = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  useEffect(() => {
    dispatch(CompanyActions.getCompaniesByUser());
  }, [dispatch]);
  const dataReport = useSelector((state) => state.retentions.retention_report);
  useReportTitle('Reportes | Retenciones');
  const { currencyFormatter } = useFormatters();
  const [columns] = useDataColumns(currencyFormatter);
  const [handleChangeFilter, formFields, submitFilters, getTextFilters] =
    useFilterForm(dispatch, RetentionsActions.retentionReport, companies, []);

  return (
    <Container>
      <h1 className="text-center">Reportes de retenciones</h1>
      <BreadcrumbComponent routes={Routes} />
      <FilterBar
        dataFields={formFields}
        onHandleChange={handleChangeFilter}
        onHandleClick={submitFilters}
        textFilter={getTextFilters()}
      />
      <br />
      {dataReport && (
        <ReportTable
          tableData={dataReport}
          tableColumns={columns}
          dataKey="uuid"
        />
      )}
    </Container>
  );
};

export default RetentionReport;

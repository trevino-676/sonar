import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import PayrollReportAction from '../../../../actions/PayrollReport.action';
import useFiltersTaxablePerceptions from './filterForm';
import useTaxablePerceptionsExpandData from './ExpandData';
import useDataColumns from './DatatableColumns';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import Routes from './BreadcrumbsRoutes';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import CompanyActions from '../../../../actions/company.action';
import useFormatters from '../../../../hooks/useFormatters';

import '../../../../styles/reports.css';

const TaxablePerceptions = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector(
    (state) => state.payroll_reports.taxable_perceptions
  );
  const companies = useSelector((state) => state.companies.companies);
  const { currencyFormatter } = useFormatters();
  const [filter, handleChangeFilter, filterFields, getTextFilters] =
    useFiltersTaxablePerceptions(companies);
  const formatter = (cell) => currencyFormatter('en-US', cell);
  const [expandedColumns, expandedData] = useTaxablePerceptionsExpandData(
    dataReport,
    formatter
  );
  const [dataColumns] = useDataColumns(formatter);
  const onSubmit = (filters) =>
    dispatch(PayrollReportAction.taxablesPerceptions(filters));
  useEffect(() => {
    document.title = 'Sonar | Percepciones gravables';
    dispatch(CompanyActions.getCompaniesByUser());
  }, []);
  return (
    <Container>
      <BreadcrumbComponent routes={Routes} />
      <h1 className="title">Reporte de percepciones gravables</h1>
      <FilterBar
        dataFields={filterFields}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => {
          onSubmit(filter);
        }}
        textFilter={getTextFilters()}
      />
      <div className="report-area">
        {dataReport && (
          <ReportTable
            tableData={dataReport}
            tableColumns={dataColumns}
            expandData={expandedData}
            expandColumns={expandedColumns}
            expandDataKey="uuid"
            dataKey="uuid"
          />
        )}
      </div>
    </Container>
  );
};

export default TaxablePerceptions;

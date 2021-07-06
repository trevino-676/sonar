import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import PayrollReportAction from '../../../../actions/PayrollReport.action';
import useFiltersTaxablePerceptions from './filterForm';
import useTaxablePerceptionsExpandData from './ExpandData';
import useDataColumns from './DatatableColumns';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';

import '../../../../styles/reports.css';

const TaxablePerceptions = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector(
    (state) => state.payroll_reports.taxable_perceptions
  );
  const [filter, handleChangeFilter, filterFields] =
    useFiltersTaxablePerceptions();
  const currencyFormatter = (cell) => (
    <span>$ {parseFloat(cell).toFixed(2)}</span>
  );
  const [expandedColumns, expandedData] = useTaxablePerceptionsExpandData(
    dataReport,
    currencyFormatter
  );
  const [dataColumns] = useDataColumns(currencyFormatter);
  const onSubmit = (filters) =>
    dispatch(PayrollReportAction.taxablesPerceptions(filters));
  useEffect(() => {
    document.title = 'Reportes | Percepciones gravables';
  }, []);
  return (
    <Container>
      <FilterBar
        dataFields={filterFields}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => {
          onSubmit(filter);
        }}
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
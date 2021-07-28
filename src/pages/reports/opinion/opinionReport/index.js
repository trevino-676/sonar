import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import OpinionActions from '../../../../actions/OpinionReport.action';
import useReportTitle from '../../../../hooks/useReportTitle';
import useFormatters from '../../../../hooks/useFormatters';
import useFilterForm from '../opinionReport/FiltersForms';
import Routes from '../opinionReport/BreadcrumbsRoutes';
import useDataColumns from '../opinionReport/ReportData';

import '../../../../styles/reports.css';

const OpinionReport = () => {
    const dispatch = useDispatch();
    const dataReport = useSelector((state) => state.opinion.opinion_report);
    useReportTitle('Reportes | Opinion');
    const [currencyFormatter] = useFormatters();
    const [handleChangeFilter, formFields, submitFilters, getTextFilters] =
      useFilterForm(dispatch, OpinionActions.opinionReport, []);
    const [columns] = useDataColumns(currencyFormatter);
  
    return (
      <Container>
        <h1 className="text-center">Reportes de opinion de cumplimiento</h1>
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
  
  export default OpinionReport;
  
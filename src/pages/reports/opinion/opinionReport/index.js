import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import OpinionActions from '../../../../actions/OpinionReport.action';
import useReportTitle from '../../../../hooks/useReportTitle';
import useFilterForm from './FiltersForms';
import Routes from './BreadcrumbsRoutes';
import useDataColumns from './ReportData';
import useFetchCompanies from '../../../../hooks/useFetchCompanies';


import '../../../../styles/reports.css';

const OpinionReport = () => {
  const dispatch = useDispatch();
  let dataReport = useSelector((state) => state.opinion.opinion_report);
  const companies = useSelector((state) => state.companies.companies);
  useReportTitle('Sonar | Opinion de cumplimiento');
  useFetchCompanies(dispatch);
  const [handleChangeFilter, formFields, submitFilters, getTextFilters] =
    useFilterForm(dispatch, OpinionActions.opinionReport, companies);
  const [columns] = useDataColumns();
  const onChange = (event) => {
    let tempConfig = Object.assign({}, selectRow);
    tempConfig[event.target.value] = event.target.checked;
    setRow(tempConfig);
  }
  
  if (dataReport) {
    dataReport = dataReport.map((item) => {
      // if (item.Private === null) {
      if (item.Opinion_comp === null) {
        return { ...item, Opinion_comp: 'Pendiente' };
      }

      return {
        ...item,
        Opinion_comp: item.Opinion_comp ? 'Positiva' : 'Negativa',
      };
      // }
      // return { ...item, Opinion_comp: 'Privada' };
    });
  }

  return (
    <Container>
      <BreadcrumbComponent routes={Routes} />
      <h1 className="title">Reportes de opinión de cumplimiento</h1>
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
          onChange ={onChange}
          onHandleClick 
          dataKey="uuid"
        />
      )}
    </Container>
  );
};

export default OpinionReport;

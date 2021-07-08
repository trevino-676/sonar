import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SellsReportsActions from '../../../../actions/SellsReport.action';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import useDataColumns from './DataColumns';
import useFilterForm from './FilterForm';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import Routes from './BreadcrumbsRoutes';

import '../../../../styles/reports.css';

const SellsByServices = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector((state) => state.sell_reports.by_services);
  const currencyFormatter = (cell) => (
    <span>$ {parseFloat(cell).toFixed(2)}</span>
  );
  const [columns] = useDataColumns(currencyFormatter);
  const [filters, handleChangeFilter, formFields] = useFilterForm();
  const onSubmit = (filter) => dispatch(SellsReportsActions.byServices(filter));

  useEffect(() => {
    document.title = 'Reportes | Ventas por servicios';
  }, []);

  return (
    <Container>
      <h1 className="text-center">Reporte de ventas por servicios</h1>
      <BreadcrumbComponent routes={Routes} />
      <FilterBar
        dataFields={formFields}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => onSubmit(filters)}
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

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SellsReportsActions from '../../../../actions/SellsReport.action';
import useFilterForm from './FilterForm';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import Routes from './BreadcrumbsRoutes';
import CompanyActions from '../../../../actions/company.action';
import useFormatters from '../../../../hooks/useFormatters';

import '../../../../styles/reports.css';

const SellsByItems = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector((state) => state.sell_reports.by_items);
  const companies = useSelector((state) => state.companies.companies);
  const [filter, handleChangeFilter, FilterForm, getTextFilter] =
    useFilterForm(companies);
  const { currencyFormatter } = useFormatters();
  const priceFormatter = (cell) => currencyFormatter('en-US', cell);
  const onSubmit = (filters) => {
    dispatch(SellsReportsActions.byItems(filters));
  };
  const dataFields = [
    {
      dataField: '_id.articulo',
      text: 'Articulo',
      sort: true,
    },
    {
      dataField: '_id.codigo',
      text: 'Codigo',
      sort: true,
    },
    {
      dataField: 'cantidad',
      text: 'Cantidad',
      align: 'right',
      sort: true,
    },
    {
      dataField: 'precio_unitario',
      text: 'Precio unitario',
      align: 'right',
      formatter: priceFormatter,
      sort: true,
    },
    {
      dataField: 'importe',
      text: 'Total',
      align: 'right',
      formatter: priceFormatter,
      sort: true,
    },
  ];
  useEffect(() => {
    document.title = 'Sonar | Ventas por articulos';
    const getCompaniesInfo = () =>
      dispatch(CompanyActions.getCompaniesByUser());
    getCompaniesInfo();
  }, []);

  return (
    <Container>
      <BreadcrumbComponent routes={Routes} />
      <h1 className="title">Reporte de ventas por articulos</h1>
      <FilterBar
        dataFields={FilterForm}
        onHandleChange={handleChangeFilter}
        onHandleClick={() => {
          onSubmit(filter);
        }}
        textFilter={getTextFilter()}
      />
      <div className="report-area">
        {dataReport && (
          <ReportTable
            tableData={dataReport}
            tableColumns={dataFields}
            dataKey="uuid"
          />
        )}
      </div>
    </Container>
  );
};

export default SellsByItems;

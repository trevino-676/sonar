import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import SellsReportsActions from '../../../../actions/SellsReport.action';
import useFilterForm from './FilterForm';
import FilterBar from '../../../../components/FiltersBar';
import ReportTable from '../../../../components/ReportTable';
import BreadcrumbComponent from '../../../../components/BreadcrumbComponent';
import Routes from './BreadcrumbsRoutes';

import '../../../../styles/reports.css';

const SellsByItems = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector((state) => state.sell_reports.by_items);
  const [filter, handleChangeFilter, FilterForm, getTextFilter] = useFilterForm();
  const priceFormatter = (cell) => <span>$ {cell.toFixed(2)}</span>;
  const onSubmit = (filters) => {
    dispatch(SellsReportsActions.byItems(filters));
  };
  const dataFields = [
    {
      dataField: '_id.articulo',
      text: 'Articulo',
    },
    {
      dataField: '_id.codigo',
      text: 'Codigo',
    },
    {
      dataField: 'cantidad',
      text: 'Cantidad',
      align: 'right',
    },
    {
      dataField: 'precio_unitario',
      text: 'Precio unitario',
      align: 'right',
      formatter: priceFormatter,
    },
    {
      dataField: 'importe',
      text: 'Total',
      align: 'right',
      formatter: priceFormatter,
    },
  ];
  useEffect(() => {
    document.title = 'Reportes | Ventas por articulos';
  }, []);

  return (
    <Container>
      <h1 className="text-center">Reporte de ventas por articulos</h1>
      <BreadcrumbComponent routes={Routes} />
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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CFDIReports from '../../../service/clients/Clients.service';
import DonutComponent from '../../../components/DonutComponent';
import AmountDisplay from '../../../components/AmountDisplayComponent';
import routes from './BreadcrumbRoutes';
import BreadcrumbComponent from '../../../components/BreadcrumbComponent';

import SelectComponent from '../../../components/SelectInputComponent';
import CompanyActions from '../../../actions/company.action';
import usePeriodData from '../../../hooks/usePeriodData';
import ConfigActions from '../../../actions/config.action';

const addToArray = (
  data,
  resultArray,
  numberOfReqs,
  accepted = [],
  override = null
) => {
  for (const d of data) {
    let ley = '';
    let mask =
      override && d._id === override.original ? override.replace : d._id;
    switch (mask) {
      case 'P':
        ley = 'Pagos';
        break;
      case 'I':
        ley = 'Ingresos';
        break;
      case 'E':
        ley = 'Egresos';
        break;
      case 'T':
        ley = 'Traslado';
        break;
      case 'N':
        ley = 'Nomina';
        break;
      default:
        ley = '?';
        break;
    }
    if (accepted.includes(mask)) {
      resultArray.top.push('');
      resultArray.data.push([ley, d.count]);
    }
  }

  /* data.forEach(d => {
	  
	}); */

  return numberOfReqs - 1;
};

const HomePrivate = () => {
  // useReportTitle('Sonar | Dashboard');
  const [tipoComp, setTipoComp] = useState(null);
  const [totalIVAEmi, setTotalIVAEmi] = useState(null);
  const [totalIVARec, setTotalIVARec] = useState(null);
  const [totalIEPSemi, setTotalIEPSemi] = useState(null);
  const [totalIEPSrec, setTotalIEPSrec] = useState(null);
  const [totalEvsR, setTotalEvsR] = useState(null);

  const configDispatch = useDispatch();
  const config = useSelector((state) => state.config.config);
  const companies = useSelector((state) => state.companies.companies);
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

  const setGDD = () => {
    let numberOfReqs = 4;
    let reqCount = 2;
    const resultTipoC = { top: [], data: [['Tipo', 'Cantidad']] };
    const resultEvsR = { top: [], data: [['Tipo', 'Cantidad']] };
    /// Tipo de Comprobante
    // INGRESOS
    const usrConf = { Rfc: company, fromDate, toDate };
    CFDIReports.groupRequest('principal', usrConf, 'datos.Rfc', 'datos.Tipo')
      .then((data) => {
        numberOfReqs = addToArray(data, resultTipoC, numberOfReqs, ['I']);
        if (numberOfReqs === 0) {
          setTipoComp(resultTipoC);
        }
      })
      .catch(console.log);
    // EGRESOS
    CFDIReports.groupRequest('principal', usrConf, 'Receptor.Rfc', 'datos.Tipo')
      .then((data) => {
        numberOfReqs = addToArray(data, resultTipoC, numberOfReqs, ['I'], {
          original: 'I',
          replace: 'E',
        });
        if (numberOfReqs === 0) {
          setTipoComp(resultTipoC);
        }
      })
      .catch(console.log);
    // PAGOS
    CFDIReports.groupRequest('pagos', usrConf, 'Receptor.Rfc', 'datos.Tipo')
      .then((data) => {
        numberOfReqs = addToArray(data, resultTipoC, numberOfReqs, ['P']);
        if (numberOfReqs === 0) {
          setTipoComp(resultTipoC);
        }
      })
      .catch(console.log);
    // NOMINA
    CFDIReports.groupRequest('nomina', usrConf, 'datos.Rfc', 'datos.Tipo')
      .then((data) => {
        numberOfReqs = addToArray(data, resultTipoC, numberOfReqs);
        if (numberOfReqs === 0) {
          setTipoComp(resultTipoC);
        }
      })
      .catch(console.log);

    /// IVA e IEPS
    CFDIReports.countRequest(
      'principal',
      usrConf,
      'datos.Rfc',
      'impuestos.TrasladoIVA',
      'impuestos.TrasladoIEPS'
    )
      .then((data) => {
        if (data) {
          setTotalIVAEmi(data[0].total);
          setTotalIEPSemi(data[0].subTotal);
          reqCount -= 1;
          resultEvsR.top.push('');
          resultEvsR.data.push(['Emitidos', data[0].count]);
          if (reqCount === 0) {
            setTotalEvsR(resultEvsR);
          }
        }
      })
      .catch(console.log);
    CFDIReports.countRequest(
      'principal',
      usrConf,
      'Receptor.Rfc',
      'impuestos.TrasladoIVA',
      'impuestos.TrasladoIEPS'
    )
      .then((data) => {
        if (data) {
          setTotalIVARec(data[0].total);
          setTotalIEPSrec(data[0].subTotal);
          reqCount -= 1;
          resultEvsR.top.push('');
          resultEvsR.data.push(['Recibidos', data[0].count]);
          if (reqCount === 0) {
            setTotalEvsR(resultEvsR);
          }
        }
      })
      .catch(console.log);
  };

  useEffect(() => {
    setGDD();
  }, [company]);

  useEffect(() => {
    const currentCompany = companies.filter(
      (item) => item.rfc === config.main_company
    );
    if (currentCompany.length > 0) {
      setCompanyTitle(currentCompany[0].name);
    }
  }, [companies]);

  useEffect(async () => {
    await configDispatch(ConfigActions.getUserConfig());
    setCompany(config.main_company);
    await configDispatch(CompanyActions.getCompaniesByUser());
    setGDD();
    console.log(config.graphics);
  }, []);

  const passData = {
    company,
    dates: { fromDate, toDate },
    type: 'all',
  };

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
        <h1 className="title">Dahsboard - {companyTitle}</h1>
      </div>
      <div className="dashboard-content">
        {/* TO_DO: Clonar grafica, poner las cantidades, Totales, TOTALES POR TIPO DE CFDI */}
        {tipoComp && config.graphics.cfdis && (
          <DonutComponent
            top={tipoComp.top}
            data={tipoComp.data}
            title="Distribución de CFDIs"
            route="/reports/detailed"
            passData={passData}
          />
        )}
        {/* TO_DO: Crear vista de esta info */}
        {totalEvsR && config.graphics.comp && (
          <DonutComponent
            top={totalEvsR.top}
            data={totalEvsR.data}
            title="Emitidos vs Recibidos"
          />
        )}
        {totalIVAEmi !== null && (
          <AmountDisplay
            title="IVA de Emitidos"
            amount={totalIVAEmi}
            currency="es-MX"
            route="/reports/detailed"
            data={passData}
          />
        )}
        {totalIEPSemi !== null && (
          <AmountDisplay
            title="IEPS de Emitidos"
            amount={totalIEPSemi}
            currency="es-MX"
            route="/reports/detailed"
            data={passData}
          />
        )}
        {totalIVARec !== null && (
          <AmountDisplay
            title="IVA de Recibidos"
            amount={totalIVARec}
            currency="es-MX"
            route="/reports/detailed"
            data={passData}
          />
        )}
        {totalIEPSrec !== null && (
          <AmountDisplay
            title="IEPS de Recibidos"
            amount={totalIEPSrec}
            currency="es-MX"
            route="/reports/detailed"
            data={passData}
          />
        )}
      </div>
    </>
  );
};

export default HomePrivate;

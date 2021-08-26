import React, { useEffect, useState } from 'react';
import CFDIReports from '../service/clients/Clients.service';
import DonutComponent from '../components/DonutComponent';
import AmountDisplay from '../components/AmountDisplayComponent';

const addToArray = (data, resultArray, numberOfReqs) => {
  
  data.forEach(d => {
    let ley = '';
    switch (d._id) {
      case 'P':
        ley = "Pagos";
        break;
      case 'I':
        ley = "Ingresos";
        break;
      case 'E':
        ley = "Egresos";
        break;
      case 'T':
        ley = "Traslado";
        break;
      case 'N':
        ley = "Nomina";
        break;
      default:
        ley = '?';
        break;
    }
    resultArray.top.push('');
    resultArray.data.push([ley, d.count]);
  });
  
  return numberOfReqs-1
};

const Home = () => {
  // useReportTitle('Sonar | Dashboard');
  const [tipoComp, setTipoComp] = useState(null);
  const [totalIVAEmi, setTotalIVAEmi] = useState(null);
  const [totalIVARec, setTotalIVARec] = useState(null);
  const [totalIEPSemi, setTotalIEPSemi] = useState(null);
  const [totalIEPSrec, setTotalIEPSrec] = useState(null);
  const [totalEvsR, setTotalEvsR] = useState(null);

  useEffect(() => {
    let numberOfReqs = 3;
    let reqCount = 2;
    let resultTipoC = {top: [], data:[["Tipo", "Cantidad"]]};
    let resultEvsR = {top: [], data:[["Tipo", "Cantidad"]]};
    /// Tipo de Comprobante
    CFDIReports.groupRequest('principal', 'PGT190401156', 'datos.Rfc', "datos.Tipo").then((data) => {
      numberOfReqs = addToArray(data, resultTipoC, numberOfReqs);
      console.log(data);
      if(numberOfReqs===0){
        setTipoComp(resultTipoC);
      }
    }).catch(console.log);
    CFDIReports.groupRequest('pagos', 'PGT190401156', 'Receptor.Rfc', "datos.Tipo").then((data) => {
      numberOfReqs = addToArray(data, resultTipoC, numberOfReqs);
      if(numberOfReqs===0){
        setTipoComp(resultTipoC);
      }
    }).catch(console.log);
    CFDIReports.groupRequest('nomina', 'PGT190401156', 'datos.Rfc', "datos.Tipo").then((data) => {
      numberOfReqs = addToArray(data, resultTipoC, numberOfReqs);
      if(numberOfReqs===0){
        setTipoComp(resultTipoC);
      }
    }).catch(console.log);
    
    /// IVA e IEPS
    CFDIReports.countRequest('principal', 'PGT190401156', 'datos.Rfc', 'impuestos.TrasladoIVA', 'impuestos.TrasladoIEPS').then((data) => {
      if(data){
        setTotalIVAEmi(data[0].total);
        setTotalIEPSemi(data[0].subTotal);
        reqCount = reqCount-1;
        resultEvsR.top.push('');
        resultEvsR.data.push(['Emitidos', data[0].count]);
        if(reqCount===0){
          setTotalEvsR(resultEvsR);
        }
      }
    }).catch(console.log);
    CFDIReports.countRequest('principal', 'PGT190401156', 'Receptor.Rfc', 'impuestos.TrasladoIVA', 'impuestos.TrasladoIEPS').then((data) => {
      if(data){
        setTotalIVARec(data[0].total);
        setTotalIEPSrec(data[0].subTotal);
        reqCount = reqCount-1;
        resultEvsR.top.push('');
        resultEvsR.data.push(['Recibidos', data[0].count]);
        if(reqCount===0){
          setTotalEvsR(resultEvsR);
        }
      }
    }).catch(console.log);
  },[]);
  return (
    <>
      <h1>Home</h1>
      <div className="dashboard-content">
        {/* TO_DO: Clonar grafica, poner las cantidades, Totales, TOTALES POR TIPO DE CFDI */}
        {tipoComp && (<DonutComponent
          top={tipoComp.top}
          data={tipoComp.data}
          title={'Distribución de CFDIs'}
          route={'#'}
        />)}
        {/* TO_DO: Crear vista de esta info */}
        {totalEvsR && (<DonutComponent
          top={totalEvsR.top}
          data={totalEvsR.data}
          title={'Emitidos vs Recibidos'}
          route={'#'}
        />)}
        {totalIVAEmi!==null && (
          <AmountDisplay
            title="IVA de Emitidos"
            amount={totalIVAEmi}
            currency="es-MX"
            route="/reports/detailed"
            data={null}
          />
        )}
        {totalIEPSemi!==null && (
          <AmountDisplay
            title="IEPS de Emitidos"
            amount={totalIEPSemi}
            currency="es-MX"
            route="/reports/detailed"
            data={null}
          />
        )}
        {totalIVARec!==null && (
          <AmountDisplay
            title="IVA de Recibidos"
            amount={totalIVARec}
            currency="es-MX"
            route="/reports/detailed"
            data={null}
          />
        )}
        {totalIEPSrec!==null && (
          <AmountDisplay
            title="IEPS de Recibidos"
            amount={totalIEPSrec}
            currency="es-MX"
            route="/reports/detailed"
            data={null}
          />
        )}
      </div>
    </>
  );
};

export default Home;

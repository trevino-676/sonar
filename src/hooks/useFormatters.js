import React from 'react';

const useFormatters = () => {
  const currencyFormatter = (format, data) => {
    const price = Intl.NumberFormat(format).format(parseFloat(data).toFixed(2));
    return <span>${price}</span>;
  };
  const DateFormatter = (data) => {
    const date = new Date(data);
    return <span>{date.toLocaleString()}</span>;
  };

  const passwordFormatter = (data) => {
    if (data === '') {
      return (
        <span title="Falta por ingresar la fiel">
          <i className="fas fa-exclamation" />{' '}
        </span>
      );
    }
    return <span>********</span>;
  };

  const fieldFormatter = (data) => {
    if (data) {
      const url = `drumbot-robinhood.s3.amazonaws.com/${data}`;
      return (
        <span>
          <a href={url}>
            {data.indexOf('.key') > 0 ? 'Clave_Privada.key' : 'Certificado.cer'}
          </a>
        </span>
      );
    }
    return (
      <span title="Falta por cargar el archivo">
        <i className="fas fa-exclamation" />{' '}
      </span>
    );
  };

  return {
    currencyFormatter,
    DateFormatter,
    passwordFormatter,
    fieldFormatter,
  };
};

export default useFormatters;

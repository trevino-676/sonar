import React from 'react';
import moment from 'moment';

const useFormatters = () => {
  const currencyFormatter = (format, data) => {
    let price = Intl.NumberFormat(format).format(parseFloat(data).toFixed(2));
    const separatedPrice = price.split('.');
    if (separatedPrice.length > 1) {
      if (separatedPrice[1].length < 2) {
        price += '0';
      }
    } else {
      price += '.00';
    }

    return <span>${price}</span>;
  };
  const DateFormatter = (data) => {
    const date = moment(data);
    return <span>{date.format('YYYY-MM-DD HH:mm:ss')}</span>;
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
      const url = `https://drumbot-robinhood.s3.us-east-2.amazonaws.com/${data}`;
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

  const currencyFormat = (format, amount) => {
    const price = Intl.NumberFormat(format).format(
      parseFloat(amount).toFixed(2)
    );
    const separatedPrice = price.split('.');

    if (separatedPrice.length > 1) {
      if (separatedPrice[1].length < 2) price.concat('0');
    }

    return price;
  };

  return {
    currencyFormatter,
    DateFormatter,
    passwordFormatter,
    fieldFormatter,
    currencyFormat,
  };
};

export default useFormatters;

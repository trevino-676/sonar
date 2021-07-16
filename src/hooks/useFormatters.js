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

  return [currencyFormatter, DateFormatter];
};

export default useFormatters;

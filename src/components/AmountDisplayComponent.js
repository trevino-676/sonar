import React from 'react';
import { Link } from 'react-router-dom';

import useFormatters from '../hooks/useFormatters';

import '../styles/components/AmountDisplay.css';

const AmountDisplay = ({ title, amount, currency, route, data }) => {
  const { currencyFormat } = useFormatters();
  let currencyType = '';
  switch (currency) {
    case 'en-US':
      currencyType = 'USD';
      break;
    case 'es-MX':
      currencyType = 'MXN';
      break;
    default:
      currencyType = 'MXN';
      break;
  }

  return (
    <div className="amount-display">
      <div className="amount-title">
        <h4>{title}</h4>
      </div>
      <div className="amount-amount">
        <h2>{`$${currencyFormat(currency, amount)} ${currencyType}`}</h2>
      </div>
      <div className="amount-details">
        <Link
          to={{
            pathname: route,
            state: data,
          }}
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default AmountDisplay;

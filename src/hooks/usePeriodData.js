import moment from 'moment';

const format = 'YYYY-MM-DDTHH:mm:ss';

const usePeriodData = (type) => {
  let fromDate = null;
  let toDate = null;
  const date = moment();
  switch (type) {
    case 'weekly':
      toDate = date.format(format);
      fromDate = date.subtract(1, 'weeks').format(format);
      break;
    case 'fortnightly':
      toDate = date.format(format);
      fromDate = date.subtract(2, 'weeks').format(format);
      break;
    case 'monthly':
      toDate = date.format(format);
      fromDate = date.subtract(1, 'months').format(format);
      break;
    case 'quarterly':
      toDate = date.format(format);
      fromDate = date.subtract(3, 'months').format(format);
      break;
    case 'biannual':
      toDate = date.format(format);
      fromDate = date.subtract(6, 'months').format(format);
      break;
    default:
      throw new Error('Argument type is incorrect');
  }

  return [fromDate, toDate];
};

export default usePeriodData;

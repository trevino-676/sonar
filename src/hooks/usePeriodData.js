import moment from 'moment';

const format = 'YYYY-MM-DDTHH:mm:ss';

const usePeriodData = (type) => {
  let fromDate = null;
  let toDate = null;
  const date = moment();
  switch (type) {
    case 'weekly':
      toDate = date.endOf('w').format(format);
      fromDate = date.startOf('w').format(format);
      break;
    case 'fortnightly':
      if (date.date() >= 16) {
        fromDate = date.date(16).format(format);
        toDate = date.endOf('M').format(format);
      } else {
        fromDate = date.startOf('M').format(format);
        toDate = date.date(15).format(format);
      }
      break;
    case 'monthly':
      toDate = date.endOf('M').format(format);
      fromDate = date.startOf('M').format(format);
      break;
    case 'quarterly':
      toDate = date.endOf('Q').format(format);
      fromDate = date.startOf('Q').format(format);
      break;
    case 'biannual':
      if (date.month() >= 6) {
        fromDate = date.month(6).startOf('M').format(format);
        toDate = date.endOf('Y').format(format);
      } else {
        fromDate = date.startOf('Y').format(format);
        toDate = date.month(5).endOf('M').format(format);
      }
      break;
    default:
      throw new Error('Argument type is incorrect');
  }

  return [fromDate, toDate];
};

export default usePeriodData;

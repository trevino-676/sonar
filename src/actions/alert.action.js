import AlertConstants from '../constants/alert.constants';

const clean = () => ({ type: AlertConstants.CLEAN });
const error = (content) => ({
  type: AlertConstants.ERROR,
  payload: { content },
});
const warning = (content) => ({
  type: AlertConstants.WARNING,
  payload: { content },
});
const success = (content) => ({
  type: AlertConstants.SUCCESS,
  payload: { content },
});

const AlertActions = {
  clean,
  error,
  warning,
  success,
};

export default AlertActions;

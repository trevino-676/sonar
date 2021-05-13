import ModalConstants from '../constants/modal.constants';

const Form = (form) => ({
  type: ModalConstants.OPEN_FORM,
  form,
});

const Success = (modal) => ({ type: ModalConstants.SUCCESS, modal });

const Alert = (modal) => ({ type: ModalConstants.ALERT, modal });

const Error = (modal) => ({ type: ModalConstants.ERROR, modal });

const Clean = () => ({ type: ModalConstants.CLEAN });

const ModalActions = {
    Form,
    Success,
    Alert,
    Error,
    Clean
}; 

export default ModalActions;
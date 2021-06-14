/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import SendService from '../service/login/SendService';
import ModalActions from './modal.action';


const sendData = (user, pass) => { 
  return (dispatch) => { 
    dispatch(request());  
    try {
      const filesUri = []; 
      const resp = SendService.login(user, pass);  

      dispatch(resp);  
      /* 
      dispatch(
        ModalActions.Success({
          title: 'Error',
          body: 'El usuario y/o contraseña son incorrectos',
        })
      );*/ 
 
    } catch (error) {
      dispatch(
        ModalActions.Error({
          title: 'Error',
          body: 'Hubo un error al logearse',
          size: "--"
        })
      );
    }
  };

  function request() {
    return { type: "send_data" };
  }
  function success(filesUri) {
    return {
      type: "send_data",
      payload: filesUri,
    }; 
  }
};

 
const loginActions = {
  sendData 
};

export default loginActions;
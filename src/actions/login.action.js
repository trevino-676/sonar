/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import SendService from '../service/login/SendService';


const sendData = (user, pass) => { 
  return (dispatch) => { 
    dispatch(request());  
    try {
      const filesUri = []; 


      const resp = SendService.upload(user, pass); 
      //console.log(resp); 
      if( window.localStorage.setItem("LOGED_IN", "IN") > 1 ) {
         window.localStorage.setItem("LOGED_IN", "IN");
      }  
      return resp; 
 
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
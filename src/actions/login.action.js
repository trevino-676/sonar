import UserConstants from '../constants/user.constants';
import useLogin from '../hooks/useLogin';
import ModalActions from './modal.action';

const Login = (data) => {
  const request = () => ({ type: UserConstants.LOGIN_USER_REQUEST });
  const success = (token) => ({
    type: UserConstants.LOGIN_USER_REQUEST_SUCCESS,
    payload: token,
  });
  const fail = (msg) => ({
    type: UserConstants.LOGIN_USER_REQUEST_FAIL,
    payload: msg,
  });
  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const [login] = useLogin(data);
    try {
      const resp = await login();
      if (resp.data.access_token !== '') {
        localStorage.setItem('token', resp.data.access_token);
        dispatch(success(resp.data.access_token));
        window.location.replace('/');
      }
    } catch (e) {
      dispatch(fail(e));
      dispatch(
        ModalActions.Error({
          title: 'Error login',
          body: 'Hubo un error al momento de hacer el login',
        })
      );
    }
  };
};

const Logout = () => {
  const request = () => ({ type: UserConstants.LOGOUT_USER_REQUEST });
  const success = (isLoggedIn) => ({
    type: UserConstants.LOGOUT_USER_REQUEST_SUCCESS,
    payload: isLoggedIn,
  });
  // const fail = (err) => ({
  //   type: UserConstants.LOGOUT_USER_REQUEST_FAIL,
  //   error: err,
  // });
  return (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const [logout] = useLogin();
    if (logout()) {
      localStorage.removeItem('token');
      dispatch(success(false));
      window.location.replace('/');
    }
  };
};

const LoginActions = {
  Login,
  Logout,
};

export default LoginActions;
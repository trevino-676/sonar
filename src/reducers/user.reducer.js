import UserConstants from '../constants/user.constants';

const token = localStorage.getItem('token');
const initialState = token
  ? { loggedIn: true, token }
  : { loggedIn: false, token };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.LOGIN_USER_REQUEST:
      return { ...state };
    case UserConstants.LOGIN_USER_REQUEST_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loggedIn: true,
      };
    case UserConstants.LOGOUT_USER_REQUEST:
      return { ...state };
    case UserConstants.LOGOUT_USER_REQUEST_SUCCESS:
      return { ...state, loggedIn: false, token: '' };
    case UserConstants.UPLOAD_FILE_REQUEST:
      return { ...state };
    case UserConstants.UPLOAD_FILE_REQUEST_SUCCESS:
      return { ...state, files: action.payload };
    default:
      return { ...state };
  }
};

export default UserReducer;

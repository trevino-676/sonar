import UserConstants from '../constants/user.constants';

const token = localStorage.getItem('token');
const initialState = token
  ? { loggedIn: true, token, user_list: [] }
  : { loggedIn: false, token, user_list: [] };

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
    case UserConstants.GET_ALL_USERS_REQUEST:
      return { ...state };
    case UserConstants.GET_ALL_USERS_SUCCESS:
      return { ...state, user_list: action.payload };
    case UserConstants.GET_ALL_USERS_FAIL:
      return { ...state };
    case UserConstants.UPDATE_USER_REQUEST:
      return { ...state };
    case UserConstants.UPDATE_USER_SUCCESS:
      return { ...state, updated_company: action.payload };
    case UserConstants.UPDATE_USER_FAIL:
      return { ...state, error: action.payload };
    case UserConstants.DELETE_USER_REQUEST:
      return { ...state };
    case UserConstants.DELETE_USER_SUCCESS:
      return { ...state };
    case UserConstants.DELETE_USER_FAIL:
      return { ...state, error: action.payload };
    case UserConstants.SAVE_USER_REQUEST:
      return { ...state };
    case UserConstants.SAVE_USER_SUCCESS:
      return { ...state, new_user: action.payload };
    case UserConstants.SAVE_USER_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return { ...state };
  }
};

export default UserReducer;

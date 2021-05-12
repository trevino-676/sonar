import UserConstants from '../constants/user.constants';

const userId = localStorage.getItem('user_id');

const initialState = userId
  ? {
      userId,
      rfc: localStorage.getItem('rfc'),
      loggedIn: true,
      files: [],
    }
  : {
      userId,
      rfc: '',
      loggedIn: false,
      files: [],
    };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserConstants.LOGIN_USER_REQUEST:
      return { ...state };
    case UserConstants.LOGIN_USER_REQUEST_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        rfc: action.payload.rfc,
        loggedIn: true,
      };
    case UserConstants.LOGOUT_USER_REQUEST:
      return { ...state, userId: '', rfc: '', loggedIn: false, files: [] };
    case UserConstants.UPLOAD_FILE_REQUEST:
      return { ...state };
    case UserConstants.UPLOAD_FILE_REQUEST_SUCCESS:
      return { ...state, files: action.payload };
    default:
      return { ...state };
  }
};

export default UserReducer;

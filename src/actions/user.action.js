/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import UploadService from '../service/settings/UploadService';

const uploadFile = (files, rfc) => {
  console.log(files, rfc)
  return (dispatch) => {
    dispatch(request());
    try {
      const filesUri = [];
      files.forEach((file) => {
        const resp = UploadService.upload(file, rfc);
        if (resp.status === 200) {
          filesUri.push(resp.data.data.uri);
        }
      });
      dispatch(success(filesUri));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  };

  function request() {
    return { type: UserConstants.UPLOAD_FILE_REQUEST };
  }
  function success(filesUri) {
    return {
      type: UserConstants.UPLOAD_FILE_REQUEST_SUCCESS,
      payload: filesUri,
    };
  }
};

const saveFieldPassword = (rfc, fieldEncodePassword) => {
  function request() {
    return { type: UserConstants.UPDATE_FIELD_PASSWORD_REQUEST };
  }

  function success(password) {
    return {
      type: UserConstants.UPDATE_FIELD_PASSWORD_SUCCESS,
      payload: password,
    };
  }

  return (dispatch) => {
    dispatch(request);
    try {
      const resp = UploadService.setFielPassword(rfc, fieldEncodePassword);
      if (resp.status === 200) {
        dispatch(success(fieldEncodePassword));
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      console.log(error.message);
    }
  };
};

const UserActions = {
  uploadFile,
  saveFieldPassword,
};

export default UserActions;

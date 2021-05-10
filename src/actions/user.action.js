/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import UploadService from '../service/settings/UploadService';

const uploadFile = (files, rfc) => {
  return (dispatch) => {
    dispatch(request())
    try {
        const filesUri = []
        files.forEach(file => {
            const resp = UploadService.upload(file, null, rfc);
            if(resp.status === 200){
                filesUri.push(resp.data.data.uri);
            }
        })
        dispatch(success(filesUri));
    } catch (error) {
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

const UserActions = {
    uploadFile,
}

export default UserActions;
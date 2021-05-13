/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import UploadService from '../service/settings/UploadService';
import ModalActions from './modal.action';

const uploadFile = (files, rfc) => {
  return (dispatch) => {
    dispatch(request());
    try {
      const filesUri = [];
      files.forEach(async (file) => {
        const resp = await UploadService.upload(file, rfc);
        if (resp.status === 200) {
          filesUri.push(file.name);
        }
      });
      dispatch(success(filesUri));
      dispatch(ModalActions.Clean());
      dispatch(
        ModalActions.Success({
          title: 'Archivos .cer y .key',
          body: 'Se cargaron los archivos de forma correcta.',
          size: "lg"
        })
      );
    } catch (error) {
      dispatch(
        ModalActions.Error({
          title: 'Error',
          body: 'Hubo un error al cargar los archivos',
          size: "lg"
        })
      );
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

  return async (dispatch) => {
    dispatch(request());
    try {
      const resp = await UploadService.setFielPassword(rfc, fieldEncodePassword);
      if (resp.status === 200) {
        dispatch(success(fieldEncodePassword));
        dispatch(ModalActions.Clean())
        dispatch(
          ModalActions.Success({
            title: 'Contraseña FIEL',
            body: 'Se guardo correctamente la contraseña FIEL',
            size: "sm"
          })
        );
      }
    } catch (error) {
      dispatch(ModalActions.Clean())
      dispatch(
        ModalActions.Success({
          title: 'Contraseña FIEL',
          body: 'Hubo un error al guardar la contraseña FIEL',
          size: "sm"
        })
      );
    }
  };
};

const UserActions = {
  uploadFile,
  saveFieldPassword,
};

export default UserActions;

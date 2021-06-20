/* eslint-disable no-use-before-define */
import UserConstants from '../constants/user.constants';
import UploadService from '../service/settings/UploadService';
import UserService from '../service/user/UserService';
import LoginActions from './login.action';
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
          size: 'lg',
        })
      );
    } catch (error) {
      dispatch(
        ModalActions.Error({
          title: 'Error',
          body: 'Hubo un error al cargar los archivos',
          size: 'lg',
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
      const resp = await UploadService.setFielPassword(
        rfc,
        fieldEncodePassword
      );
      if (resp.status === 200) {
        dispatch(success(fieldEncodePassword));
        dispatch(ModalActions.Clean());
        dispatch(
          ModalActions.Success({
            title: 'Contraseña FIEL',
            body: 'Se guardo correctamente la contraseña FIEL',
            size: 'sm',
          })
        );
      }
    } catch (error) {
      dispatch(ModalActions.Clean());
      dispatch(
        ModalActions.Success({
          title: 'Contraseña FIEL',
          body: 'Hubo un error al guardar la contraseña FIEL',
          size: 'sm',
        })
      );
    }
  };
};

const getUsers = (type = null, filters = null) => {
  const request = () => ({ type: UserConstants.GET_ALL_USERS_REQUEST });
  const success = (users) => ({
    type: UserConstants.GET_ALL_USERS_SUCCESS,
    payload: users,
  });
  const fail = (error) => ({
    type: UserConstants.GET_ALL_USERS_FAIL,
    payload: error,
  });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());

    try {
      const resp = await UserService.GetUsers(type, filters);
      dispatch(success(resp.data.users));
    } catch (e) {
      dispatch(fail(e.message));
      if (e.message.indexOf('401') > 0) {
        dispatch(LoginActions.Logout());
        window.location.reload();
      }
    }
  };
};

const updateUser = (user) => {
  const request = () => ({ type: UserConstants.UPDATE_USER_REQUEST });
  const success = (status) => ({
    type: UserConstants.UPDATE_USER_SUCCESS,
    payload: status,
  });
  const fail = (error) => ({ type: UserConstants.UPDATE_USER_FAIL, error });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const resp = await UserService.UpdateUser(user);

    if (resp === 401) {
      dispatch(fail('token invalid'));
      dispatch(LoginActions.Logout());
      window.location.reload();
    }

    if (!resp) {
      dispatch(fail('Hubo un problema al actualizar el usuario'));
      dispatch(
        ModalActions.Error({
          title: 'Error Usuario',
          body: 'Hubo un problema al actualizar el usuario',
        })
      );
    }

    dispatch(success(resp));
    dispatch(getUsers());
  };
};

const deleteUser = (id) => {
  const request = () => ({ type: UserConstants.DELETE_USER_REQUEST });
  const success = (status) => ({
    type: UserConstants.DELETE_USER_SUCCESS,
    payload: status,
  });
  const fail = (error) => ({ type: UserConstants.DELETE_USER_FAIL, error });

  return async (dispatch) => {
    dispatch(request());
    dispatch(ModalActions.Clean());
    const resp = await UserService.DeleteUser(id);

    if (resp === 401) {
      dispatch(fail('token invalid'));
      dispatch(LoginActions.Logout());
      window.location.reload();
    }

    if (!resp) {
      dispatch(fail('Hubo un problema al eliminar el usuario'));
      dispatch(
        ModalActions.Error({
          title: 'Error Usuario',
          body: 'Hubo un problema al eliminar el usuario',
        })
      );
    }

    dispatch(success(resp));
    dispatch(getUsers());
    dispatch(
      ModalActions.Success({
        title: 'Usuarios',
        body: 'Se elmino el usuario correctamente',
      })
    );
  };
};

const UserActions = {
  uploadFile,
  saveFieldPassword,
  getUsers,
  updateUser,
  deleteUser,
};

export default UserActions;

import CuentasConstants from '../constants/Cuentas.constants';
import CuentaService from '../service/cuentas'
import ModalActions from './modal.action';
import AlertActions from './alert.action';
import LoginActions from './login.action';

const createCuenta = (account, token) => {
    const request = () => ({ type: CuentasConstants.ADD_CUENTAS_REQUEST });
    const success = (cuentaSaved) => ({
        type: CuentasConstants.ADD_CUENTAS_REQUEST_SUCCESS,
        payload: cuentaSaved,
    });
    const fail = (message) => ({
        type: CuentasConstants.ADD_CUENTAS_REQUEST_FAIL,
        payload: { error: message },
    });
    return async (dispatch) => {
        try {
            dispatch(request());
            dispatch(ModalActions.Clean());
            const resp = await CuentaService.createCuenta(account, token);
            if (resp.status !== 200) {
                dispatch(fail(resp.data.message));
                dispatch(
                    ModalActions.Error({
                        title: 'Error al crear la cuenta',
                        body: resp.data.message,
                    })
                );
            }
            dispatch(success(account));
            // eslint-disable-next-line no-use-before-define
            dispatch(getCuentaByUser());
            dispatch(
                ModalActions.Success({
                    title: 'Cuenta',
                    body: 'Se agrego con exito una nueva cuenta',
                })
            );
        } catch (e) {
            dispatch(ModalActions.Clean());
            dispatch(fail(e.message));
            dispatch(
                ModalActions.Error({
                    title: 'Error al crear la cuenta',
                    body: e.message,
                })
            );
            if (e.message.indexOf('401') > 0) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
        }
    };
};

const getCuentas = (token, type = null, filters = null) => {
    const request = () => ({ type: CuentasConstants.GET_CUENTAS_REQUEST });
    const success = (accounts) => ({
        type: CuentasConstants.GET_CUENTAS_REQUEST_SUCCESS,
        payload: accounts,
    });
    const fail = (error) => ({
        type: CuentasConstants.GET_CUENTAS_REQUEST,
        payload: { error },
    });
    return async (dispatch) => {
        dispatch(request());
        dispatch(ModalActions.Clean());
        try {
            const resp = await CuentaService.findCuentas(type, filters, token);
            if (resp.status !== 200) {
                dispatch(fail(resp.data.message));
                dispatch(
                    ModalActions.Error({
                        header: 'Error cuentas',
                        body: resp.data.message,
                    })
                );
                return;
            }

            dispatch(success(resp.data.accounts));
        } catch (e) {
            if (e.message.indexOf('401') > 0) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
            // console.err(e);
        }
    };
};
const updateCuenta = (account, token) => {
    const request = () => ({ type: CuentasConstants.UPDATE_CUENTAS_REQUEST });
    const success = (newCuenta) => ({
        type: CuentasConstants.UPDATE_CUENTAS_REQUEST,
        payload: newCuenta,
    });
    const fail = (error) => ({
        type: CuentasConstants.UPDATE_CUENTAS_REQUEST_FAIL,
        payload: { error },
    });

    return async (dispatch) => {
        dispatch(request());
        dispatch(ModalActions.Clean());
        try {
            const resp = await CuentaService.updateCuenta(account, token);
            if (resp.status !== 200) {
                dispatch(fail(resp.data.message));
                dispatch(
                    ModalActions.Error({ title: 'Cuenta', body: resp.data.message })
                );
            }
            dispatch(success(account));
            dispatch(getCuentaByUser(token));
            dispatch(
                ModalActions.Success({ title: 'Cuenta', body: resp.data.message })
            );
        } catch (e) {
            dispatch(fail(e));
            dispatch(ModalActions.Error({ title: 'Cuenta', body: e }));
            if (e.message.indexOf('401') > 0) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
        }
    };
};
const getCuentaByUser = () => {
    const request = () => ({ type: CuentasConstants.GET_CUENTAS_REQUEST });
    const success = (accounts) => ({
        type: CuentasConstants.GET_CUENTAS_REQUEST_SUCCESS,
        payload: accounts,
    });
    const fail = (error) => ({
        type: CuentasConstants.GET_CUENTAS_REQUEST_FAIL,
        payload: { error },
    });
    return async (dispatch) => {
        dispatch(request());
        dispatch(ModalActions.Clean());
        try {
            const account = await CuentaService.getCuentaByUser();
            if (!account) {
                dispatch(fail('Error al obtener las cuentas'));
                dispatch(
                    ModalActions.Error({
                        title: 'Error cuentas',
                        body: 'Error al obtener las cuentas',
                    })
                );
                return;
            }
            dispatch(success(account));
        } catch (e) {
            if (e.message.indexOf('401') > 0) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
        }
    };
};

const deleteCuenta = (id) => {
    const request = () => ({ type: CuentasConstants.DELETE_CUENTAS_REQUEST });
    const success = () => ({
        type: CuentasConstants.DELETE_CUENTAS_REQUEST_SUCCESS,
    });
    const fail = (error) => ({
        type: CuentasConstants.DELETE_CUENTAS_REQUEST_FAIL,
        payload: { error },
    });

    return async (dispatch) => {
        const token = localStorage.getItem('token');
        dispatch(request());
        dispatch(ModalActions.Clean());
        try {
            const resp = await CuentaService.deleteCuenta(id, token);
            if (resp.status !== 200) {
                dispatch(fail(resp.data.message));
                dispatch(
                    ModalActions.Error({ title: 'Cuenta', body: resp.data.message })
                );
                return;
            }
            dispatch(success());
            dispatch(getCuentaByUser());
            dispatch(
                ModalActions.Success({ title: 'Cuenta', body: resp.data.message })
            );
        } catch (e) {
            dispatch(fail(e.message));
            dispatch(ModalActions.Error({ title: 'Cuenta', body: e.message }));
            if (e.message.indexOf('401') > 0) {
                dispatch(LoginActions.Logout());
                window.location.reload();
            }
        }
    };
};

const CuentasAction = {
    createCuenta,
    getCuentas,
    updateCuenta,
    deleteCuenta,
    getCuentaByUser,
};

export default CuentasAction;


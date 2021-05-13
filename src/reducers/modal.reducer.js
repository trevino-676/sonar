import ModalConstants from '../constants/modal.constants';

const initialState = {
    show: false,
    title: null,
    form: null,
    size: null,
    body: null,
    footer: false
}

const ModalReducer = (state = initialState, action) => {
    switch(action.type){
        case ModalConstants.OPEN_FORM:
            return {
                ...state,
                show: true,
                title: action.form.title,
                form: action.form.form,
                size: action.form.size,
                footer: true
            }
        case ModalConstants.SUCCESS:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body,
                size: action.modal.size,
            }
        case ModalConstants.ALERT:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body,
                size: action.modal.size,
            }
        case ModalConstants.ERROR:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body,
                size: action.modal.size,
            }
        case ModalConstants.CLEAN:
            return {
                ...state,
                show: false,
                title: null,
                form: null,
                size: null,
                body: null,
                footer: false,
            }
        default: 
            return {...state};
    }
}

export default ModalReducer;
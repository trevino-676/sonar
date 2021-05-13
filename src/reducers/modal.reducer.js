import ModalConstants from '../constants/modal.constants';

const initialState = {
    show: false,
    title: null,
    form: null,
    size: null,
    body: null
}

const ModalReducer = (state = initialState, action) => {
    switch(action.type){
        case ModalConstants.OPEN_FORM:
            return {
                ...state,
                show: true,
                title: action.form.title,
                form: action.form.form,
                size: action.form.size
            }
        case ModalConstants.SUCCESS:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body
            }
        case ModalConstants.ALERT:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body
            }
        case ModalConstants.ERROR:
            return {
                ...state,
                show: true,
                title: action.modal.title,
                body: action.modal.body
            }
        case ModalConstants.CLEAN:
            return {
                ...state,
                show: false,
                title: null,
                form: null,
                size: null,
                body: null
            }
        default: 
            return {...state};
    }
}

export default ModalReducer;
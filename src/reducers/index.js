import { combineReducers } from 'redux';

import UserReducer from './user.reducer';
import ModalReducer from './modal.reducer';
import CompanyReducer from './Companies.reducer';


const rootReducer = combineReducers({
    user: UserReducer,
    modal: ModalReducer,
    companies: CompanyReducer,
});

export default rootReducer;
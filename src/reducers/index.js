import { combineReducers } from 'redux';

import UserReducer from './user.reducer';
import ModalReducer from './modal.reducer';


const rootReducer = combineReducers({
    user: UserReducer,
    modal: ModalReducer,
});

export default rootReducer;
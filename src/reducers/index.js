import { combineReducers } from 'redux';

import UserReducer from './user.reducer';
import ModalReducer from './modal.reducer';
import CompanyReducer from './Companies.reducer';
import SellsReportsReducer from './SellsReport.reducer';

const rootReducer = combineReducers({
  user: UserReducer,
  modal: ModalReducer,
  companies: CompanyReducer,
  sell_reports: SellsReportsReducer,
});

export default rootReducer;

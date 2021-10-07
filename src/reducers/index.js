import { combineReducers } from 'redux';

import UserReducer from './user.reducer';
import ModalReducer from './modal.reducer';
import CompanyReducer from './Companies.reducer';
import SellsReportsReducer from './SellsReport.reducer';
import PayrollReportsReducer from './payroll.reducer';
import RetentionsReducer from './RetentionsReport.reducer';
import OpinionReportReducer from './Opinion.reducer';
import DetailedReportReducer from './Detailed.reducer';
import ConfigReducer from './config.reducer';
import AlertReducer from './alert.reducer';
import AccountStatmentReducer from './AccountStatments.reducer';
import AccountsReducer from './Accounts.reducer';

const rootReducer = combineReducers({
  alert: AlertReducer,
  user: UserReducer,
  modal: ModalReducer,
  companies: CompanyReducer,
  sell_reports: SellsReportsReducer,
  payroll_reports: PayrollReportsReducer,
  retentions: RetentionsReducer,
  opinion: OpinionReportReducer,
  detailed: DetailedReportReducer,
  config: ConfigReducer,
  account_statments: AccountStatmentReducer,
  accounts: AccountsReducer,
});

export default rootReducer;

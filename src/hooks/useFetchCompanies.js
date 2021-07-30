import { useEffect } from 'react';

import CompanyActions from '../actions/company.action';

const useFetchCompanies = (dispatch) => {
  useEffect(() => {
    dispatch(CompanyActions.getCompaniesByUser());
  }, [dispatch]);
};

export default useFetchCompanies;

import { useEffect } from 'react';

const useReportTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useReportTitle;

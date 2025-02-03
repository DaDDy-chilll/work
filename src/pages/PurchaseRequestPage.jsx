import RequestDocument from '../components/ui/RequestDocument';
import { useGetPurchaseRequests } from '../api';
import { useState } from 'react';
import { useGetCurrentPath } from '../hooks/useGetCurrentPath';
import { WORKFLOW_TYPES_LIST } from '../constants';

const PurchaseRequestPage = () => {
  const [page, setPage] = useState(1);
  const pathname = useGetCurrentPath();
  const { isError, error, data, isFetching } = useGetPurchaseRequests({
    sort: 'createdAt',
    page,
    limit: 10,
    workflowType:Object.keys(WORKFLOW_TYPES_LIST)[0] ,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;
  return (
    <>
      {/*Props to give --> data, isFetching, currentPath, setPage function */}
      <RequestDocument
        resultData={data}
        page={page}
        changePage={setPage}
        isFetching={isFetching}
        currentPath={pathname}
      />
    </>
  );
};

export default PurchaseRequestPage;

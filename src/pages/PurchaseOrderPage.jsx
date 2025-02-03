import RequestDocument from '../components/ui/RequestDocument';
import { useGetPurchaseOrders } from '../api';
import { useState } from 'react';
import { useGetCurrentPath } from '../hooks/useGetCurrentPath';
import { WORKFLOW_TYPES_LIST } from '@/constants';



const PurchaseOrderPage = () => {
  const [page, setPage] = useState(1);
  const pathname = useGetCurrentPath();
  const { isError, error, data, isFetching } = useGetPurchaseOrders({
    sort: 'createdAt',
    page,
    limit: 10,
    workflowType:Object.keys(WORKFLOW_TYPES_LIST)[1] ,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;
  return (
    <>
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

export default PurchaseOrderPage;

import RequestDocument from '../components/ui/RequestDocument';
import { useGetPurchaseRequests } from '../api';
import { useState } from 'react';
import { useGetCurrentPath } from '../hooks/useGetCurrentPath';
import { WORKFLOW_TYPES_LIST } from '../constants';
import moment from 'moment';
const PurchaseRequestPage = () => {
  const [page, setPage] = useState(1);
  const [search,setSearch] = useState('')
  const [date,setDate] = useState({
    startDate: '',
    endDate: ''
  })
  const pathname = useGetCurrentPath();

  const convertUtc = ({ startDate, endDate }) => {
    const startTime = moment(startDate).utc().format();
    let endTime = moment(endDate).add(1, 'days').utc().format();

    if (startTime === endTime) {
      endTime = moment(endDate).add(1, 'days').utc().format();
    }

    return { startTime, endTime };
  };

  const { isError, error, data, isFetching } = useGetPurchaseRequests({
    search,
    sort: 'createdAt',
    page,
    limit: 10,
    workflowType:Object.keys(WORKFLOW_TYPES_LIST)[0] ,
    startDate: date.startDate && date.endDate ? convertUtc(date).startTime : '',
    endDate: date.startDate && date.endDate ? convertUtc(date).endTime : '',
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
        setSearch={setSearch}
        setDate={setDate}
      />
    </>
  );
};

export default PurchaseRequestPage;

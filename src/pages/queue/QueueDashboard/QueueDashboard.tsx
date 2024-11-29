import { Grid2 } from "@mui/material";
import styles from "./QueueDashboard.module.css"
import DataTable, { Column } from "../../../components/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getQueueOfPatients, getQueueOfPatientsNotCheckedIn, updateCheckIn } from "../../../util/requests/queueRequest";
import { useEffect, useMemo, useState } from "react";
import useStore from "../../../util/store/store";

const columns: readonly Column[] = [
  {
    id: 'queueId',
    label: 'Queue Id',
    minWidth: 50,
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
  },
  {
    id: 'icNo',
    label: 'IC No.',
    minWidth: 100,
  },
  {
    id: 'startTime',
    label: 'Start Time',
    minWidth: 100,
  },
  {
    id: 'endTime',
    label: 'End Time',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
];

function QueueDashboard(){
  const [currServing, setCurrServing] = useState<number>();
  const {data} = useQuery({
    queryKey: ['queue'],
    queryFn: getQueueOfPatientsNotCheckedIn,
    initialData: [],
  })

  const queueCurrServing = useMemo(()=>{
    return data[0]?.queueId ?? 'No Item in Queue'
  }, [data])
  
  const handleCheckIn = async(payload) => {
    const response = await updateCheckIn({params: payload.queueId, formState: {checkIn: true}});
    const data = await response.data;
  }

  return(
    <section className={styles.mainCont}>
      <h1>Dashboard</h1>
      <Grid2 container>
        <Grid2 size={12}>
          <h2 className={styles.nowServingHeader}>Now Serving:</h2>
          <p className={styles.nowServingNum}>{queueCurrServing}</p>
        </Grid2>
        <Grid2 size={12}>
          <DataTable rows={data} action={handleCheckIn} columns={columns} isQueueTable={true}/>
        </Grid2>
      </Grid2>
    </section>
  )
}

export default QueueDashboard;
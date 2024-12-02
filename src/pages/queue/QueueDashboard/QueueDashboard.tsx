import { Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import DataTable, { Column } from "../../../components/table/DataTable";
import useSSE from "../../../util/hooks/useSSE";
import {
  getQueueOfPatientsNotCheckedIn,
  updateCheckIn,
} from "../../../util/requests/queueRequest";
import { BASE_URL } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";
import styles from "./QueueDashboard.module.css";

const columns: readonly Column[] = [
  {
    id: "queueId",
    label: "Queue Id",
    minWidth: 50,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "icNo",
    label: "IC No.",
    minWidth: 100,
  },
  {
    id: "startTime",
    label: "Joined Queue",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

function QueueDashboard() {
  const {queueTrigger} = useSSE(`${BASE_URL}/api/sse/subscribe`);
  const { setToolbarTitle } = useStore();
  const { data, refetch } = useQuery({
    queryKey: ["queue"],
    queryFn: getQueueOfPatientsNotCheckedIn,
    initialData: [],
  });

  const queueCurrServing = useMemo(() => {
    return data[0]?.queueId ?? "No Item in Queue";
  }, [data]);

  const handleCheckIn = async (payload) => {
    const response = await updateCheckIn({
      params: payload.queueId,
      formState: { checkIn: true },
    });
  };

  useEffect(()=>{
    setToolbarTitle('Home')
  },[]);

  useEffect(()=>{
    refetch();
  }, [queueTrigger])

  return (
    <section className={styles.mainCont}>
      <Grid2 container>
        <Grid2 size={12}>
          <h2 className={styles.nowServingHeader}>Now Serving:</h2>
          <p className={styles.nowServingNum}>{queueCurrServing}</p>
        </Grid2>
      </Grid2>
      <div>
        <DataTable
          rows={data}
          action={handleCheckIn}
          columns={columns}
          isQueueTable={true}
        />
      </div>
    </section>
  );
}

export default QueueDashboard;

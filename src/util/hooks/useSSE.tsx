import { useState, useEffect } from "react";

const sseEventNames = {
  queueCheckin: "queueCheckin",
  appointmentConfirmation: "appointmentConfirmation",
  appointmentArrival: "appointmentArrival"
};

const useSSE = (url: string) => {
  const [queueTrigger, setQueueTrigger] = useState<boolean>(false);
  const [aptConfTrigger, setAptConfTrigger] = useState<boolean>(false);
  const [aptArrivalTrigger, setAptArrivalTrigger] = useState<boolean>(false);
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.addEventListener(sseEventNames.queueCheckin, () => {
      setQueueTrigger((prev) => !prev);
    });

    eventSource.addEventListener(sseEventNames.appointmentConfirmation, () => {
      setAptConfTrigger((prev) => !prev);
    });

    eventSource.addEventListener(sseEventNames.appointmentArrival, () => {
      setAptArrivalTrigger((prev) => !prev);
    });

    eventSource.onerror = (error: Event) => {
      if (isFirstConnection) {
        setIsFirstConnection(false);
        return;
      }

      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { queueTrigger, aptConfTrigger, aptArrivalTrigger };
};

export default useSSE;

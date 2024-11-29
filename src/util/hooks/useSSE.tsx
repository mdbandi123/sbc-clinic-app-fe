import { useState, useEffect } from "react";

const sseEventNames = {
  queueCheckin: "queueCheckin",
};

const useSSE = (url: string) => {
  const [queueTrigger, setQueueTrigger] = useState<boolean>(false);
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.addEventListener(sseEventNames.queueCheckin, () => {
      setQueueTrigger((prev) => !prev);
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

  return { queueTrigger };
};

export default useSSE;

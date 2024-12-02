import { useEffect, useState } from "react";

const useSSE = (url: string) => {
  const [queueTrigger, setQueueTrigger] = useState<boolean>(false);
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = () => {
      console.log("triggered");
      setQueueTrigger((prev) => !prev);
    }

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

import { useState, useEffect } from "react";

const useSSE = (url: string) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = () => {
      console.log("triggered");
      setTrigger((prev) => !prev);
    };

    eventSource.onerror = (error) => {
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

  return trigger;
};

export default useSSE;

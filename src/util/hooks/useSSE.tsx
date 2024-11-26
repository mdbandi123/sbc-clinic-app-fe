import { useState, useEffect } from "react";

const useSSE = (url: string) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(true);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = () => {
      console.log("triggered");
      setTrigger((prev) => !prev);
    }

    eventSource.onerror = (error) => {
      // Avoid logging on first connection attempt (may happen after page refresh)
      if (isFirstConnection) {
        console.log("first time ko to");
        setIsFirstConnection(false);  // Update flag after first connection
        return;
      }

      console.log("SSE error", error);
      eventSource.close();
    }

    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    }
  }, [url]);

  return trigger;
}

export default useSSE;

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebSocketTest from './WebSocketTest'
import useSSE from './useSSE'

function App() {
  const [counter, setCounter] = useState<number>(0);
  const trigger = useSSE("http://localhost:8080/api/SSE/subscribe");

  useEffect(()=>{
    console.log("hello");
    setCounter((prev)=>{
      return prev = prev + 1;
    });
  }, [trigger])
  return (
    <>
      <h1>{counter}</h1>
    </>
  )
}

export default App

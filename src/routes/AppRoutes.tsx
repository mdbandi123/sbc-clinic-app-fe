import { Route, Routes } from "react-router";
import QueueDashboard from "../pages/QueueDashboard";
import { routes } from "./routes";

function AppRoutes(){
  return(
    <Routes>
      {/* declare routes here */}
      <Route path={routes.home} element={<QueueDashboard/>}/>
    </Routes>
  )
}

export default AppRoutes;
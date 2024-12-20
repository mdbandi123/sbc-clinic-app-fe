import "./App.css";
import NavDrawer from "./components/nav/NavDrawer";
import AppRoutes from "./util/routes/AppRoutes";

function App() {
  return (
    <>
      <NavDrawer>
        <AppRoutes />
      </NavDrawer>
    </>
  );
}

export default App;

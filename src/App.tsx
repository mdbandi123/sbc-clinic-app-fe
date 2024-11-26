import './App.css'
import NavDrawer from './components/NavDrawer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <NavDrawer>
        <AppRoutes/>
      </NavDrawer>
    </>
  )
}

export default App;

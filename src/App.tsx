import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css'
import NavDrawer from './components/nav/NavDrawer';
import AppRoutes from './util/routes/AppRoutes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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

import './App.css'
import Layout from './Pages/Layout/Layout'
import { Routes, Route} from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import ContestQuestion from './Pages/ContestQuestion/Contestquestion'

import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <>
      <Routes>       
        <Route element={<PrivateRoutes />} >             
            <Route path='/contestquestion/:id' element={<ContestQuestion />} />
        </Route>
      
        <Route path="/*" element={<Layout />} />
        


      </Routes>
      

      <ToastContainer />
    </>
  )
}

export default App
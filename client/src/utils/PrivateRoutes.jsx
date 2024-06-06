import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let auth = {'loggedIn': localStorage.getItem('isLoggedIn'), 'expiresIn':  new Date(localStorage.getItem('expiresIn'))}
    return (
        auth.loggedIn === 'true' && auth.expiresIn > Date.now() ? <Outlet /> : <Navigate to='/login' /> 
    )
}

export default PrivateRoutes
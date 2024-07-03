import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let auth = {'token': localStorage.getItem('token'), 'expiresIn':  new Date(JSON.parse(localStorage.getItem('expiresIn')))}
    console.log(auth)
    return (
        auth.token && auth.expiresIn > Date.now() ? <Outlet /> : <Navigate to='/login' /> 
    )
}

export default PrivateRoutes
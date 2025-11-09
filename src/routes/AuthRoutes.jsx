import { Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AuthRoutes = () => {
    return (
        <>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </>
    )
}

export default AuthRoutes
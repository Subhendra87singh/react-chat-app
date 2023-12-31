import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({ isAuthenticated }) => {

    return (
        <div>
            {
                isAuthenticated ? <Outlet /> : <Navigate to="/login" />
            }
        </div>

    )
}

export default PrivateRoutes;
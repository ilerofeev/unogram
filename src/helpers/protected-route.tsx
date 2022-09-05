import * as ROUTES from '../constants/routes'
import { User } from '../hooks/use-user'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ user }: { user: User }) {
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: ROUTES.SIGNIN }} state={{ from: location }} />
  )
}

import * as ROUTES from '../constants/routes'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { User } from 'firebase/auth'

export default function ProtectedRoute({ user }: { user: User | null }) {
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: ROUTES.SIGNIN }} state={{ from: location }} />
  )
}

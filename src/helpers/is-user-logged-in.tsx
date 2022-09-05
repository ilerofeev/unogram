import { User } from '../hooks/use-user'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function IsUserLoggedIn({
  user,
  loggedInPath,
}: {
  user: User
  loggedInPath: string
}) {
  const location = useLocation()

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: loggedInPath }} state={{ from: location }} />
  )
}

import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user'
import ProtectedRoute from './helpers/protected-route'
import useAuthListener from './hooks/use-auth-listener'

const SignUp = lazy(() => import('./pages/sign-up'))
const SignIn = lazy(() => import('./pages/sign-in'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))
const NotFound = lazy(() => import('./pages/not-found'))

export default function App() {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={ROUTES.SIGNUP} element={<SignUp />}></Route>
            <Route path={ROUTES.SIGNIN} element={<SignIn />}></Route>
            <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard user={user} />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

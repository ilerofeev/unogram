import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'

const Login = lazy(() => import('./pages/login'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>} />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

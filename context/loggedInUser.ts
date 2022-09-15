import { createContext } from 'react'
import { User } from '../hooks/use-user'

const LoggedInUserContext = createContext<{ user: User }>({ user: {} as User })

export default LoggedInUserContext

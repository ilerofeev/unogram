import { createContext } from 'react'

const FirebaseContext = createContext<{ firebase: any; FieldValue: any } | null>(null)

export default FirebaseContext

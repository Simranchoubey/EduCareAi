import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [profile, setProfile] = useState({
    cgpa: '',
    field: '',
    budget: '',
    country: '',
    experience: '',
  })
  const [costResult, setCostResult] = useState(null)
  const [healthResult, setHealthResult] = useState(null)

  return (
    <AppContext.Provider value={{ profile, setProfile, costResult, setCostResult, healthResult, setHealthResult }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

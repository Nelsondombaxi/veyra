import { useState } from 'react'
import './App.css'
import FirstAccess from "./pages/FirstAccess/FirstAccess.jsx"
import MainLayout from "./components/Layout/MainLayout/MainLayout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import StartScreen from "./components/StartScreen/StartScreen.jsx"

function App() {
  // Determine if there is an existing saved user in localStorage (pre-existing access)
  const saved = typeof window !== 'undefined' ? localStorage.getItem('veyra_user') : null
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : null))

  // Show the start screen only when the app loaded a saved user from localStorage
  const [showStart, setShowStart] = useState(() => !!saved)
  const [canCreateAnother, setCanCreateAnother] = useState(() => !!saved)

  const handleLogin = (u) => {
    // Called when a user is created via FirstAccess/ProfileModal.
    // For newly created users in the same session we go directly to the Dashboard (no start screen).
    setUser(u)
    setShowStart(false)
    setCanCreateAnother(!!localStorage.getItem('veyra_user'))
  }

  const handleStart = () => setShowStart(false)

  const handleCreateAnother = () => {
    localStorage.removeItem('veyra_user')
    setUser(null)
    setShowStart(false)
    setCanCreateAnother(false)
  }

  if (!user) {
    return (
      <div className="App">
        <FirstAccess onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="App">
      <MainLayout user={user}>
        {showStart ? (
          <StartScreen user={user} onStart={handleStart} onCreateAnother={handleCreateAnother} canCreateAnother={canCreateAnother} />
        ) : (
          <Dashboard user={user} />
        )}
      </MainLayout>
    </div>
  )
}

export default App
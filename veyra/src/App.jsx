import React, { useState } from 'react'
import './App.css'
import FirstAccess from "./pages/FirstAccess/FirstAccess.jsx"
import MainLayout from "./components/Layout/MainLayout/MainLayout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Projects from "./pages/Projects/Projects.jsx" 
import Finance from "./pages/Finance/Finance.jsx" 
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx" 
import StartScreen from "./components/UI/StartScreen/StartScreen.jsx"

function App() {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('veyra_user') : null
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : null))
  
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const [showStart, setShowStart] = useState(false)

  const handleLogin = (u) => {
    setUser(u)
    setShowStart(false)
  }

  const handleStart = () => setShowStart(false)

  const handleLockScreen = () => setShowStart(true)

  const handleCreateNewAccount = () => {
    localStorage.removeItem('veyra_user') 
    setUser(null)
    setShowStart(false)
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
      <MainLayout 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLock={handleLockScreen}
      >
        {showStart ? (
          <StartScreen 
            user={user} 
            onStart={handleStart} 
            onCreateAnother={handleCreateNewAccount} 
            canCreateAnother={true} 
          />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard user={user} />}
            {activeTab === 'projetos' && <Projects user={user} />}
            {activeTab === 'financeiro' && <Finance user={user} />} 
            {activeTab === 'calendario' && <CalendarPage user={user} />}
          </>
        )}
      </MainLayout>
    </div>
  )
}

export default App;
import React, { useState } from 'react'
import './App.css'
import FirstAccess from "./pages/FirstAccess/FirstAccess.jsx"
import MainLayout from "./components/Layout/MainLayout/MainLayout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Projects from "./pages/Projects/Projects.jsx" 
import Finance from "./pages/Finance/Finance.jsx" 
import CalendarPage from "./pages/CalendarPage/CalendarPage.jsx" // 1. IMPORTA AQUI
import StartScreen from "./components/StartScreen/StartScreen.jsx"

function App() {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('veyra_user') : null
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : null))
  
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showStart, setShowStart] = useState(() => !!saved)
  const [canCreateAnother, setCanCreateAnother] = useState(() => !!saved)

  const handleLogin = (u) => {
    setUser(u)
    setShowStart(false)
  }

  const handleStart = () => setShowStart(false)

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
      >
        {showStart ? (
          <StartScreen 
            user={user} 
            onStart={handleStart} 
            onCreateAnother={() => {}} 
            canCreateAnother={canCreateAnother} 
          />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard user={user} />}
            {activeTab === 'projetos' && <Projects user={user} />}
            {activeTab === 'financeiro' && <Finance user={user} />} 
            
            {/* 2. CONEXÃO REAL DO CALENDÁRIO AQUI */}
            {activeTab === 'calendario' && <CalendarPage user={user} />}
          </>
        )}
      </MainLayout>
    </div>
  )
}

export default App;
import { useState } from 'react'
import './App.css'
import FirstAccess from "./pages/FirstAccess/FirstAccess.jsx"
import MainLayout from "./components/Layout/MainLayout/MainLayout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Projects from "./pages/Projects/Projects.jsx" 
import StartScreen from "./components/StartScreen/StartScreen.jsx"

function App() {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('veyra_user') : null
  const [user, setUser] = useState(() => (saved ? JSON.parse(saved) : null))
  
  // Estado que controla a navegação
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
            {/* Troca de conteúdo dinâmica */}
            {activeTab === 'dashboard' && <Dashboard user={user} />}
            {activeTab === 'projetos' && <Projects />}
          </>
        )}
      </MainLayout>
    </div>
  )
}

export default App;
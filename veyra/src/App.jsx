import { useState } from 'react'
import './App.css'
import FirstAccess from "./pages/FirstAccess/FirstAccess.jsx"
import MainLayout from "./components/Layout/MainLayout/MainLayout.jsx"

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('veyra_user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [loading] = useState(false)

  if (loading) return null

  return (
    <div className="App">
      {!user ? (
        <FirstAccess onLogin={setUser} />
      ) : (
        <MainLayout user={user}>
          <div className="dashboard-temp">
            <header>
              <span>Visão Geral</span>
              <h1>Olá, {user?.name || 'Usuário'} 👋</h1>
            </header>
            
            <div className="stats-grid-placeholder">
              <div className="stat-card">Seu painel Veyra está pronto.</div>
            </div>
          </div>
        </MainLayout>
      )}
    </div>
  )
}

export default App
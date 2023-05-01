import './App.css'
import NavBar from './components/NavBar'
import Card from './components/Card'

function App() {
  return (
    <div className="app">
      <header className="header">
        <NavBar />
      </header>
      <main className="main">
        <Card />
      </main>
    </div>
  )
}

export default App

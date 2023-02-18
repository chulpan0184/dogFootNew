import './App.css'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { HeaderMemo as Header } from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
        <hr />
        <Footer />
      </div>
    </>
  )
}

export default App

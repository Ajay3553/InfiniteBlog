import {Outlet} from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <div>
      <Header />
      <main className=''>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </div>
  )
}

export default App

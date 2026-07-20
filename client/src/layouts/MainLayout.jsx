import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-slate-950 transition-colors">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
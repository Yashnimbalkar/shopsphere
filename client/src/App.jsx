import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to ShopSphere — Home page coming next!
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h3 className="text-emerald-400 font-semibold mb-2">ShopSphere</h3>
          <p className="text-sm text-gray-400">
            Your one-stop shop for everything, delivered fast.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            <li><Link to="/track-order" className="hover:text-emerald-400 transition-colors">Track Order</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <ul className="text-sm space-y-1">
            <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} ShopSphere. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
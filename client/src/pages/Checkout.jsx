import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAddresses, addAddress } from '../services/addressService'
import { placeOrder } from '../services/orderService'
import { clearCart } from '../redux/cartSlice'
import DummyCardForm from '../components/DummyCardForm'

function Checkout() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [placing, setPlacing] = useState(false)
  const [cardValid, setCardValid] = useState(false)
  const [error, setError] = useState('')

  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', addressLine: '', city: '', state: '', postalCode: '', isDefault: false,
  })

  useEffect(() => {
    getAddresses()
      .then((data) => {
        setAddresses(data)
        const defaultAddr = data.find((a) => a.is_default) || data[0]
        if (defaultAddr) setSelectedAddressId(defaultAddr.id)
        else setShowNewAddressForm(true)
      })
      .catch((err) => console.error('Failed to load addresses:', err))
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  function handleNewAddressChange(e) {
    const { name, value, type, checked } = e.target
    setNewAddress({ ...newAddress, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSaveAddress(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await addAddress(newAddress)
      setAddresses(data.addresses)
      setSelectedAddressId(data.addressId)
      setShowNewAddressForm(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address')
    }
  }

  async function handlePlaceOrder() {
    if (!selectedAddressId) {
      setError('Please select or add a shipping address')
      return
    }
    if (paymentMethod === 'card' && !cardValid) {
      setError('Please enter valid card details')
      return
    }
    setPlacing(true)
    setError('')
    try {
      const transactionId = paymentMethod === 'card' ? `TXN-${Date.now()}` : null
      const data = await placeOrder({ addressId: selectedAddressId, paymentMethod, transactionId })
      dispatch(clearCart())
      navigate(`/order-confirmation/${data.orderId}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <Link to="/products" className="text-emerald-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md mb-4">{error}</div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Shipping Address</h2>

            {addresses.length > 0 && !showNewAddressForm && (
              <div className="space-y-3 mb-4">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block border rounded-md p-3 cursor-pointer text-sm ${
                      selectedAddressId === addr.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mr-2 accent-emerald-600"
                    />
                    <span className="font-medium">{addr.full_name}</span> — {addr.phone}
                    <br />
                    <span className="text-gray-500">
                      {addr.address_line}, {addr.city}, {addr.state} {addr.postal_code}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {!showNewAddressForm ? (
              <button
                onClick={() => setShowNewAddressForm(true)}
                className="text-sm text-emerald-600 hover:underline"
              >
                + Add a new address
              </button>
            ) : (
              <form onSubmit={handleSaveAddress} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="fullName" placeholder="Full Name" required
                    value={newAddress.fullName} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm col-span-2 sm:col-span-1"
                  />
                  <input
                    name="phone" placeholder="Phone Number" required
                    value={newAddress.phone} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm col-span-2 sm:col-span-1"
                  />
                  <input
                    name="addressLine" placeholder="Address Line" required
                    value={newAddress.addressLine} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm col-span-2"
                  />
                  <input
                    name="city" placeholder="City" required
                    value={newAddress.city} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    name="state" placeholder="State" required
                    value={newAddress.state} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    name="postalCode" placeholder="Postal Code" required
                    value={newAddress.postalCode} onChange={handleNewAddressChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm col-span-2 sm:col-span-1"
                  />
                  <label className="flex items-center gap-2 text-sm text-gray-600 col-span-2 sm:col-span-1">
                    <input
                      type="checkbox" name="isDefault"
                      checked={newAddress.isDefault} onChange={handleNewAddressChange}
                      className="accent-emerald-600"
                    />
                    Set as default
                  </label>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                  >
                    Save Address
                  </button>
                  {addresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio" checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')} className="accent-emerald-600"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio" checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')} className="accent-emerald-600"
                />
                Credit / Debit Card
              </label>
              {paymentMethod === 'card' && <DummyCardForm onCardValidChange={setCardValid} />}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit w-full md:w-80 shrink-0">
          <h2 className="font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600 mb-4 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product_id} className="flex justify-between">
                <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-gray-600 border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-4 mb-6">
            <span>Total</span><span>₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={placing || (paymentMethod === 'card' && !cardValid)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-md transition-colors disabled:opacity-60"
          >
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
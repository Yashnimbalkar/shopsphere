import { useSelector } from 'react-redux'

function Cart() {
  const items = useSelector((state) => state.cart.items)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h1>
      <p className="text-gray-500">
        Redux is connected. Current items in store: {items.length}
      </p>
    </div>
  )
}

export default Cart
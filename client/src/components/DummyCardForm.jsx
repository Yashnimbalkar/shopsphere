import { useState } from 'react'
import { FiCreditCard } from 'react-icons/fi'

function DummyCardForm({ onCardValidChange }) {
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })

  function formatCardNumber(value) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  function handleChange(e) {
    const { name, value } = e.target
    let formatted = value
    if (name === 'number') formatted = formatCardNumber(value)
    if (name === 'expiry') formatted = formatExpiry(value)
    if (name === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 3)

    const updated = { ...card, [name]: formatted }
    setCard(updated)

    const isValid =
      updated.number.replace(/\s/g, '').length === 16 &&
      updated.expiry.length === 5 &&
      updated.cvv.length === 3 &&
      updated.name.trim().length > 0

    onCardValidChange(isValid)
  }

  return (
    <div className="space-y-3 mt-4 border-t border-gray-100 pt-4">
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
        <FiCreditCard size={14} />
        Test mode — no real payment will be processed
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">Card Number</label>
        <input
          name="number"
          value={card.number}
          onChange={handleChange}
          placeholder="4242 4242 4242 4242"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Cardholder Name</label>
          <input
            name="name"
            value={card.name}
            onChange={handleChange}
            placeholder="Yash Nimbalkar"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Expiry</label>
          <input
            name="expiry"
            value={card.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="w-24">
        <label className="block text-xs text-gray-500 mb-1">CVV</label>
        <input
          name="cvv"
          value={card.cvv}
          onChange={handleChange}
          placeholder="123"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
    </div>
  )
}

export default DummyCardForm
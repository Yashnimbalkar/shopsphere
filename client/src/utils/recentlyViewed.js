const STORAGE_KEY = 'shopsphere_recently_viewed'
const MAX_ITEMS = 8

export function addRecentlyViewed(product) {
  const existing = getRecentlyViewed()
  const filtered = existing.filter((p) => p.id !== product.id)
  const updated = [
    { id: product.id, name: product.name, price: product.price, image: product.image },
    ...filtered,
  ].slice(0, MAX_ITEMS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
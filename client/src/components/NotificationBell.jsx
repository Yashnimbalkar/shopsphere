import { useState, useEffect, useRef } from 'react'
import { FiBell } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../services/notificationService'

function NotificationBell() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef(null)

  function loadNotifications() {
    if (!user) return
    getNotifications()
      .then((data) => {
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      })
      .catch((err) => console.error('Failed to load notifications:', err))
  }

  useEffect(loadNotifications, [user])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleToggle() {
    const next = !open
    setOpen(next)
    if (next && unreadCount > 0) {
      await markAllNotificationsRead()
      setUnreadCount(0)
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    }
  }

  async function handleItemClick(id) {
    await markNotificationRead(id)
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} className="relative hover:text-emerald-400 transition-colors" aria-label="Notifications">
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-100 dark:border-slate-700 max-h-96 overflow-y-auto z-50">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 font-semibold text-gray-800 dark:text-gray-100 text-sm">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No notifications yet</p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => handleItemClick(n.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                  !n.is_read ? 'bg-emerald-50 dark:bg-emerald-950' : ''
                }`}
              >
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
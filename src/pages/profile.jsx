import React from 'react'
import Navbar from '../components/Navbar'

export default function Profile() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {}
    } catch {
      return {}
    }
  })()

  const first = user.fname || user.firstName || user.firstname || user.first_name || ''
  const last = user.lname || user.lastName || user.lastname || user.last_name || ''
  const fullName = [first, last].filter(Boolean).join(' ')

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="text-2xl font-semibold mb-6">Profile</h1>

        <div className="bg-[#0f172a] rounded-2xl shadow p-6 flex gap-6 items-center border border-slate-700">
          <img
            src={user.profileImage || '/avatar-placeholder.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
            onError={(e) => { e.currentTarget.src = '/avatar-placeholder.png' }}
          />
          <div className="flex-1 space-y-1">
            <p className="text-xl font-semibold">{fullName || user.username || 'User'}</p>
            <p className="text-gray-600 dark:text-gray-300">{user.email || '—'}</p>
            {user.age !== undefined && (
              <p className="text-gray-600 dark:text-gray-300">Age: {user.age}</p>
            )}
            <p className="text-gray-400 text-sm">Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f172a] rounded-xl p-5 shadow border border-slate-700">
            <h2 className="font-semibold mb-3">Account Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">First name</span><span>{first || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Last name</span><span>{last || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span>{user.email || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Age</span><span>{user.age ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">User ID</span><span className="truncate max-w-[220px]">{user._id || '—'}</span></div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="font-semibold mb-3">Security</h2>
            <p className="text-sm text-gray-500">You are logged in. Keep your account secure by using a strong password.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

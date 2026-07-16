import React, { useState } from 'react'
import dummyProfile from '../assets/dummyProfile.jpg'

const dummyFollowers = [
  { id: 1, name: 'Rohit Sharma', username: 'rohit', profileImage: dummyProfile, isFollowing: true },
  { id: 2, name: 'Neha Gupta', username: 'neha_g', profileImage: dummyProfile, isFollowing: false },
  { id: 3, name: 'Sanjay Kumar', username: 'sanjay_k', profileImage: dummyProfile, isFollowing: true },
  { id: 4, name: 'Priya Singh', username: 'priya', profileImage: dummyProfile, isFollowing: false },
  { id: 5, name: 'Ayesha Khan', username: 'ayesha', profileImage: dummyProfile, isFollowing: false },
]

function Followers() {
  const [followers, setFollowers] = useState(dummyFollowers)

  const toggleFollow = (id) => {
    setFollowers((prev) => prev.map((f) => (f.id === id ? { ...f, isFollowing: !f.isFollowing } : f)))
  }

  const handleMessage = (user) => {
    // placeholder: integrate real messaging later
    alert(`Message to ${user.name} (@${user.username})`)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Followers</h3>

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-100 bg-white">
        {followers.map((user) => (
          <li key={user.id} className="flex items-center gap-4 px-4 py-3">
            <img src={user.profileImage} alt={user.name} className="h-12 w-12 rounded-full object-cover" />

            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900">{user.name}</div>
              <div className="text-xs text-slate-500">@{user.username}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleFollow(user.id)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                  user.isFollowing ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={() => handleMessage(user)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Message
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Followers


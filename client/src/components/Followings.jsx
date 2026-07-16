import React, { useState } from 'react'
import dummyProfile from '../assets/dummyProfile.jpg'

const dummyFollowings = [
  { id: 1, name: 'Ankit Verma', username: 'ankit_v', profileImage: dummyProfile, isFollowing: true },
  { id: 2, name: 'Rina Patel', username: 'rina_p', profileImage: dummyProfile, isFollowing: true },
  { id: 3, name: 'Karan Mehta', username: 'karan_m', profileImage: dummyProfile, isFollowing: true },
  { id: 4, name: 'Lata Joshi', username: 'lata_j', profileImage: dummyProfile, isFollowing: true },
  { id: 5, name: 'Vikram Singh', username: 'vikram', profileImage: dummyProfile, isFollowing: true },
]

function Followings() {
  const [followings, setFollowings] = useState(dummyFollowings)

  const toggleFollow = (id) => {
    setFollowings((prev) => prev.map((f) => (f.id === id ? { ...f, isFollowing: !f.isFollowing } : f)))
  }

  const handleMessage = (user) => {
    // placeholder for messaging flow
    alert(`Message to ${user.name} (@${user.username})`)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Following</h3>

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-100 bg-white">
        {followings.map((user) => (
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
                  user.isFollowing ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {user.isFollowing ? 'Unfollow' : 'Follow'}
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

export default Followings
 

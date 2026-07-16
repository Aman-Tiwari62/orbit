import React from 'react'
import hero from '../assets/hero.png'
import dummyProfile from '../assets/dummyProfile.jpg'
import orbitLogo from '../assets/orbitLogo.png'

const dummyPosts = [
  { id: 1, image: hero, caption: 'At the city monument', likes: 142, comments: 12 },
  { id: 2, image: dummyProfile, caption: 'Sunny day by the river', likes: 98, comments: 6 },
  { id: 3, image: orbitLogo, caption: 'Nature walk', likes: 76, comments: 3 },
  { id: 4, image: hero, caption: 'Evening lights', likes: 54, comments: 2 },
  { id: 5, image: dummyProfile, caption: 'Casual stroll', likes: 31, comments: 1 },
  { id: 6, image: orbitLogo, caption: 'Quiet moment', likes: 18, comments: 0 },
]

function MyPosts() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      {/* <h3 className="mb-4 text-lg font-semibold text-slate-800">My posts</h3> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyPosts.map((post) => (
          <article key={post.id} className="relative overflow-hidden rounded-lg bg-slate-100 shadow-sm group">
            <img
              src={post.image}
              alt={post.caption}
              className="h-48 h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex justify-end p-2">
                <div className="rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 bg-gradient-to-t from-black/50 to-transparent px-3 py-2">
                <div className="max-w-[70%] text-sm font-medium text-white line-clamp-2">{post.caption}</div>
                <div className="flex items-center gap-3 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-rose-400">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.54 0 3.04.99 3.57 2.36h.87C14.46 4.99 15.96 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M21 6h-2v9H7v2a1 1 0 001 1h9l4 4V7a1 1 0 00-1-1z" />
                      <path d="M17 2H3a1 1 0 00-1 1v12l4-4h11a1 1 0 001-1V3a1 1 0 00-1-1z" />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyPosts
// import React from 'react'

// function MyPosts() {
//   return (
//     <div>
//       myPosts
//     </div>
//   )
// }

// export default MyPosts

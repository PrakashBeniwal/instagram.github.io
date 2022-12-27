import React from 'react'
import './allreels.scss'
const Allreels = () => {
  const posts = []
  return (
    <div className='allreels'>

      <div className="reel">
        {
          posts.map((post) => {
            return (
              <div className="reelvideo" key={post.id}>
                <img src={post.img} alt="" />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Allreels
import { React } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './allposts.scss'
const AllPosts = (id) => {
  const posts = []
  return (
    <div className='allposts'>

      <div className="all">
        {
          posts.map((post) => {
            return (
              <Link to={`/OpenPost#${post._id}`} >  <div className="postimg" key={post._id}>
                <img src={post.post} alt="" />
              </div></Link>
            )
          })
        }
      </div>

    </div>
  )
}

export default AllPosts
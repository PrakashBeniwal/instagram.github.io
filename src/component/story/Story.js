import React from 'react'
import './story.scss'
import { Link } from 'react-router-dom'
const Story = () => {
  const stories = [];
  return (

    <div className='Story'>

      <div className="stories">
        <div className="story">
          <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
          <span>Your story</span>
        </div>

        {stories.map((story) => {
          return (
            <div className="story" key={story.id}>
              <Link to={'/' + story.name}><img src={story.img} alt="" /></Link>
              <span>{story.name}</span>
            </div>
          )
        })}

      </div>
    </div>


  )
}

export default Story
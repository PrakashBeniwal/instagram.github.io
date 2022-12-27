import React from 'react'
import './storyVideo.scss'
import { useParams } from 'react-router-dom'
const StoryVideo = () => {
  let { name } = useParams();
  const stories = []
  const img = stories.filter((story) => { return (story.name === name) })
  return (
    <div className='videos'>
      {
        img.map((img) => {
          return (
            <div className='video' key={img.id}>
              <video src={img.video} controls loop></video>
            </div>
          )
        })
      }

    </div>
  )
}

export default StoryVideo
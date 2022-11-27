import React from 'react'
import video from './video/10000000_662229312087683_5928092310146952179_n.mp4'
import './reels.scss'
const Reels = () => {
    const reels = [
        {
          id: 1,
          name: "John Doe",
          img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
          video:video
        },
      
    ]
  return (
    <div className='reels'>
        {
            reels.map((reel)=>{
                return(
                    <div className="reel" key={reel.id}>
                        <video src={reel.video} controls autoPlay></video>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Reels
import React from 'react'
import './allreels.scss'
const Allreels = () => {
    const posts = [             
        {
          id: 1,
          name: "Prakash Beniwal",
          userId: 1,
          profilePic:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
          id: 2,
          name: "Ankur Beniwal",
          userId: 2,
          profilePic:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
          desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
          img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    
        },
        {
          id: 3,
          name: "Prakash Beniwal",
          userId: 1,
          profilePic:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
          img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
          id: 4,
          name: "Ankur Beniwal",
          userId: 2,
          profilePic:
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
          desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
          img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    
        },
        
      ];
  return (
    <div className='allreels'>

        <div className="reel">
        {
            posts.map((post)=>{
                return(
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
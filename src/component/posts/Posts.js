import React from 'react'
import Post from '../post/Post';
import './posts.scss'
import Story from '../../component/story/Story'

const Posts = () => {

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
      img: "https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg",

    },
    {
      id: 3,
      name: "Prakash Beniwal",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://i.pinimg.com/originals/9c/b0/70/9cb070d62dc738a0c3a1a408d68e4af5.jpg",
    },
    {
      id: 4,
      name: "Ankur Beniwal",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Bc9S4EKfZXx2MxGTv9WKNyPnraoX2L2tVYDYECow9A&s",

    },
    {
      id: 5,
      name: "Prakash Beniwal",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://img.freepik.com/free-photo/beautiful-scenery-road-forest-with-lot-colorful-autumn-trees_181624-30942.jpg?w=2000",
    },
    {
      id: 6,
      name: "Ankur Beniwal",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",

    },
    {
      id: 7,
      name: "Prakash Beniwal",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=",
    },
    {
      id: 8,
      name: "Ankur Beniwal",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",

    },
    {
      id: 9,
      name: "Ankur Beniwal",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__480.jpg",

    },
    {
      id: 10,
      name: "Ankur Beniwal",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
      img: "https://img.freepik.com/free-photo/shiraito-waterfall-autumn-japan_335224-193.jpg?w=2000",

    },
  ];
  return (
    <div className='container'>
            <Story/>
    
    <div className='allpost'>

    
    {posts.map((post)=>{
      return(
        
        <div className='post' key={post.id}>
        
          <Post post={post}/>
        </div>
        )
        
      })}
      </div>

    </div>
  )
}

export default Posts
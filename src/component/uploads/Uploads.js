import React from 'react'
import { useState ,useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import './uploads.scss'
const Uploads = ({id}) => {

    const [posts, setPosts] = useState([]);
    const [reels, setReels] = useState([])
    const [uploads, setUploads] = useState([])
    const [line, setLine] = useState({h1:'none',h2:'none',h3:'none'})

   
    
    useEffect(() => {
        mypost();
      // eslint-disable-next-line
        }, [])

   
    const mypost=()=>{
        fetch(`http://localhost:5544/api/mypost`,{
            headers:{
                'auth-token':localStorage.getItem('token')
            }
        }).then(result=>{
            result.json().then(res=>{
                setReels(res)
              

            })
            
        })

        fetch(`http://localhost:5544/api/allpost${id}`,{
            headers:{'auth-token':localStorage.getItem('token')}
          }).then(result=>{
            result.json().then(res=>{
              setPosts(res)
              setUploads(res)
            })
          })
    }

    const onclick=(e)=>{
        
        if (e==='post') {
            setLine({h1:'block',h2:'none',h3:'none'})
            setUploads(posts)
        }
        if (e==='reel') {
            setLine({h2:'block',h1:'none',h3:'none'})
            setUploads(reels)
        }
        if (!e) {
            setLine({h3:'block',h2:'none',h1:'none'})
            setUploads([])
        }
    }


    
  return (
    <div className='allposts'>

<div className="uploads" >
                <div className="icons">
                    <div>
                        <span id='post' onClick={()=>{onclick('post')}}><ViewCompactOutlinedIcon /></span>
                        <hr style={{display:line.h1}} />
                    </div>
                    <div>
                        <span onClick={()=>{onclick('reel')}}><SlideshowOutlinedIcon /></span>
                        
                        <hr style={{display:line.h2}} />
                        </div>
                    <div>
                        <span onClick={()=>{onclick()}}><AccountBoxOutlinedIcon /></span>
                        
                        <hr style={{display:line.h3}} />
                        </div>
                </div>
                
            </div>

                
    <div className="all">
    {
        uploads.map((post)=>{
            return(
              <Link to={`/OpenPost/${id}#${post._id}`}  key={post._id}>  <div className="postimg" >
                    <img src={post.post} alt="" />
                </div></Link>
            )
        })
    }
    </div>
   
</div>
  )
}

export default Uploads
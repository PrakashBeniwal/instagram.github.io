import {React,useState,useLayoutEffect, useContext} from 'react'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Link } from 'react-router-dom';
import './userProfile.scss'
import { useParams } from 'react-router-dom'
import Uploads from '../../component/uploads/Uploads';
import { AuthContext } from '../../context/authContext';


const UserProfile = () => {
  const {currentuser}=useContext(AuthContext);
    
    let{profile}=useParams();
    const [user, setUser] = useState(null)
const [showfollow, setShowfollow] = useState(currentuser.following.includes(profile))
    useLayoutEffect(() => {
      
        fetch(`http://localhost:5544/api/user${profile}`,{
            headers:{'auth-token':localStorage.getItem('token')}
          }).then(result=>{
            result.json().then(res=>{
              setUser(res)
            })
          })
          // eslint-disable-next-line
    }, [showfollow])
    
    const followuser=()=>{
        fetch(`http://localhost:5544/api/follow`,{
            method:'PUT',
            headers:{'content-Type':'application/json','auth-token':localStorage.getItem('token')},
            body:JSON.stringify({followId:profile})
        }).then(res=>{
            res.json().then(result=>{
              setShowfollow(true)

            })
        })
    }

    const unfollowuser=()=>{
        fetch(`http://localhost:5544/api/unfollow`,{
            method:'PUT',
            headers:{'content-Type':'application/json','auth-token':localStorage.getItem('token')},
            body:JSON.stringify({unfollowId:profile})
        }).then(res=>{
            res.json().then(result=>{
              setShowfollow(false)

            })
        })

    }
                                                                                                        

  return (
<>
     {user ?

    <div className='profile'>
    <div className="profileTop">
        <div className="profileTopLeft">
            <div className="username">{user.user.username}</div>
        </div>
        <div className="profileTopRight">
            <div className="create">
                <LocalHospitalOutlinedIcon />
            </div>
            <div className="Mainsetting">
                <div><SettingsSuggestOutlinedIcon /></div>
            </div>
        </div>
    </div>

    <div className="editProfile">
        <div className="profileDetail">
            <div className="userProfile">
                <img className='profileimg' src={user.user.profilePic} alt="" />
                <span>{user.user.name}</span>
            </div>

            <div className="posts">
                <div className='noOfPosts'>{user.posts.length}</div>
                <div>Posts</div>
            </div>
            <div className="followers">
                <div className='noOfFollower'>{user.user.followers.length}</div>
                <Link to={'/follower'} style={{textDecoration:'none'}}><div>  followers</div></Link>

            </div>
            <div className="following">
                <div className='noOfFollowing'>{user.user.following.length}</div>
                <Link to={'/following'} style={{textDecoration:'none'}}><div>  following</div></Link>
            </div>
        </div>

        <div className="followMessage">
            {!showfollow?
             <div>

             <Link >  <button onClick={followuser}>Follow</button></Link>
               </div>:
                <div>

                <Link >  <button onClick={unfollowuser}>Unfollow</button></Link>
                  </div>
        }
           
            <div>
            <Link >  <button>Message</button></Link>

            </div>
        </div>
    </div>

 <Uploads id={profile}/>

 
</div>
: <div>loading...!</div> }
</>
  )
}

export default UserProfile
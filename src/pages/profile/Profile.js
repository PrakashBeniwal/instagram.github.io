import {React,useState,useEffect} from 'react'
import './profile.scss'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Uploads from '../../component/uploads/Uploads';
const Profile = () => {
     const [currentuser, setCurrentuser] = useState()
  
    const me=()=>{
         fetch('http://localhost:5544/api/me',
         {headers:{'auth-token':localStorage.getItem('token')}}).then(
            res=>{
                res.json().then(result=>{
                    setCurrentuser(result)
                    // console.log(result)
                }).catch(err=>{
                    console.log(err)
                })
            }
         )
    }

    useEffect(() => {
      me();
    }, [])
    


    return (
        <div className='profile'>
        {currentuser? 
            <>
            <div className="profileTop">
                <div className="profileTopLeft">
                    <div className="username">{currentuser.user.username}</div>
                </div>
                <div className="profileTopRight">
                    <div className="create">
                        <LocalHospitalOutlinedIcon />
                    </div>
                    <div className="Mainsetting">
                      <Link to={'/logout'}>  <div><SettingsSuggestOutlinedIcon /></div></Link>
                    </div>
                </div>
            </div>

            <div className="editProfile">
                <div className="profileDetail">
                    <div className="userProfile">
                        <img className='profileimg' src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                        <span>{currentuser.user.name}</span>
                    </div>

                    <div className="posts">
                        <div className='noOfPosts'>{currentuser.posts.length}</div>
                       <HashLink style={{textDecoration:'none',color:'white'}} to={'#post'}> <div>Posts</div></HashLink>
                    </div>
                    <div className="followers">
                        <div className='noOfFollower'>{currentuser.user.followers.length}</div>
                        <Link to={'/follower'} style={{textDecoration:'none'}}><div>  followers</div></Link>

                    </div>
                    <div className="following">
                        <div className='noOfFollowing'>{currentuser.user.following.length}</div>
                        <Link to={'/following'} style={{textDecoration:'none'}}><div>  following</div></Link>
                    </div>
                </div>

                <div className="edit">
                    <div>

                  <Link to={'/editprofile'}>  <button>Edit profile</button></Link>
                    </div>
                    <div>
                        <AccountBoxOutlinedIcon />
                    </div>
                </div>
            </div>

            {/* <div className="uploads" >
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
               

              
              <div >{uploads=='post'?AllPosts(currentuser.user.user._id):[]}</div> 
            </div> */}

          {currentuser.user._id && <Uploads id={currentuser.user._id}/>}

        </>
          : <div className='loading'>loading...</div>}
        </div>
    )
}

export default Profile
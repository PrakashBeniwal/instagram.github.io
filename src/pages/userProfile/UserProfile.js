import {React,useState} from 'react'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import AllPosts from '../../component/allPosts/AllPosts';
import Allreels from '../../component/allreels/Allreels';
import { Link } from 'react-router-dom';
import './userProfile.scss'

const UserProfile = () => {
    
    const [uploads, setUploads] = useState(AllPosts)
    const [line, setLine] = useState({h1:'none',h2:'none',h3:'none'})

    
                                                                                                        
    const onclick=(e)=>{
        setUploads(e)
        if (e===AllPosts) {
            setLine({h1:'block',h2:'none',h3:'none'})

        }
        if (e===Allreels) {
            setLine({h1:'none',h2:'block',h3:'none'})

        }
        if (!e) {
            setLine({h1:'none',h2:'none',h3:'block'})

        }
    }
  return (
    <div className='profile'>
    <div className="profileTop">
        <div className="profileTopLeft">
            <div className="username">ankurbeniwal</div>
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
                <img className='profileimg' src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                <span>Beniwal Ankur</span>
            </div>

            <div className="posts">
                <div className='noOfPosts'>10</div>
                <div>Posts</div>
            </div>
            <div className="followers">
                <div className='noOfFollower'>182</div>
                <Link to={'/follower'} style={{textDecoration:'none'}}><div>  followers</div></Link>

            </div>
            <div className="following">
                <div className='noOfFollowing'>158</div>
                <Link to={'/following'} style={{textDecoration:'none'}}><div>  following</div></Link>
            </div>
        </div>

        <div className="followMessage">
            <div>

          <Link >  <button>Following</button></Link>
            </div>
            <div>
            <Link >  <button>Message</button></Link>

            </div>
        </div>
    </div>

    <div className="uploads">
        <div className="icons">
            <div>
                <span onClick={()=>{onclick(AllPosts)}}><ViewCompactOutlinedIcon /></span>
                <hr style={{display:line.h1}} />
            </div>
            <div>
                <span onClick={()=>{onclick(Allreels)}}><SlideshowOutlinedIcon /></span>
                
                <hr style={{display:line.h2}} />
                </div>
            <div>
                <span onClick={()=>{onclick()}}><AccountBoxOutlinedIcon /></span>
                
                <hr style={{display:line.h3}} />
                </div>
        </div>
        <div>{uploads}</div>
    </div>



</div>
  )
}

export default UserProfile
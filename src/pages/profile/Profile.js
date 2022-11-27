import {React,useState} from 'react'
import './profile.scss'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import AllPosts from '../../component/allPosts/AllPosts';
import Allreels from '../../component/allreels/Allreels';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
const Profile = () => {

    const [uploads, setUploads] = useState(AllPosts)
    const [line, setLine] = useState({h1:'none',h2:'none',h3:'none'})
    

    const onclick=(e)=>{
        setUploads(e)
        if (e===AllPosts) {
            setLine({h1:'block',h2:'none',h3:'none'})
        }
        if (e===Allreels) {
            setLine({h2:'block',h1:'none',h3:'none'})
        }
        if (!e) {
            setLine({h3:'block',h2:'none',h1:'none'})
        }
    }
    return (
        <div className='profile'>
            <div className="profileTop">
                <div className="profileTopLeft">
                    <div className="username">prakash.beniwal.10.6</div>
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
                        <span>Beniwal Prakash</span>
                    </div>

                    <div className="posts">
                        <div className='noOfPosts'>10</div>
                       <HashLink style={{textDecoration:'none',color:'white'}} to={'#post'}> <div>Posts</div></HashLink>
                    </div>
                    <div className="followers">
                        <div className='noOfFollower'>18</div>
                        <Link to={'/follower'} style={{textDecoration:'none'}}><div>  followers</div></Link>

                    </div>
                    <div className="following">
                        <div className='noOfFollowing'>24</div>
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

            <div className="uploads" >
                <div className="icons">
                    <div>
                        <span id='post' onClick={()=>{onclick(AllPosts)}}><ViewCompactOutlinedIcon /></span>
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
                {/* <hr /> */}

                {/* <AllPosts/> */}
              <div >{uploads}</div> 
            </div>



        </div>
    )
}

export default Profile
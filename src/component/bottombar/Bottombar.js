import React, { useEffect, useState } from 'react'
import './bottombar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
const Bottombar = () => {

  const [profile, setProfile] = useState()
  useEffect(() => {
      db.ref(`/users/${localStorage.getItem('id')}`)
      .on('value',(snap)=>{
        setProfile(snap.val().profilePic)
      })
  }, [])
  
  return (
    <div >
      <div className='bottombar'>
        <Link to={'/'}><div className="link">  <HomeOutlinedIcon /> </div></Link>
        <Link to={'/search'}><div className="link"> <SearchOutlinedIcon /></div> </Link>
        <Link to={'/reels'}><div className="link">
          <SlideshowOutlinedIcon />
        </div></Link>
        <Link><div className="link">
          <FavoriteBorderOutlinedIcon />
        </div></Link>
        <Link to={'/profile'}>  <img src={profile} alt="" /></Link>
      </div>
    </div>
  )
}

export default Bottombar
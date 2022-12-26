import React from 'react'
import './bottombar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';

const Bottombar = () => {
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

          <Link to={'/profile'}>  <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" /></Link>
        
      </div>
    </div>
  )
}

export default Bottombar
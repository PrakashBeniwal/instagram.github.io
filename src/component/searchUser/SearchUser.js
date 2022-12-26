import React, { useContext, useState } from 'react'
import './searchUser.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
const SearchUser = () => {

  const {currentuser}=useContext(AuthContext)
const [user, setUser] = useState([])

const finduser=(query)=>{

  fetch('http://localhost:5544/api/searchUsers',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({user:query,username:query})
  }).then(res=>{
    res.json().then(result=>{
      setUser(result)
    })
  })


}



  return (
    <div className='SearchUser'>
      <input type="text" placeholder='Search' onChange={(e)=>{finduser(e.target.value)}}/>


{user.map((e)=>{

return(
  <Link to={e._id!==currentuser._id?'/userProfile/'+e._id:'/profile'} style={{color:'white',textDecoration:"none"}} key={e._id}> <div className="user" >
        <img src={e.profilePic} alt="" />
        <div className="userdetail">
        <span>{e.username}</span>
        <span className='name'>{e.name}</span>
        </div>
      </div></Link>
)

})}
      
      

    </div>
  )
}

export default SearchUser
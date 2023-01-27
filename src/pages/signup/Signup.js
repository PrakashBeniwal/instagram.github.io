import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {auth} from '../../firebase'
const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '', fullname: '', username: '' })
  const create = (fullname, username, email, password) => {

    auth.createUserWithEmailAndPassword(email,password).then(result=>{
      fetch(`https://instaclone-d3b52-default-rtdb.firebaseio.com/users/${result.user.uid}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullname, username, email,uid:result.user.uid,profilePic:'https://firebasestorage.googleapis.com/v0/b/instaclone-d3b52.appspot.com/o/posts%2F1674522449036?alt=media&token=d3e02abb-e7ec-4503-809f-1e60df1af0c2'
        })
      }).then(res => {
        res.json().then(result => {
          alert('account created')
          navigate('/')
          window.location.reload()
        }).catch(err => { console.log(err) })
      })
     }).catch(err=>{alert('email already exists')})

   
  }
  const handleCreate = (e) => {
    e.preventDefault();
    create(input.fullname, input.username, input.email, input.password);
  }

  const onchange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  return (
    <div className='login'>
      <div className="instaname" >
        Instagram
      </div>

      <div className="logindetails">
        <div className="loginflexbox">
          <div className="loginId">
            <input type="text" name='fullname' value={input.fullname} onChange={onchange} placeholder='name' />
          </div>
          <div className="loginId">
            <input type="text" name='username' value={input.username} onChange={onchange} placeholder=' username' />
          </div>
          <div className="loginId">
            <input type="text" name='email' value={input.email} onChange={onchange} placeholder='email ' />
          </div>
          <div className="loginPassword">
            <input type="password" name='password' value={input.password} onChange={onchange} placeholder='password' />
          </div>
          <div className="loginbtn">
            <button onClick={handleCreate}>Create Account</button>
          </div>
        </div>
      </div>
      <div className="createAcc">
        Already have an account?<span onClick={() => { navigate('/login') }}> Login.</span>
      </div>
    </div>
  )
}

export default Signup
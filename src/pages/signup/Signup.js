import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '', fullname: '', username: '' })
  const create = (fullname, username, email, password) => {
    fetch('http://localhost:5544/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fullname, username, email, password
      })
    }).then(res => {
      res.json().then(result => {
        console.log(result)
        localStorage.setItem('token', result.token);
        if (!result.problem) {
          navigate('/login')
        } else { alert(result.problem) }
      }).catch(err => { console.log(err) })
    })
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
import React, { useState } from 'react'
import './editProfile.scss'
const EditProfile = () => {
    const [edit, setEdit] = useState(false)
    return (
        <div className='editprofile'>

        <div className="changeprofile">
            <div className="profilephoto">
                <img src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
             <span>Change profile photo</span>
            </div>
        </div>

        <div className="personaldetail" onClick={()=>{setEdit(true)}}>
            <div className="name">
                <span>Name</span>
                <div>Beniwal Prakash</div>
                <hr/>
            </div>
            <div className="username">
                <span>Username</span>
                <div>prakash.beniwal.10.6</div>
                <hr/>
            </div>
            <div className="bio">
                <span>Bio</span>
                <div></div>
                <hr/>
            </div>
            <div className="addlink">
                <span>Add link</span>
            </div>
            
        </div>
        <div className='link'>
            <a href="/">Switch to professional account</a>
                
            </div>

            <div className='link'>

            <a href="/">Personal information settings</a>
            </div>

            <div className={edit?`inputdetail`:"InputDetail"}>
                <input type="text" className="inputname" placeholder='name'/>
                <input type="text" className="inputusername" placeholder='username'/>
                <input type="text" disabled className="inputbio" placeholder='bio'/>
                <button className='update'>update</button>
                <button className='update' onClick={()=>{setEdit(false)}}>cancel</button>
            </div>
        </div>
    )
}

export default EditProfile
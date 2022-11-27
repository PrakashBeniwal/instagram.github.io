import React from 'react'
import './editProfile.scss'
const EditProfile = () => {
    return (
        <div className='editprofile'>

        <div className="changeprofile">
            <div className="profilephoto">
                <img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821__480.jpg" alt="" />
             <span>Change profile photo</span>
            </div>
        </div>

        <div className="personaldetail">
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
        </div>
    )
}

export default EditProfile
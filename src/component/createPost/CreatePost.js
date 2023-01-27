import { React, useState } from 'react'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import './createPost.scss'
import { storage } from '../../firebase';
const CreatePost = () => {
  const [post, setPost] = useState("")
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const uploaded = () => {
    if(post){
      setLoading(true)
   const uploadImage= storage.ref().child(`/posts/${Date.now()}`).put(post)
  uploadImage.then(() => {
    uploadImage.snapshot.ref.getDownloadURL().then((url)=>{
      fetch('https://instaclone-d3b52-default-rtdb.firebaseio.com/posts.json', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token')
          , 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          caption: caption,
          post: url,
          deleteid:uploadImage.snapshot.metadata.fullPath,
          postedBy:localStorage.getItem('id')
        })
      }).then(result => {
        result.json().then((res) => {
          alert('posted succesfully')
          setLoading(false)
          fetch(`https://instaclone-d3b52-default-rtdb.firebaseio.com/users/${localStorage.getItem('id')}/posts.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          0:res.name
        })
      })

      fetch(`https://instaclone-d3b52-default-rtdb.firebaseio.com/posts/${res.name}.json`, {
        method: 'PATCH',
        headers: {
          'auth-token': localStorage.getItem('token')
          , 'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:res.name
        })
      })
        })
      })
    })
  }).catch(err=>{
      alert('err uploading')
  })
}else{
  alert('please select post')
}

}

  return (
    <div  className='createPost'>{loading?<div style={{fontSize:'30px'}}>Loading...</div>:
    <div>
      <div className="displayPost">
        {post && <img src={URL.createObjectURL(post)} alt="post" />}
      </div>
      <div className="postfile">
        <label>
          Select Image
          <input type="file" onChange={(e) => { setPost(e.target.files[0])}} />
          <SlideshowOutlinedIcon style={{ marginLeft: '10px' }} />
        </label>
      </div>
      <div className="caption">
        <input type="text" placeholder='write caption' value={caption} onChange={(e) => { setCaption(e.target.value) }} />
      </div>

      <div className="posted">
        <button type="submit" onClick={uploaded}>upload</button>
      </div>
    </div>}
    </div>
  )
}

export default CreatePost
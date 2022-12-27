import { React, useState, useLayoutEffect, useRef } from 'react'
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import './createPost.scss'
const CreatePost = () => {
  const [post, setPost] = useState("")
  const [caption, setCaption] = useState('')
  const [url, setUrl] = useState('')
  const [deleteid, setDeleteid] = useState('')
  const firstupdate = useRef(false)
  useLayoutEffect(() => {
    if (!firstupdate.current) {
      firstupdate.current = true;
      return;
    }
    fetch('http://localhost:5544/api/post', {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token')
        , 'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        caption: caption,
        post: url,
        deleteid
      })
    }).then(result => {
      result.json().then(() => {
        alert('posted succesfully')
      })
    })
    // eslint-disable-next-line
  }, [url])

  const uploaded = () => {
    const formdata = new FormData()
    formdata.append("image", post)
    fetch("http://localhost:5544/api/createpost", {
      headers: { 'auth-token': localStorage.getItem('token') },
      method: "POST",
      body: formdata
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
        setDeleteid(data.deleteid)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='createPost'>

      <div className="displayPost">
        {post && <img src={URL.createObjectURL(post)} alt="post" />}
      </div>
      <div className="postfile">
        <label>
          Select Image
          <input type="file" onChange={(e) => { setPost(e.target.files[0]) }} />
          <SlideshowOutlinedIcon style={{ marginLeft: '10px' }} />
        </label>
      </div>
      <div className="caption">
        <input type="text" placeholder='write caption' value={caption} onChange={(e) => { setCaption(e.target.value) }} />
      </div>

      <div className="posted">
        <button type="submit" onClick={uploaded}>upload</button>
      </div>
    </div>
  )
}

export default CreatePost
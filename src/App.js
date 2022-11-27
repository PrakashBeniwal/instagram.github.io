
import './App.css';
import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoryVideo from './component/storyvideo/StoryVideo';
import Profile from './pages/profile/Profile';
import EditProfile from './component/editProfile/EditProfile';
import Following from './component/following/Following';
import Follower from './component/follower/Follower';
import Bottombar from './component/bottombar/Bottombar';
import Reels from './component/reels/Reels';
import UserProfile from './pages/userProfile/UserProfile';
import OpenPost from './component/openPost/OpenPost';
import AllPosts from './component/allPosts/AllPosts';

function App() {
  return (
    <>
    <div style={{backgroundColor:'black'}}>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
        </Route> */}
          <Route index element={<Home />} />
          <Route path="/:name" element={<StoryVideo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/following" element={<Following />} />
          <Route path="/follower" element={<Follower />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/OpenPost" element={<OpenPost />} />
          {/* <Route path="/AllPosts" element={<AllPosts />} /> */}
      </Routes>
      <Bottombar/>
    </BrowserRouter>
  
    </div>
    </>
  );
}

export default App;

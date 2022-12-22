
import './App.css';
import Home from './pages/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import StoryVideo from './component/storyvideo/StoryVideo';
import Profile from './pages/profile/Profile';
import EditProfile from './component/editProfile/EditProfile';
import Following from './component/following/Following';
import Follower from './component/follower/Follower';
import Bottombar from './component/bottombar/Bottombar';
import Reels from './component/reels/Reels';
import UserProfile from './pages/userProfile/UserProfile';
import OpenPost from './component/openPost/OpenPost';
// import AllPosts from './component/allPosts/AllPosts';
import Login from './pages/login/Login';
// import { AuthContext } from './context/authContext';
// import { useContext } from 'react';
import Signup from './pages/signup/Signup';
import Logout from './component/logout/Logout';
import Uploads from './component/uploads/Uploads';
import CreatePost from './component/createPost/CreatePost';
import Mypost from './component/mypost/Mypost';
// import { AuthContext } from './context/authContext';
function App() {

  // const {currentuser}=useContext(AuthContext);

  const Layout = () => {


   
      
      if (!localStorage.getItem('token')) {
        
       return(<Navigate to="/login"/>)
          
      }
    
    
  
    

   
    return (
     
        <div>
       
      
          <Outlet />
        <Bottombar/>
          
       
        </div> 
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
      
          <Layout />
        
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/following",
          element: <Following />,
        },
       
        {
          path: "/follower",
          element: <Follower />,
        },
       
        {
          path: "/reels",
          element: <Reels />,
        },
       
        {
          path: "/userProfile/:profile",
          element: <UserProfile />,
        },
       
      
        {
          path: "/editProfile",
          element: <EditProfile />,
        },
        {
          path: "/OpenPost/:open",
          element: <OpenPost />,
    
        },
        {
          path: "/uploads",
          element: <Uploads />,
    
        },
        {
          path: "/createPost",
          element: <CreatePost/>,
        },
        {
          path: "/mypost",
          element: <Mypost/>,
        },
       
      ],
    },
   
    {
      path: "/:name",
      element: <StoryVideo />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path: "/logout",
      element: <Logout/>,
    },
  
  
  ]);
  return (
    <>
 
    <div style={{backgroundColor:'black'}}>
    <RouterProvider router={router} />
    </div>
  
    </>
  );
}

export default App;


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
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Logout from './component/logout/Logout';
import Uploads from './component/uploads/Uploads';
import CreatePost from './component/createPost/CreatePost';
import Comments from './component/comments/Comments';
import SearchUser from './component/searchUser/SearchUser';
import FollowingPosts from './component/posts/FollowingPosts';
function App() {
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
          path: "/followingPosts",
          element: <FollowingPosts />,
        },
        {
          path: "/search",
          element: <SearchUser/>,
        },
        {
          path: "/comments/:comment",
          element: <Comments />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/following/:follow",
          element: <Following />,
        },
       
        {
          path: "/follower/:follower",
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
          path: "/logout",
          element: <Logout/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup/>,
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

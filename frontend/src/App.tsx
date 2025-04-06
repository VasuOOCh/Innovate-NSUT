import axios from "axios";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Auth/Signup";
import LAFHome from "./pages/LostAndFound/LAFHome";
import Query from "./pages/LostAndFound/Query";
import Profile from "./pages/Auth/ProfilePage";

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        path : '',
        element : (<Home />)
      },
      {
        path : '/signin',
        element : <SignIn />
      },
      {
        path : '/signup',
        element : <SignUp />
      },
      {
        path : '/laf',
        element : <LAFHome />
      },
      {
        path : '/laf/query',
        element : <Query />
      },
      {
        path : '/profile',
        element : <Profile />
      }
      
    ]
  },
])

function App() {
  axios.defaults.baseURL = 'https://innovate-nsut-9fgd.onrender.com/api';
  axios.defaults.withCredentials = true;
  return (
    <RouterProvider router={router} />
  )
}

export default App

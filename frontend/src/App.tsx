import axios from "axios";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Auth/Signup";

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
      }
    ]
  },
])

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/api';
  axios.defaults.withCredentials = true;
  return (
    <RouterProvider router={router} />
  )
}

export default App

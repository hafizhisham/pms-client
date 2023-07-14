import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import Users from "./pages/Users";
import ListOfProjects from "./pages/ListOfProjects";
import NewProject from "./pages/NewProject";
import EditUser from "./pages/EditUser";
import ResetPassword from "./pages/ResetPassword";
import MyProject from "./pages/MyProject";
import EditProject from "./pages/EditProject";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/my-account",
      element: <MyAccount />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/edituser",
      element: <EditUser />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
    {
      path: "/listofprojects",
      element: <ListOfProjects />,
    },
    {
      path: "/newproject",
      element: <NewProject />,
    },
    {
      path: "/myproject/:id",
      element: <MyProject />,
    },
    {
      path: "/editproject/:id",
      element: <EditProject />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

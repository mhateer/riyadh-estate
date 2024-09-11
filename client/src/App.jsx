import HomePage from "./pages/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./pages/listPage/listPage";
import { Layout, RequireAuth } from "./pages/layout/layout";
import PropertyPage from "./pages/propertyPage/propertyPage";
import ProfilePage from "./pages/profilePage/profilePage";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ProfileUpdatePage from "./pages/profileUpdatePage/profileUpdatePage";
import NewPropertyPage from "./pages/newPropertyPage/newPropertyPage";
import {listPageLoader, profilePageLoader, singlePageLoader} from "../src/lib/loaders.js";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id/",
          element: <PropertyPage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />
        },
        {
          path: "/add",
          element: <NewPropertyPage />
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router} />
  );
}

export default App;
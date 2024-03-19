import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from "./component/Index.js"
import { Home, Login, Post, SignUp, AddPost, AllPost, EditPost } from "./pages/Index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout userProvideAuth={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout userProvideAuth={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout userProvideAuth>
            {" "}
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout userProvideAuth={true}>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout userProvideAuth>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

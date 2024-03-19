import { useState } from "react"
import authServiceObj from "./appwrite/auth"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./component/Index"
import { Outlet } from "react-router-dom";



function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // const fetchData = async () => {
  //   const userData = await authServiceObj.getUser();
  //   if (userData) {
  //     console.log(userData);
  //     // dispatch(login(userData));
  //   } else
  //     dispatch(logout());
  //   setLoading(!loading);


  useEffect(() => {
    // fetchData();

    authServiceObj.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(!loading));

  }, []);


  return (
    <div className='flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main className="bg-gradient-to-b from-gray-950 to-blue-950">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App

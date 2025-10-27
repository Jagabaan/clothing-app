import { Routes, Route } from "react-router-dom";

import AuthLayout from "./components/authentication/layout.jsx";
import AuthenticationLogin from "./pages/authentication/login.jsx";
import AuthenticationRegister from "./pages/authentication/register.jsx";
import AdminFrontEndLayout from "./components/adminFrontEnd/layout.jsx";
import AdminProducts from "./pages/adminFrontEnd/products.jsx";
import AdminOrders from "./pages/adminFrontEnd/orders.jsx";
import AdminFeatures from "./pages/adminFrontEnd/features.jsx";
import AdminDashboard from "./pages/adminFrontEnd/dashboard.jsx";
import UserFrontEndLayout from "./components/userFrontEnd/layout.jsx";
import PageNotFound from "./pages/notExist/index.jsx";
import UserHome from "./pages/userFrontEnd/home.jsx";
import UserProductList from "./pages/userFrontEnd/producstList.jsx";
import UserCheckout from "./pages/userFrontEnd/checkout.jsx";
import UserAccount from "./pages/userFrontEnd/account.jsx";
import AuthValidation from "./components/sharedComponent/auth-validation.jsx";
import UnAuthorize from "./pages/unauthorize/index.jsx"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./storage/authSlice/index.js";

function App() {

const {user, isAuthenticated, isLoading} = useSelector(state=> state.auth)
const dispatch = useDispatch();

useEffect(()=>{
 dispatch(checkAuth())
}, [dispatch]);
if(isLoading) return <div>Loading...</div>;
console.log(isLoading, user)


  return (
    <div className="flex flex-col overflow-hidden bg-white " >
    <Routes>
      <Route path="/auth" element={
        <AuthValidation isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </AuthValidation>
      }>
        <Route path="login" element={<AuthenticationLogin />} />
        <Route path="register" element={<AuthenticationRegister />} />
      </Route>

     <Route path="/admin" element={
      <AuthValidation isAuthenticated={isAuthenticated} user={user}>
        <AdminFrontEndLayout />
      </AuthValidation>
     }>
     <Route path="dashboard" element={<AdminDashboard />}/>
      <Route path="products" element={<AdminProducts />}/>
      <Route path="orders" element={<AdminOrders />}/>
      <Route path="features" element={<AdminFeatures />}/>
     </Route>

     <Route path="shop" element={
      <AuthValidation isAuthenticated={isAuthenticated} user={user} >
        <UserFrontEndLayout/>
      </AuthValidation>
     } >
      <Route path="home" element={<UserHome/>} />
      <Route path="products" element={<UserProductList/>} />
      <Route path="checkout" element={<UserCheckout/>} />
      <Route path="account" element={<UserAccount/>} />
      </Route>

      <Route path="*" element={<PageNotFound/>} />
      <Route path="/unauthorize" element={<UnAuthorize/>} />

    </Routes>
    </div>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import SubNavbar from './components/SubNavbar/SubNavbar';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import axios from 'axios'
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import {useAuth} from "./context/auth";
import AllProducts from './pages/Admin/AllProducts';
import ProductPage from './pages/Product/ProductPage';
import Cart from './pages/Cart/Cart';
import Checkout from "./pages/Checkout/Checkout";

// axios defaults

axios.defaults.baseURL = 'https://apna-dukan-backend.vercel.app'
axios.defaults.withCredentials = true

const App = () => {
  const [auth]= useAuth()
  axios.defaults.headers.common["Authorization"] = auth.token;
  return (
    <Router>
      <Navbar></Navbar>
      <SubNavbar></SubNavbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route path='/product/:slug' element={<ProductPage></ProductPage>}/>
        <Route path='/my-cart' element ={<Cart></Cart>}/>
        {/* Private Route */}
        <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>}>
          <Route path="user" element={<Dashboard></Dashboard>} />
          <Route path ="checkout" element={<Checkout></Checkout>}/>
        </Route>
        {/* Admin Route Protected */}
        <Route path="/dashboard" element={<AdminRoute></AdminRoute>}>
          <Route path="admin" element={<AdminDashboard></AdminDashboard>} />
          <Route path="admin/create-category" element={<CreateCategory></CreateCategory>} />
          <Route path="admin/create-product" element={<CreateProduct></CreateProduct>} />
          <Route path="admin/users" element={<Users></Users>} />
          <Route path="admin/all-products" element={<AllProducts></AllProducts>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
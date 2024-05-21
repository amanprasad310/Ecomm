import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import About from './components/About/About.jsx'
import Home from './components/Home/Home.jsx'
import Contact from './components/Contact/Contact.jsx'
import Trending from './components/Trending/Trending.jsx'
import Categories from './components/Categories/Categories.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Forget from './Pages/ForgetPass/Forget.jsx'
import User from './Pages/User/User.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import ProductPage from './components/ProductPage/ProductPage.jsx'
import AllProduct from './components/AllProduct/AllProduct.jsx'
import Casual from './Pages/Casual/Casual.jsx'
import PaymentPage from './components/Payment/PaymentPage.jsx'
import CommingSoon from './Pages/CommingSoon/CommingSoon.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='trending' element={<Trending />} />
      <Route path='categories' element={<Categories />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cart />} />
      <Route path='/forget' element={<Forget />} />
      <Route path='/allproduct' element={<AllProduct />} />
      {/* <Route path='profile' element={<User />} /> */}
      <Route element={<PrivateRoute />}>
        <Route path='profile' element={<User />} />
      </Route>
      <Route path='viewpage/:id' element={<ProductPage />} />
      <Route path='casual' element={<Casual />} />
      <Route path='order-status/:id' element={<PaymentPage />} />
      <Route path='newArrival' element={<CommingSoon />} />
    </Route >
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

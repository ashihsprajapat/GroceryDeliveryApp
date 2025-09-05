import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext'
import LoginForm from './components/LoginForm';
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart';
import SellerDasboard from './pages/SellerDesboard'
import AddProduct from './pages/AddProduct'
import ProductList from './pages/ProductList'
import OrderList from './pages/OrderList'
import SellerLogin from './components/seller/SellerLogin'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'


function App() {

  const { showUserLogin, setShowUserLogin, isSeller, navigate } = useAppContext();


  const isSallerpath = useLocation().pathname.includes("seller") //return true and false

  return (
    <>
      {
        isSallerpath ? null : <Navbar />
      }
      {
        showUserLogin && <LoginForm />
      }

      <div className={` ${isSallerpath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}  `}>


        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          {


            <Route path='/seller' element={isSeller ? <SellerDasboard /> : <SellerLogin />} >
              !isSeller ? (navigate("/")) :
              <>
                <Route path='seller' element={<AddProduct />} />
                <Route path='product-list' element={<ProductList />} />
                <Route path='orders' element={<OrderList />} />
              </>
            </Route>

          }

        </Routes>
        {!isSallerpath && <Footer />}
        <Toaster
          position="bottom-left"
          reverseOrder={false}
        />

      </div>
    </>
  )
}

export default App

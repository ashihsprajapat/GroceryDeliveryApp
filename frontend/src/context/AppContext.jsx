import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dummyProducts } from '../greencart_assets/assets';
import toast from 'react-hot-toast';



axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials=true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {


    const currency = import.meta.VITE_CURRENCY;

    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [isSeller, setIsSeller] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [dashboardCurr, setDashboardCurr] = useState(0);

   // console.log("product in appcontezt", product)

    //fetch all products
    const fetchProducts = async () => {

        setProducts(dummyProducts);
       // console.log(product)
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);  //Using structuredClone() in JavaScript is a way to deep copy an object. When you do this:
        // console.log(cartData)
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

        toast.success("Added to cart")
    }



    //update card item quentity 
    const updateCartItem = (itemId, quentity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quentity;
        setCartItems(cartData);
        toast.success("cart updated")
    }


    //check seller is authenticate

    const fechtSeller=async()=>{
        try{

            const {data}= await axios.get("/api/seller/is-seller")
            console.log(data)

            if(data.success){
                setIsSeller(true);

            }else{
                setIsSeller(false)
            }

        }catch(err){
            setIsSeller(false)
        }
    }





    //remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("remove item from cart");
        setCartItems(cartData);
    }

    useEffect(() => {
        fetchProducts();
        fechtSeller()
    }, [products])
    // console.log("all product in app context", product)

    let value = {
        navigate,
        user, setUser,
        isSeller, setIsSeller,
        showUserLogin, setShowUserLogin,
        products, setProducts,
        currency,
        cartItems, setCartItems,
        addToCart, updateCartItem, removeFromCart,
        searchQuery, setSearchQuery,
        fetchProducts,
        dashboardCurr, setDashboardCurr,
        axios

    }

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { dummyProducts } from '../greencart_assets/assets';
import toast from 'react-hot-toast';



axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {


    const currency = import.meta.VITE_CURRENCY;

    const [cartItems, setCartItems] = useState({
    });

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [isSeller, setIsSeller] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [dashboardCurr, setDashboardCurr] = useState(0);

    const [address, setAddress] = useState({})
    const [loadingAddress, setLoadingAddress] = useState();

    //fetch all products
    const fetchProducts = async () => {

        try {

            let { data } = await axios.get("/api/product/list")

            if (data.success) {
                setProducts(data.products);
            } else {
                setProducts(dummyProducts);
            }

        } catch (e) {

        }
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);  //Using structuredClone() in JavaScript is a way to deep copy an object. When you do this:
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

    const fetchtSeller = async () => {
        try {

            const { data } = await axios.get("/api/seller/is-seller")
            if (data.success) {
                setIsSeller(true);

            } else {
                setIsSeller(false)
            }

        } catch (err) {
            setIsSeller(false)
        }
    }


    //fetch user data 

    const fetchtUser = async () => {
        try {

            const { data } = await axios.post("/api/user/is-auth")
            if (data.success) {
                setUser(data.user)
                setCartItems(data.user.cartItems)

            } else {
                setUser(null)
            }

        } catch (err) {
            setUser(null)
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



    //post a address for user
    const addAddress = async (address) => {
        try {

            const { data } = await axios.post("/api/address/add-address", { address })
            if (data.success) {
                setAddress(data.address)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            console.log(err)
        }

    }



    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {

        fetchtSeller()
        fetchtUser()
    }, [products])


    //update database cartItmes
    useEffect(() => {

        const updateCart = async () => {
            try {

                const { data } = await axios.post("/api/cart/update", { cartItems })

               

            } catch (err) {
                toast.error(err.message)
            }
        }
        if (user) {
            updateCart()
        }

    }, [cartItems])

    console.log("cart Items are ", cartItems)

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
        address, setAddress,
        addAddress,
        dashboardCurr, setDashboardCurr,
        axios,
        loadingAddress, setLoadingAddress

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

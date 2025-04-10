import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../greencart_assets/assets';
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CURRENCY;

    const [cartItems, setCartItems] = useState({});

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [product, setProducts] = useState([]);

    const [isSeller, setIsSeller] = useState(false);
    const [searchQuery, setSearchQuery] = useState({});


    //fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
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
    }, [])
    //console.log(product)

    let value = {
        navigate,
        user, setUser,
        isSeller, setIsSeller,
        showUserLogin, setShowUserLogin,
        product, setProducts,
        currency,
        cartItems, setCartItems,
        addToCart, updateCartItem, removeFromCart,
        searchQuery, setSearchQuery

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
